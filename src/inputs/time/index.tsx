import TextField from '@mui/material/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { Component, MouseEvent } from "react";
import { InputImplement } from '@/types';
import { TimeInputProps, TimeInputValueType } from './types';

interface IState {
    value: TimeInputValueType,
    error: boolean
}

export class TimeInput extends Component<TimeInputProps, IState> implements InputImplement<TimeInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    shouldComponentUpdate(nextProps: TimeInputProps, nextState: IState) {
        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.props.label !== nextProps.label:
            case this.props.label !== nextProps.label:
                return true;
            default: return false;
        }
    }

    setValue(value: TimeInputValueType): Promise<TimeInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)

        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as TimeInputValueType)
                resolve(value)
            })
        })
    }

    getValue(): TimeInputValueType {
        return this.state.value || null;
    }

    clear(): Promise<TimeInputValueType> {
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

    onChange = (inputValue: any, keyboardInputValue?: string) => {
        let value = inputValue && inputValue.toDate ? inputValue.toDate() : inputValue;
        this.setValue(value || null).then(() => {
            this.props.onChange?.(inputValue, keyboardInputValue)
        })
    };

    private onClick = (event: MouseEvent<HTMLDivElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
        // this.props.InputProps?.onClick?.(event) // TODO ??
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
        const { defaultValue, onChangeValue, dateAdapter, variant, required, visible, _call_parent_for_update, ...restProps } = this.props;
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label="Basic date picker" />
            </LocalizationProvider>
            // <LocalizationProvider dateAdapter={dateAdapter || AdapterDayjs}>
            //     <TimePicker
            //         {...restProps}
            //         ampm={this.props.ampm || false}
            //         value={this.state.value}
            //         onChange={this.onChange}
            //         inputRef={el => this.inputRef = el}
            //         renderInput={(params: any) => (
            //             <TextField
            //                 {...params}
            //                 {...this.props.InputProps}
            //                 inputProps={{
            //                     ...params.inputProps,
            //                     ...this.props.inputProps
            //                 }}
            //                 fullWidth={this.props.fullWidth || false}
            //                 variant={variant || "standard"}
            //                 required={required || false}
            //                 error={this.state.error}
            //                 onClick={this.onClick}
            //             />
            //         )}
            //     />
            // </LocalizationProvider>
        )
    }
}