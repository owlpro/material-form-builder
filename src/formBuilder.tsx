import { Box } from '@mui/material';
import React, { Component, Fragment } from 'react';
import { setToObject } from './helpers/object.helper';
import { OutputValues } from './types/builder.outputValues';
import { Input, InputGetValueTypes, InputProps, InputTypes } from './types/input';
import { Value } from './types/value.interface';

import { ItemsInput } from './inputs/items/items.input';
import { NumberInput } from './inputs/number/number.input';
import { TextInput } from './inputs/text/text.input';
import { ObjectLiteral } from 'typeorm';



interface FormBuilderImplements {
    getValues: () => OutputValues;
    setValues: (values: Value) => Promise<void>;
    clear: () => Promise<void>;
}

interface IProps {
    inputs: InputProps[]
}

export class FormBuilder extends Component<IProps> implements FormBuilderImplements {

    private inputRefs: { [key: string]: Input } = {}
    private inputs: { [key in InputTypes]: React.ElementType } = {
        text: TextInput,
        number: NumberInput,
        items: ItemsInput,
    }
    private defaultValues: ObjectLiteral = {};

    public getValues = (): OutputValues => {
        const data: ObjectLiteral = this.defaultValues || {};

        const invalidInputs: InputProps[] = [];

        this.props.inputs.forEach(inputProps => {
            const input = this.inputRefs[inputProps.selector]
            const isValid = input.validation();

            if ((inputProps.required || inputProps.type === "items") && !isValid) {
                invalidInputs.push(inputProps)
            }

            const value = input.getValue();
            setToObject(inputProps.selector, value, data)
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
        const input = this.inputRefs[selector]
        if (input && value) {
            await input.setValue(value)
        }
    }

    public setValues = async (value: ObjectLiteral): Promise<any> => {
        this.defaultValues = value;

        const setValues = Object.keys(value).map(async selector => {
            const valueItem = value[selector];

            if (typeof valueItem === "object" && !Array.isArray(valueItem)) {

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

    private renderInput = (input: InputProps, index: number) => {
        console.log(input)
        const element = React.createElement(this.inputs[input.type], { ref: (el: Input) => this.inputRefs[input.selector] = el, ...input });
        return (
            <Fragment key={index}>
                {input.wrapper ? input.wrapper(element) : element}
            </Fragment>
        )
    }

    render(): JSX.Element {
        return (
            <Box bgcolor={'silver'}>
                <Box>
                    {this.props.inputs.map(this.renderInput)}
                </Box>
            </Box>
        )
    }
}
