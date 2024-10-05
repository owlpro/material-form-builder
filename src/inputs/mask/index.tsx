import TextField from '@mui/material/TextField';
import React, { Component, FocusEvent, MouseEvent } from "react";
import { mask } from '@/helpers/general';
import { InputImplement } from '@/types';
import { MaskInputProps, MaskInputValueType } from './types';

interface IState {
    value: MaskInputValueType,
    value_when_focus: MaskInputValueType,
    error: boolean
}

export class MaskInput extends Component<MaskInputProps, IState> implements InputImplement<MaskInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        value_when_focus: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;
    inputRef: HTMLInputElement | undefined

    shouldComponentUpdate(nextProps: MaskInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.props.label !== nextProps.label:
            case this.props.pattern !== nextProps.pattern:
            case this.props.char !== nextProps.char:
            case this.props.disabled !== nextProps.disabled:
                return true;
            default: return false;
        }
    }

    setValue(value: MaskInputValueType, withoutEffect?: boolean): Promise<MaskInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)

        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                if(!withoutEffect) this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as MaskInputValueType)
                resolve(value)
            })
        })
    }

    getValue(): MaskInputValueType {
        return this.state.value || null;
    }

    clear(): Promise<MaskInputValueType> {
        return this.setValue(this.props.defaultValue || null)
    }

    validation(): boolean {
        if (!this.state.value && this.props.required) {
            clearTimeout(this.validationTimeout)
            this.setState({ ...this.state, error: true })
            this.validationTimeout = setTimeout(() => {
                this.setState({ ...this.state, error: false })
            }, 3000)
            return false;
        }
        return true;
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: MaskInputValueType = event.target.value;

        if (this.props.formatter && typeof this.props.formatter === "function") {
            const formattedValue = this.props.formatter(value)
            if (formattedValue !== undefined) {
                value = formattedValue;
            }
        }

        this.normalizeValue(value)
        this.props.onChange?.(event)
    };

    private normalizeValue = async (value: MaskInputValueType) => {
        if (!value) return this.setValue(null);
        const pattern = this.props.pattern;
        const pureValue = value.replace(/[^0-9]/g, '')
        const maskedValues = mask(pureValue, pattern, this.props.char || '_')
        await this.setValue(pureValue ? maskedValues : null, true)
        const valueForLength = maskedValues.match(/.*[0-9]/)

        if (this.inputRef && valueForLength) {
            this.inputRef.selectionStart = this.inputRef.selectionEnd = valueForLength[0].length
        }
    }

    private onClick = (event: MouseEvent<HTMLDivElement>) => {
        clearTimeout(this.validationTimeout)

        if (this.state.error) {
            this.setState({ ...this.state, error: false })
        }

        this.props.onClick?.(event)
    }

    private onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        const value: MaskInputValueType = e.target.value || null
        if (value !== this.state.value_when_focus) {
            this.props._call_parent_for_update?.()
        }

        this.props.onBlur?.(e)
    }

    private onFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        const value_when_focus: MaskInputValueType = e.target.value || null
        if (this.state.value_when_focus !== value_when_focus) this.setState({ ...this.state, value_when_focus })
        this.props.onFocus?.(e)
    }

    public click = () => {
        this.inputRef?.click()
    }
    public focus = () => {
        this.inputRef?.focus()
    }
    public blur = () => {
        this.inputRef?.blur()
    }

    render() {
        const { onChangeValue, formatter, visible, _call_parent_for_update, defaultValue, ...restProps } = this.props;
        return <TextField
            {...restProps}
            variant={this.props.variant || "standard"}
            error={this.state.error}
            onChange={this.onChange}
            onClick={this.onClick}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            value={this.state.value || ''}
            inputRef={el => this.inputRef = el}
        />
    }
}