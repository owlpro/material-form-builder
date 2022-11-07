import TextField from '@mui/material/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { Component } from "react";
import { InputImplement } from '../../types/input.implement';
import { TimeInputProps, TimeInputValueType } from './time.types';

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
                return true;
            default: return false;
        }
    }

    async setValue(value: TimeInputValueType): Promise<any> {
        if (value === this.state.value) return Promise.resolve()
        const setStatePromise = await this.setState({ ...this.state, value })
        if (typeof this.props.onChangeValue === "function") {
            this.props.onChangeValue(value as TimeInputValueType)
        }
        return setStatePromise
    }

    getValue(): TimeInputValueType {
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

    onChange = (event: any) => {
        let value = event && event.toDate ? event.toDate() : event;
        this.setValue(value || null)
    };

    private onClick = () => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
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
        const { onChangeValue, dateAdapter, variant, required, visible, ...restProps } = this.props;
        return (
            <LocalizationProvider dateAdapter={dateAdapter || AdapterDayjs}>
                <TimePicker
                    {...restProps}
                    ampm={this.props.ampm || false}
                    value={this.state.value}
                    onChange={this.onChange}
                    inputRef={el => this.inputRef = el}
                    renderInput={(params: any) => (
                        <TextField
                            {...params}
                            inputProps={{
                                ...params.inputProps,
                                ...this.props.inputProps
                            }}
                            fullWidth={this.props.fullWidth || false}
                            variant={variant || "standard"}
                            required={required || false}
                            error={this.state.error}
                            onClick={this.onClick}
                        />
                    )}
                />
            </LocalizationProvider>
        )
    }
}