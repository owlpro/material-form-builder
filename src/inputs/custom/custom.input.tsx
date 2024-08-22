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

    setValue(value: CustomInputValueType): Promise<CustomInputValueType> {
        if (typeof this.elementRef?.setValue === "function") {
            return this.elementRef?.setValue(value)
        }
        return Promise.resolve(null)
    }

    getValue(): CustomInputValueType {
        if (typeof this.elementRef?.getValue === "function") {
            return this.elementRef?.getValue();
        }
        return null;
    }

    clear(): Promise<CustomInputValueType> {
        if (typeof this.elementRef?.clear === "function") {
            return this.elementRef?.clear();
        }
        return Promise.resolve(null)
    }

    validation(): boolean {
        if (typeof this.elementRef?.validation === "function") {
            return this.elementRef?.validation();
        }
        return true;
    }

    public click = () => {
        this.elementRef?.click()
    }
    public focus = () => {
        this.elementRef?.focus()
    }
    public blur = () => {
        this.elementRef?.blur()
    }

    render() {
        const { element, ...rest } = this.props;
        const render = React.createElement(element, { ref: (el: Input) => this.elementRef = el, ...rest });

        return (
            <Fragment> {render} </Fragment>
        )
    }
}