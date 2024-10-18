import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker/index.js';
import React, { Component } from "react";

import { InputImplement } from '../../types';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { stringify } from 'src/helpers/general';
import { DatetimeInputProps, DatetimeInputValueType } from './types';

interface IState {
    value: DatetimeInputValueType,
    error: boolean
}

export class DatetimeInput extends Component<DatetimeInputProps, IState> implements InputImplement<DatetimeInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: any;
    inputRef: HTMLInputElement | null | undefined;

    shouldComponentUpdate(nextProps: DatetimeInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case stringify(nextProps?.updateListener ?? {}) !== stringify(this.props?.updateListener ?? {}):
                return true;
            default: return false;
        }
    }

    setValue(value: DatetimeInputValueType): Promise<DatetimeInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)

        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as DatetimeInputValueType)
                resolve(value)
            })
        })
    }

    getValue(): DatetimeInputValueType {
        return this.state.value || null;
    }

    clear(): Promise<DatetimeInputValueType> {
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

    onChange = (value: Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => {
        this.setValue(value || null)
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
        const { slotProps, fullWidth, updateListener, onChangeValue, defaultValue, variant, required, visible, _call_parent_for_update, ...restProps } = this.props;
        const { textField: textFieldSlotProps , ...restSlotProps } = slotProps ?? {};

        return (
            <DateTimePicker
                {...restProps}
                ampm={this.props.ampm || false}
                value={this.state.value}
                onChange={this.onChange}
                inputRef={el => this.inputRef = el}
                slotProps={{
                    ...restSlotProps,
                    textField: {
                        fullWidth: fullWidth ?? false,
                        variant: variant ?? "standard",
                        required: required ?? false,

                        ...textFieldSlotProps,

                        error: this.state.error,
                        onClick: this.onClick
                    }
                }}
            />
        )
    }
}