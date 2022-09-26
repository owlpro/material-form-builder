import React, { Component, Fragment } from 'react';
import { selectFromObject, setToObject } from './helpers/object.helper';
import { OutputValues } from './types/builder.outputValues';
import { Input, InputGetValueTypes, InputProps, InputTypes } from './types/input';

import { AutocompleteInput } from './inputs/autocomplete/autocomplete.input';
import { CheckboxInput } from './inputs/checkbox/checkbox.input';
import { CustomInput } from './inputs/custom/custom.input';
import { DateInput } from './inputs/date/date.input';
import { DatetimeInput } from './inputs/datetime/datetime.input';
import { FileInput } from './inputs/file/file.input';
import { ItemsInput } from './inputs/items/items.input';
import { MaskInput } from './inputs/mask/mask.input';
import { MobileInput } from './inputs/mobile/mobile.input';
import { NumberInput } from './inputs/number/number.input';
import { OtpInput } from './inputs/otp/otp.input';
import { PasswordInput } from './inputs/password/password.input';
import { SelectInput } from './inputs/select/select.input';
import { TextInput } from './inputs/text/text.input';
import { TimeInput } from './inputs/time/time.input';
import { ObjectLiteral } from './types/helper.types';
import { InputActions } from './types/input.base';



interface FormBuilderImplements {
    getValues: () => OutputValues;
    setValues: (values: ObjectLiteral) => Promise<void>;
    clear: () => Promise<void>;
}

interface IProps {
    inputs: InputProps[]
}

interface IState {
    isMounted: boolean
}

export class FormBuilder extends Component<IProps, IState> implements FormBuilderImplements {
    state: IState = {
        isMounted: false
    }

    private inputRefs: { [key: string]: Input } = {}
    private inputs: { [key in InputTypes]: React.ElementType } = {
        text: TextInput,
        number: NumberInput,
        items: ItemsInput,
        custom: CustomInput,
        checkbox: CheckboxInput,
        mobile: MobileInput,
        otp: OtpInput,
        password: PasswordInput,
        select: SelectInput,
        date: DateInput,
        time: TimeInput,
        datetime: DatetimeInput,
        mask: MaskInput,
        file: FileInput,
        autocomplete: AutocompleteInput
    }

    private defaultValues: ObjectLiteral | null = null;

    componentDidMount() {
        this.setState({ ...this.state, isMounted: true })
    }

    componentWillUnmount(): void {
        this.setState({ ...this.state, isMounted: false })
    }

    public getValues = (): OutputValues => {
        const data: ObjectLiteral = this.defaultValues || {};

        const invalidInputs: InputProps[] = [];

        this.props.inputs.forEach(inputProps => {
            const input = this.inputRefs[inputProps.selector]
            if (input) {
                const isValid = input.validation();
                if ((inputProps.required || inputProps.type === "items" || inputProps.type === "custom") && !isValid) {
                    invalidInputs.push(inputProps)
                }
                let value = input.getValue();
                if (inputProps.getMutator && typeof inputProps.getMutator === "function") {
                    let mutatedValue = inputProps.getMutator(value)
                    value = mutatedValue !== undefined ? mutatedValue : value;
                }

                setToObject(inputProps.selector, value, data)
            }
        })
        return {
            data,
            validation: {
                status: invalidInputs.length < 1,
                inputs: invalidInputs
            },
        }
    }

    private setObjectValues(object: ObjectLiteral, path: string[] = []) {
        for (const key in object) {
            const value = object[key]
            if (typeof value === "object" && !Array.isArray(value)) {
                path.push(key)
                this.setObjectValues(value, path)
            } else {
                this.setNormalValue([...path, key].join('.'), value)
            }
        }
    }

    private async setNormalValue(selector: string, value: InputGetValueTypes) {
        const regex = new RegExp('^(' + selector + ')\\[.*\\=.*\\]\\..*')
        const keyValueSelectors = Object.keys(this.inputRefs).filter(i => regex.test(i))
        if (Array.isArray(value) && keyValueSelectors.length) {
            await Promise.all(keyValueSelectors.map(async keyValueSelector => {
                let valueItem = selectFromObject(keyValueSelector.replace(selector, ''), value)
                const input = this.inputRefs[keyValueSelector]
                if (!input || valueItem === undefined) return false;

                const inputProps = this.props.inputs.find(i => i.selector === keyValueSelector)
                if (inputProps?.setMutator && typeof inputProps.setMutator === "function") {
                    const mutatedValue = inputProps.setMutator(valueItem);
                    valueItem = mutatedValue !== undefined ? mutatedValue : valueItem;
                }
                await input.setValue(valueItem)
            }))
        } else {
            const input = this.inputRefs[selector]
            if (input && value) {
                const inputProps = this.props.inputs.find(i => i.selector === selector)
                if (inputProps?.setMutator && typeof inputProps.setMutator === "function") {
                    const mutatedValue = inputProps.setMutator(value);
                    value = mutatedValue !== undefined ? mutatedValue : value;
                }

                await input.setValue(value)
            }
        }
    }

    public setValues = async (value: ObjectLiteral): Promise<any> => {
        this.defaultValues = value;
        const setValues = Object.keys(value).map(async selector => {
            const valueItem = value[selector];
            if (typeof valueItem === "object" && !Array.isArray(valueItem) && !(valueItem instanceof Date)) {
                this.setObjectValues(valueItem, [selector])
            } else {
                this.setNormalValue(selector, valueItem)
            }
        })
        return await Promise.all(setValues)
    }

    public clear = async (): Promise<any> => {
        const clearValues = Object.keys(this.inputRefs).map(async selector => {
            const input = this.inputRefs[selector]
            if (input) {
                await input.clear();
            }
        })
        return await Promise.all(clearValues)
    }

    private renderInput = (input: InputProps, index: number): JSX.Element | null => {
        if (input.visible === false) return null;

        const { wrapper, getMutator, setMutator, ...props } = input
        const actions: InputActions = {
            setValue: (data: any) => { if (this.state.isMounted) this.inputRefs[input.selector].setValue(data) },
            getValue: () => { if (this.state.isMounted) this.inputRefs[input.selector].getValue() },
            clear: () => { if (this.state.isMounted) this.inputRefs[input.selector].clear() },
            click: () => { if (this.state.isMounted) this.inputRefs[input.selector].click() },
            focus: () => { if (this.state.isMounted) this.inputRefs[input.selector].focus() },
            blur: () => { if (this.state.isMounted) this.inputRefs[input.selector].blur() }
        };
        const element = React.createElement(this.inputs[input.type], { ref: (el: Input) => this.inputRefs[input.selector] = el, ...props, actions });
        return (
            <Fragment key={index}>
                {wrapper ? wrapper(element, actions) : element}
            </Fragment>
        )
    }

    render(): JSX.Element {
        return (
            <Fragment>
                {this.props.inputs.map(this.renderInput)}
            </Fragment>
        )
    }
}
