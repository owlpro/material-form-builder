import { Checkbox, FormControlLabel } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import React, { Component } from "react";
import { InputImplement } from '../../types/input.implement';
import { CheckboxInputProps, CheckboxInputValueType } from './checkbox.interface';
import { stringify } from '../../helpers/general.helper';

interface IState {
    value: CheckboxInputValueType,
    error: boolean
}

export class CheckboxInput extends Component<CheckboxInputProps, IState> implements InputImplement<CheckboxInputValueType> {
    state: IState = {
        value: this.props.defaultChecked || false,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    inputRef: HTMLInputElement | null | undefined;

    shouldComponentUpdate(nextProps: CheckboxInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.props.label !== nextProps.label:
            case this.props.disabled !== nextProps.disabled:
            case stringify(nextProps?.updateListener ?? {}) !== stringify(this.props?.updateListener ?? {}):
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
        const { defaultChecked, defaultValue, onChangeValue, visible, _call_parent_for_update, updateListener, ...restProps } = this.props;
        const label = this.props.label + (this.props.required ? ' *' : '')
        return (
            <FormControlLabel onClick={this.onClick} control={
                <Checkbox
                    {...restProps}
                    sx={{ color: this.state.error ? red[700] : grey[700] }}
                    checked={this.state.value}
                    onChange={this.onChange}
                    inputRef={el => this.inputRef = el}
                />
            } style={{ userSelect: 'none' }} label={label} />
        )
    }
}