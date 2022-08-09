import TextField from '@mui/material/TextField';
import React, { Component } from "react";
import { InputImplement } from '../../types/input.implement';
import { PasswordInputProps, PasswordInputValueType } from './password.types';

interface IState {
    value: PasswordInputValueType,
    error: boolean
}

export class PasswordInput extends Component<PasswordInputProps, IState> implements InputImplement<PasswordInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    shouldComponentUpdate(nextProps: PasswordInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
                return true;
            default: return false;
        }
    }

    async setValue(value: PasswordInputValueType): Promise<any> {
        if (value === this.state.value) return Promise.resolve()

        const setStatePromise = await this.setState({ ...this.state, value })
        if (typeof this.props.onChangeValue === "function") {
            this.props.onChangeValue(value as PasswordInputValueType)
        }
        return setStatePromise
    }

    getValue(): PasswordInputValueType {
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
        this.setValue(event.target.value || null)
    };

    private onClick = (event: React.MouseEvent<HTMLElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
    }

    render() {
        const { onChangeValue, ...restProps } = this.props;
        return <TextField {...restProps} variant={this.props.variant || "standard"} error={this.state.error} onChange={this.onChange} onClick={this.onClick} value={this.state.value || ''} />
    }
}