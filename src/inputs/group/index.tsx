import { InputImplement, OutputValues } from '@/types';
import React, { Component, createRef, RefObject } from "react";
import { FormBuilder } from "@/formBuilder";
import { GroupInputProps, GroupInputValueType } from './types';

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