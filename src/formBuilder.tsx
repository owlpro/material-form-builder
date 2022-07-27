import { Box } from '@mui/material';
import React, { Component } from 'react';
import { NumberInputProps } from './inputs/number/number.interface';

import { TextInputProps } from './inputs/text/text.interface';
import { InputTypes } from './types/input.base';
import { Value } from './types/value.interface';

import { TextInput } from './inputs/text/text.input';
import { NumberInput } from './inputs/number/number.input';
import { setToObject } from './helpers/object.helper';

type Input = TextInputProps | NumberInputProps

type OutputValues = {
    data: Value,
    validation: {
        status: boolean,
        inputs: Input[]
    }
}

interface FormBuilderImplements {
    getValues: () => OutputValues;
    setValues: (values: Value) => Promise<void>;
    clear: () => Promise<void>;
}
interface IProps {
    inputs: Input[]
}

export class FormBuilder extends Component<IProps> implements FormBuilderImplements {

    private inputRefs: { [key: string]: any } = {}
    private inputs: { [key in InputTypes]: any } = {
        text: TextInput,
        number: NumberInput
    }


    public getValues = (): OutputValues => {
        const data: Value = {};
        const invalidInputs: Input[] = [];

        this.props.inputs.forEach(inputProps => {
            const input = this.inputRefs[inputProps.selector || ""]
            const isValid = input.validation()

            if (inputProps.required && !isValid) {
                invalidInputs.push(inputProps)
            }

            const value = input.getValue();
            setToObject(inputProps.selector || "", value, data)

            
            // data[inputProps.selector || ""] = input.getValue();
        })
        return {
            data,
            validation: {
                status: invalidInputs.length < 1,
                inputs: invalidInputs
            },
        }
    }

    public setValues = async (value: Value): Promise<any> => {
        const setValues = Object.keys(value).map(async selector => {
            const input = this.inputRefs[selector]
            if (input) {
                await input.setValue(value[selector])
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

    private renderInput = (input: Input, index: number) => {
        return React.createElement(this.inputs[input.type], { key: index, ref: (el) => this.inputRefs[input.selector || ""] = el, ...input })
    }

    render() {
        return (
            <div style={{ backgroundColor: 'silver' }}>
                <Box>
                    {this.props.inputs.map(this.renderInput)}
                </Box>
            </div >
        )
    }
}
