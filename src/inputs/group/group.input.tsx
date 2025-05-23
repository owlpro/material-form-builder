import React, { Component, createRef, RefObject } from "react";
import { FormBuilder } from "../../formBuilder";
import { stringify } from "../../helpers/general.helper";
import { OutputValues } from "../../types/builder.outputValues";
import { InputImplement } from '../../types/input.implement';
import { GroupInputProps, GroupInputValueType } from './group.interface';

interface IState {
    error: boolean,
    value: GroupInputValueType,
}

export class GroupInput extends Component<GroupInputProps, IState> implements InputImplement<GroupInputValueType> {
    state: IState = {
        error: false,
        value: null
    }

    validationTimeout: NodeJS.Timeout | undefined;
    builderRef: RefObject<FormBuilder>;

    constructor(props: GroupInputProps) {
        super(props)
        this.builderRef = createRef<FormBuilder>()
    }

    shouldComponentUpdate(nextProps: GroupInputProps, nextState: IState) {
        switch (true) {
            case JSON.stringify(this.state.value) !== JSON.stringify(nextState.value):
            case stringify(nextProps?.updateListener ?? {}) !== stringify(this.props?.updateListener ?? {}):
                return true;
            default: return false;
        }
    }

    setValue(values: GroupInputValueType): Promise<GroupInputValueType> {
        if (!this.builderRef.current || !values) return Promise.reject(values)
        return this.builderRef.current.setValues(values)
    }

    getValue(validation?: boolean): GroupInputValueType {
        return this.builderRef.current?.getValues(validation).data
    }

    clear(): Promise<GroupInputValueType> {
        return this.builderRef.current?.clear() || Promise.resolve()
    }

    validation(): boolean {
        const validation = this.builderRef.current?.getValues(true)?.validation;
        return typeof (validation?.status) == "boolean" ? validation?.status : true;
    }

    onChangeValue = (data: OutputValues) => {
        this.props._call_parent_for_update?.()
        this.props.onChangeValue?.(data)
    }

    public click = () => { }
    public focus = () => { }
    public blur = () => { }


    render() {
        return (
            <FormBuilder inputs={this.props.inputs} ref={this.builderRef} onChange={this.onChangeValue} />
        )
    }
}