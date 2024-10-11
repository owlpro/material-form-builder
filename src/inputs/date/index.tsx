import { DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker/index.js';
import { Dayjs } from 'dayjs';
import React, { Component } from "react";
import { InputImplement } from '../../types';
import { DateInputProps, DateInputValueType } from './types';

interface IState {
    value: DateInputValueType,
    error: boolean
}

export class DateInput extends Component<DateInputProps, IState> implements InputImplement<DateInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: any;

    inputRef: HTMLInputElement | null | undefined;

    shouldComponentUpdate(nextProps: DateInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.props.label !== nextProps.label:
            case this.props.disabled !== nextProps.disabled:
                return true;
            default: return false;
        }
    }

    setValue(value: DateInputValueType): Promise<DateInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)

        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as DateInputValueType)
                resolve(value)
            })
        })
    }

    getValue(): DateInputValueType {
        return this.state.value || null;
    }

    clear(): Promise<DateInputValueType> {
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

    onChange = (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => {
        this.setValue(value)
        this.props.onChange?.(value, context)
    };

    private onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
        this.props.InputProps?.onClick?.(event)
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
        const { onChangeValue, defaultValue, variant, required, visible, _call_parent_for_update, ...restProps } = this.props;
        return (
            <DatePicker
                {...restProps}
                value={this.state.value}
                onChange={this.onChange}
                inputRef={el => this.inputRef = el}
                slotProps={{
                    textField: {
                        fullWidth: this.props.fullWidth ?? false,
                        variant: variant ?? "standard",
                        required: required ?? false,
                        error: this.state.error,
                        onClick: this.onClick
                    }
                }}
            />
        )
    }
}