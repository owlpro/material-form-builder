import TextField from '@mui/material/TextField';
import React, { Component } from "react";
import { IInput } from "../types/input.interface";
import { IInputProps } from "../types/input.props.interface";

type ValueType = string | null;

interface IProps extends IInputProps<ValueType> {

}

interface IState {
    value: ValueType
}


export class TextInput extends Component<IProps, IState> implements IInput<ValueType> {
    state: IState = {
        value: null
    }

    async setValue(value: ValueType): Promise<void> {
        return this.setState({ ...this.state, value })
    }

    getValue(): ValueType {
        return this.state.value || null;
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setValue(event.target.value || null)
    };

    render() {
        return <TextField label={this.props.label} onChange={this.onChange} value={this.state.value || ''} />
    }
}