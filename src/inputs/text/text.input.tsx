import TextField from '@mui/material/TextField';
import React, { Component } from "react";
import { InputImplement } from '../../types/input.implement';
import { TextInputProps, TextInputValueType } from './text.types';

interface IState {
    value: TextInputValueType,
    error: boolean
}

export class TextInput extends Component<TextInputProps, IState> implements InputImplement<TextInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
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

    setValue(value: TextInputValueType): Promise<TextInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)

        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                if (typeof this.props._call_parent_for_update === "function") this.props._call_parent_for_update()
                if (typeof this.props.onChangeValue === "function") {
                    this.props.onChangeValue(value as TextInputValueType)
                }

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

        this.setValue(value || null)

    };

    private onClick = (event: React.MouseEvent<HTMLElement>) => {
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
        const { defaultValue, onChangeValue, visible, formatter, _call_parent_for_update, ...restProps } = this.props;
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