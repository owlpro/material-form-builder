import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { Component } from "react";
import { InputImplement } from '../../types/input.implement';
import { PasswordInputProps, PasswordInputValueType } from './password.types';

interface IState {
    value: PasswordInputValueType,
    error: boolean,
    showPassword: boolean,
}

export class PasswordInput extends Component<PasswordInputProps, IState> implements InputImplement<PasswordInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false,
        showPassword: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    shouldComponentUpdate(nextProps: PasswordInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.state.showPassword !== nextState.showPassword:
            case this.props.label !== nextProps.label:
                return true;
            default: return false;
        }
    }

    async setValue(value: PasswordInputValueType): Promise<any> {
        if (value === this.state.value) return Promise.resolve()

        const setStatePromise = await this.setState({ ...this.state, value })
        if (typeof this.props._call_parent_for_update === "function") await this.props._call_parent_for_update()
        if (typeof this.props.onChangeValue === "function") {
            await this.props.onChangeValue(value as PasswordInputValueType)
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
        let value: PasswordInputValueType = event.target.value;
        if (this.props.formatter && typeof this.props.formatter === "function") {
            const formattedValue = this.props.formatter(value)
            if (formattedValue !== undefined) {
                value = formattedValue;
            }
        }

        this.setValue(value || null)
    };

    private onFocus = () => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
    }

    private handleClickShowPassword = () => {
        this.setState({ ...this.state, showPassword: !this.state.showPassword })
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
        const { defaultValue, onChangeValue, visible, _call_parent_for_update, ...restProps } = this.props;
        let variantWidth = '207px';
        if (this.props.variant === "outlined") variantWidth = "235px";
        if (this.props.variant === "filled") variantWidth = "231px";
        const inputWidth = this.props.fullWidth ? '100%' : variantWidth;
        return (
            <TextField
                {...restProps}
                sx={{ ...this.props.sx, width: inputWidth }}
                type={this.state.showPassword ? 'text' : 'password'}
                variant={this.props.variant || "standard"}
                error={this.state.error}
                onChange={this.onChange}
                onFocus={this.onFocus}
                value={this.state.value || ''}
                inputRef={el => this.inputRef = el}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={this.handleClickShowPassword}>
                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        )
    }
}