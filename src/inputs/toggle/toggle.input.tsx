import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { Component } from "react";
import { checkValue, stringify } from '../../helpers/general.helper';
import { InputImplement } from '../../types/input.implement';
import { ToggleInputProps, ToggleInputValueType } from './toggle.types';

interface IState {
    value: ToggleInputValueType,
    error: boolean
}

export class ToggleInput extends Component<ToggleInputProps, IState> implements InputImplement<ToggleInputValueType> {
    state: IState = {
        value: checkValue(this.props.defaultValue) ? (this.props.defaultValue === undefined ? null : this.props.defaultValue) : null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    inputRef: HTMLInputElement | undefined

    shouldComponentUpdate(nextProps: ToggleInputProps, nextState: IState) {
        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.props.label !== nextProps.label:
            case this.props.options.map(i => i.value).join('@') !== nextProps.options.map(i => i.value).join('@'):
            case this.props.label !== nextProps.label:
            case stringify(nextProps?.updateListener ?? {}) !== stringify(this.props?.updateListener ?? {}):
                return true;
            default: return false;
        }
    }

    setValue(value: ToggleInputValueType): Promise<ToggleInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)

        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as ToggleInputValueType)
                resolve(value)
            })
        })
    }

    getValue(): ToggleInputValueType {
        return checkValue(this.state.value) ? this.state.value : null;
    }

    clear(): Promise<ToggleInputValueType> {
        return this.setValue(this.props.defaultValue || null)
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

    onChange = (_: React.MouseEvent<HTMLElement>, value: ToggleInputValueType) => {
        this.setValue(checkValue(value) ? value : (this.props.enforceValueSet ? this.state.value : null)).then(() => {
            this.props.onChange?.(_, value)
        })
    };

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
        const { onChangeValue, visible, formatter, defaultValue, label, _call_parent_for_update, enforceValueSet, updateListener, ...restProps } = this.props;
        return (
            <ToggleButtonGroup
                {...restProps}
                color={this.state.error ? 'error' : (this.props.color || "primary")}
                value={this.state.value}
                exclusive={this.props.exclusive === false ? false : true}
                onChange={this.onChange}
            >
                {this.props.options.map((option, key) => <ToggleButton key={`${key}-${option.value}`} value={option.value}>{option.label}</ToggleButton>)}
            </ToggleButtonGroup>
        )
    }
}