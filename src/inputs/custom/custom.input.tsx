import React, { Component, Fragment } from "react";
import { Input } from '../../types/input';
import { InputImplement } from '../../types/input.implement';
import { CustomInputProps, CustomInputValueType } from './custom.interface';

interface IState {
    value: CustomInputValueType,
    error: boolean
}

export class CustomInput extends Component<CustomInputProps, IState> implements InputImplement<CustomInputValueType> {

    private elementRef: Input | undefined;
    state: IState = {
        value: null,
        error: false
    }

    async setValue(value: CustomInputValueType): Promise<any> {
        if (typeof this.elementRef?.setValue === "function") {
            return await this.elementRef?.setValue(value)
        }
    }

    getValue(): CustomInputValueType {
        if (typeof this.elementRef?.getValue === "function") {
            return this.elementRef?.getValue();
        }
        return null;
    }

    async clear(): Promise<any> {
        if (typeof this.elementRef?.clear === "function") {
            return await this.elementRef?.clear();
        }
    }

    validation(): boolean {
        if (typeof this.elementRef?.validation === "function") {
            return this.elementRef?.validation();
        }
        return true;
    }

    public click = () => {
        // this.inputRef?.click()
    }
    public focus = () => {
        // this.inputRef?.focus()
    }
    public blur = () => {
        // this.inputRef?.blur()
    }

    render() {
        const { element, ...rest } = this.props;
        const render = React.createElement(element, { ref: (el: Input) => this.elementRef = el, ...rest });

        return (
            <Fragment> {render} </Fragment>
        )
    }
}