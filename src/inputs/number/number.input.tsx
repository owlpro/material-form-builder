import TextField from '@mui/material/TextField';
import React, { Component } from "react";
import { checkValue } from '../../helpers/general.helper';
import { InputImplement } from '../../types/input.implement';
import { NumberInputProps, NumberInputValueType } from './number.interface';

interface IState {
    value: NumberInputValueType,
    error: boolean
}

export class NumberInput extends Component<NumberInputProps, IState> implements InputImplement<NumberInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    shouldComponentUpdate(nextProps: NumberInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.props.label !== nextProps.label:
                return true;
            default: return false;
        }
    }

    async setValue(value: NumberInputValueType): Promise<any> {
        if (value === this.state.value) return Promise.resolve()
        const setStatePromise = await this.setState({ ...this.state, value })
        if (typeof this.props._call_parent_for_update === "function") await this.props._call_parent_for_update()
        if (typeof this.props.onChangeValue === "function") {
            await this.props.onChangeValue(value as NumberInputValueType)
        }
        return setStatePromise
    }

    getValue(): NumberInputValueType {
        return checkValue(this.state.value) ? this.state.value : null;
    }

    async clear(): Promise<any> {
        return await this.setValue(checkValue(this.props.defaultValue) ? this.props.defaultValue : null)
    }

    validation(): boolean {
        if (!checkValue(this.state.value) && this.props.required) {
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
        let value: NumberInputValueType = isNaN(parseInt(event.target.value, 10)) ? null : parseInt(event.target.value, 10);
        if (this.props.formatter && typeof this.props.formatter === "function") {
            const formattedValue = this.props.formatter(value)
            if (formattedValue !== undefined) {
                value = formattedValue;
            }
        }

        this.setValue(value)
    };

    private onClick = (event: React.MouseEvent<HTMLElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
    }

    inputRef: HTMLInputElement | null | undefined;

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
        const { onChangeValue, visible, _call_parent_for_update, ...restProps } = this.props;
        return <TextField
            {...restProps}
            variant={this.props.variant || "standard"}
            error={this.state.error}
            onChange={this.onChange}
            onClick={this.onClick}
            value={checkValue(this.state.value) ? this.state.value : ""}
            inputRef={el => this.inputRef = el}
        />
    }
}