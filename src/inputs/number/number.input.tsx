import TextField from '@mui/material/TextField';
import React, { Component } from "react";
import { InputImplement } from '../../types/input.implement';
import { NumberInputProps } from './number.interface';

type ValueType = number | null;


interface IState {
    value: ValueType,
    error: boolean
}

export class NumberInput extends Component<NumberInputProps, IState> implements InputImplement<ValueType> {
    state: IState = {
        value: null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    shouldComponentUpdate(nextProps: NumberInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
                return true;
            default: return false;
        }
    }

    async setValue(value: ValueType): Promise<any> {
        return await this.setState({ ...this.state, value })
    }

    getValue(): ValueType {
        return this.state.value || null;
    }

    async clear(): Promise<any> {
        return await this.setValue(null)
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

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setValue(parseInt(event.target.value, 10) || null)
    };

    private onClick = (event: React.MouseEvent<HTMLElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
    }

    render() {
        console.log('render NumberInput')
        return <TextField {...this.props} variant={this.props.variant || "standard"} error={this.state.error} onChange={this.onChange} onClick={this.onClick} value={this.state.value || ''} />
    }
}