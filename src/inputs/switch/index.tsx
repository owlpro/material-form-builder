import { FormControlLabel, Switch } from '@mui/material';
import React, { Component } from "react";
import { InputImplement } from '../../types';
import { SwitchInputProps, SwitchInputValueType } from './types';
import { stringify } from 'src/helpers/general';

interface IState {
    value: SwitchInputValueType,
    error: boolean
}

export class SwitchInput extends Component<SwitchInputProps, IState> implements InputImplement<SwitchInputValueType> {
    state: IState = {
        value: this.props.defaultChecked ?? false,
        error: false
    }

    validationTimeout: any;

    inputRef: HTMLInputElement | null | undefined;

    shouldComponentUpdate(nextProps: SwitchInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case stringify(nextProps) !== stringify(this.props):
                return true;
            default: return false;
        }
    }

    setValue(value: SwitchInputValueType): Promise<SwitchInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)

        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as SwitchInputValueType)

                resolve(value)
            })
        })
    }

    getValue(): SwitchInputValueType {
        return this.state.value || false;
    }

    clear(): Promise<SwitchInputValueType> {
        return this.setValue(this.props.checked ?? this.props.defaultChecked ?? false)
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

    onChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        this.setValue(checked || false)
        this.props.onChange?.(event, checked)
    };

    private onClick = (event: React.MouseEvent<HTMLLabelElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
        this.props.onClick?.(event as any)
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
        const { type,
            selector,
            defaultChecked,
            label,
            defaultValue,
            onChangeValue,
            visible,
            _call_parent_for_update,
            ...restProps } = this.props;
        const input = <Switch
            {...restProps}
            sx={{ color: this.state.error ? "#d32f2f" : "#616161" }}
            checked={this.state.value}
            onChange={this.onChange}
            inputRef={el => this.inputRef = el}
        />;
        return (
            label ? (
                <FormControlLabel onClick={this.onClick} control={input} style={{ userSelect: 'none' }} label={label} />
            ) : input
        )
    }
}