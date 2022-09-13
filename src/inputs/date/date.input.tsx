import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { Component } from "react";
import { InputImplement } from '../../types/input.implement';
import { DateInputProps, DateInputValueType } from './date.types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface IState {
    value: DateInputValueType,
    error: boolean
}

export class DateInput extends Component<DateInputProps, IState> implements InputImplement<DateInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    shouldComponentUpdate(nextProps: DateInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
                return true;
            default: return false;
        }
    }

    async setValue(value: DateInputValueType): Promise<any> {        
        if (value === this.state.value) return Promise.resolve()
        const setStatePromise = await this.setState({ ...this.state, value })
        if (typeof this.props.onChangeValue === "function") {
            this.props.onChangeValue(value as DateInputValueType)
        }
        return setStatePromise
    }

    getValue(): DateInputValueType {
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

        let value: DateInputValueType = event;
        this.setValue(value || null)

    };

    private onClick = (event: React.MouseEvent<HTMLElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
    }

    render() {
        const { onChangeValue, dateAdapter, variant, required, ...restProps } = this.props;
        return (
            <LocalizationProvider dateAdapter={dateAdapter || AdapterDayjs}>
                <DatePicker
                    {...restProps}
                    value={this.state.value}
                    onChange={this.onChange}
                    renderInput={(params: any) => <TextField {...params} variant={variant || 'standard'} required={required || false} error={this.state.error} onClick={this.onClick} />}
                />
            </LocalizationProvider>
        )
    }
}