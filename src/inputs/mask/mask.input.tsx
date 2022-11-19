import TextField from '@mui/material/TextField';
import React, { Component } from "react";
import { mask } from '../../helpers/general.helper';
import { InputImplement } from '../../types/input.implement';
import { MaskInputProps, MaskInputValueType } from './mask.types';

interface IState {
    value: MaskInputValueType,
    error: boolean
}

export class MaskInput extends Component<MaskInputProps, IState> implements InputImplement<MaskInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
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
                return true;
            default: return false;
        }
    }

    async setValue(value: MaskInputValueType): Promise<any> {
        if (value === this.state.value) return Promise.resolve()

        const setStatePromise = await this.setState({ ...this.state, value })
        if (typeof this.props.onChangeValue === "function") {
            await this.props.onChangeValue(value as MaskInputValueType)
        }
        this.props.callParentForUpdate()
        return setStatePromise
    }

    getValue(): MaskInputValueType {
        return this.state.value || null;
    }

    async clear(): Promise<any> {
        return await this.setValue(this.props.defaultValue || null)
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
        this.normalizeValue(value)
    };

    private normalizeValue = async (value: MaskInputValueType) => {
        if (!value) return this.setValue(null);
        const pattern = this.props.pattern;
        const pureValue = value.replace(/[^0-9]/g, '')
        const maskedValues = mask(pureValue, pattern, this.props.char || '_')
        await this.setValue(pureValue ? maskedValues : null)
        const valueForLength = maskedValues.match(/.*[0-9]/)

        if (this.inputRef && valueForLength) {
            this.inputRef.selectionStart = this.inputRef.selectionEnd = valueForLength[0].length
        }
    }

    private onClick = () => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
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
        const { onChangeValue, visible, ...restProps } = this.props;
        return <TextField
            {...restProps}
            variant={this.props.variant || "standard"}
            error={this.state.error}
            onChange={this.onChange}
            onClick={this.onClick}
            value={this.state.value || ''}
            inputRef={el => this.inputRef = el}
        />
    }
}