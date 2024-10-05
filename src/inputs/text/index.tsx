import TextField from '@mui/material/TextField';
import React, { Component, FocusEvent, MouseEvent } from "react";
import { InputImplement } from '@/types';
import { TextInputProps, TextInputValueType } from './types';

interface IState {
    value: TextInputValueType,
    value_when_focus: TextInputValueType,
    error: boolean
}

export class TextInput extends Component<TextInputProps, IState> implements InputImplement<TextInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        value_when_focus: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    inputRef: HTMLInputElement | undefined

    shouldComponentUpdate(nextProps: TextInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.props.label !== nextProps.label:
            case this.props.disabled !== nextProps.disabled:
                return true;
            default: return false;
        }
    }

    setValue(value: TextInputValueType, withoutEffect?: boolean): Promise<TextInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)
        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                if(!withoutEffect) this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as TextInputValueType)
                resolve(value)
            })
        })
    }

    getValue(): TextInputValueType {
        return this.state.value || null;
    }

    clear(): Promise<TextInputValueType> {
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
        let value: TextInputValueType = event.target.value;
        if (this.props.formatter && typeof this.props.formatter === "function") {
            const formattedValue = this.props.formatter(value)
            if (formattedValue !== undefined) {
                value = formattedValue;
            }
        }

        this.setValue(value || null, true).then(() => {
            this.props.onChange?.(event)
        })
    };

    private onClick = (event: MouseEvent<HTMLDivElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
        this.props.onClick?.(event)
    }

    private onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        const value: TextInputValueType = e.target.value || null
        if (value !== this.state.value_when_focus) {
            this.props._call_parent_for_update?.()
        }

        this.props.onBlur?.(e)
    }

    private onFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        const value_when_focus: TextInputValueType = e.target.value || null
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
        const { defaultValue, onChangeValue, visible, formatter, _call_parent_for_update, ...restProps } = this.props;
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