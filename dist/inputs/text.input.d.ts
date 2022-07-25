import React, { Component } from "react";
import { IInput } from "../types/input.interface";
import { IInputProps } from "../types/input.props.interface";
declare type ValueType = string | null;
interface IProps extends IInputProps<ValueType> {
}
interface IState {
    value: ValueType;
}
export declare class TextInput extends Component<IProps, IState> implements IInput<ValueType> {
    state: IState;
    setValue(value: ValueType): Promise<void>;
    getValue(): ValueType;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
export {};
