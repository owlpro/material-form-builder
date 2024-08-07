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
        value: this.props.defaultValue !== undefined ? this.props.defaultValue : null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    shouldComponentUpdate(nextProps: NumberInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.props.label !== nextProps.label:
            case this.props.disabled !== nextProps.disabled:
                return true;
            default: return false;
        }
    }

    setValue(value: NumberInputValueType): Promise<NumberInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)
        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                if (typeof this.props._call_parent_for_update === "function") this.props._call_parent_for_update()
                if (typeof this.props.onChangeValue === "function") {
                    this.props.onChangeValue(value as NumberInputValueType)
                }
                resolve(value)
            })
        })
    }

    getValue(): NumberInputValueType {
        return checkValue(this.state.value) ? this.state.value : null;
    }

    clear(): Promise<NumberInputValueType> {
        return this.setValue(checkValue(this.props.defaultValue) ? this.props.defaultValue : null)
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
        const { onChangeValue, defaultValue, visible, _call_parent_for_update, ...restProps } = this.props;
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