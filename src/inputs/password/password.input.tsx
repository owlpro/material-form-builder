import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { Component, FocusEvent, MouseEvent } from "react";
import { stringify } from '../../helpers/general.helper';
import { InputImplement } from '../../types/input.implement';
import { PasswordInputProps, PasswordInputValueType } from './password.types';

interface IState {
    value: PasswordInputValueType,
    value_when_focus: PasswordInputValueType,
    error: boolean,
    showPassword: boolean,
}

export class PasswordInput extends Component<PasswordInputProps, IState> implements InputImplement<PasswordInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        value_when_focus: this.props.defaultValue || null,
        error: false,
        showPassword: false
    }

    validationTimeout: NodeJS.Timeout | undefined;
    inputRef: HTMLInputElement | null | undefined;

    shouldComponentUpdate(nextProps: PasswordInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.state.showPassword !== nextState.showPassword:
            case this.props.label !== nextProps.label:
            case this.props.disabled !== nextProps.disabled:
            case stringify(nextProps?.updateListener ?? {}) !== stringify(this.props?.updateListener ?? {}):
                return true;
            default: return false;
        }
    }

    setValue(value: PasswordInputValueType, withoutEffect?: boolean): Promise<PasswordInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)

        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                if (!withoutEffect) this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as PasswordInputValueType)
                resolve(value)
            })
        })
    }

    getValue(): PasswordInputValueType {
        return this.state.value || null;
    }

    clear(): Promise<PasswordInputValueType> {
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
        let value: PasswordInputValueType = event.target.value;
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
        if (this.state.error) this.setState({ ...this.state, error: false })

        this.props.onClick?.(event)
    }

    private onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        const value: PasswordInputValueType = e.target.value || null
        if (value !== this.state.value_when_focus) {
            this.props._call_parent_for_update?.()
        }

        this.props.onBlur?.(e)
    }

    private onFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        const value_when_focus: PasswordInputValueType = e.target.value || null
        if (this.state.value_when_focus !== value_when_focus) this.setState({ ...this.state, value_when_focus })
        this.props.onFocus?.(e)
    }

    private handleClickShowPassword = () => {
        this.setState({ ...this.state, showPassword: !this.state.showPassword })
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
        const { defaultValue, onChangeValue, visible, _call_parent_for_update, updateListener, ...restProps } = this.props;
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
                onClick={this.onClick}
                onBlur={this.onBlur}
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