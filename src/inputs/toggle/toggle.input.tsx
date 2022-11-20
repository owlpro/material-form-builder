import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { Component } from "react";
import { InputImplement } from '../../types/input.implement';
import { ToggleInputProps, ToggleInputValueType } from './toggle.types';

interface IState {
    value: ToggleInputValueType,
    error: boolean
}

export class ToggleInput extends Component<ToggleInputProps, IState> implements InputImplement<ToggleInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    inputRef: HTMLInputElement | undefined

    shouldComponentUpdate(nextProps: ToggleInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.props.label !== nextProps.label:
                return true;
            default: return false;
        }
    }

    async setValue(value: ToggleInputValueType): Promise<any> {
        if (value === this.state.value) return Promise.resolve()

        const setStatePromise = await this.setState({ ...this.state, value })
        if (typeof this.props.onChangeValue === "function") {
            await this.props.onChangeValue(value as ToggleInputValueType)
        }
        if(typeof this.props.callParentForUpdate === "function") this.props.callParentForUpdate()
        return setStatePromise
    }

    getValue(): ToggleInputValueType {
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

    onChange = (_: React.MouseEvent<HTMLElement>, value: ToggleInputValueType) => {
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
        const { onChangeValue, visible, formatter, defaultValue, label, ...restProps } = this.props;
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
        // return <TextField
        //     {...restProps}
        //     // variant={this.props.variant || "standard"}
        //     error={this.state.error}
        //     onChange={this.onChange}
        //     onClick={this.onClick}
        //     value={this.state.value || ''}
        //     inputRef={el => this.inputRef = el}
        // />
    }
}