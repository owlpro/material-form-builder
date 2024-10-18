import { Checkbox } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import React, { Component } from "react";
import { InputImplement } from '../../types';
import { CheckboxInputProps, CheckboxInputValueType } from './types';
import { stringify } from 'src/helpers/general';

interface IState {
    value: CheckboxInputValueType,
    error: boolean
}

export class CheckboxInput extends Component<CheckboxInputProps, IState> implements InputImplement<CheckboxInputValueType> {
    state: IState = {
        value: this.props.defaultChecked || false,
        error: false
    }

    validationTimeout: any;

    inputRef: HTMLInputElement | null | undefined;

    shouldComponentUpdate(nextProps: CheckboxInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case stringify(nextProps) !== stringify(this.props):
                return true;
            default: return false;
        }
    }

    setValue(value: CheckboxInputValueType): Promise<CheckboxInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)

        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as CheckboxInputValueType)

                resolve(value)
            })
        })
    }

    getValue(): CheckboxInputValueType {
        return this.state.value || false;
    }

    clear(): Promise<CheckboxInputValueType> {
        return this.setValue(this.props.checked || this.props.defaultChecked || false)
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
        const { defaultChecked, defaultValue, onChangeValue, visible, _call_parent_for_update, ...restProps } = this.props;
        const label = this.props.label + (this.props.required ? ' *' : '')
        return (
            <FormControlLabel onClick={this.onClick} control={
                <Checkbox
                    {...restProps}
                    sx={{ color: this.state.error ? "#d32f2f" : "#616161" }}
                    checked={this.state.value}
                    onChange={this.onChange}
                    inputRef={el => this.inputRef = el}
                />
            } style={{ userSelect: 'none' }} label={label} />
        )
    }
}