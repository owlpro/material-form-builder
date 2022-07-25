import { Box, Button } from '@mui/material';
import React, { Component, ComponentClass, Fragment, lazy, ReactChild, ReactNode } from 'react';
import { Input, InputTypes } from './types/input';
import { InputRef } from './types/input.ref';


import { TextInput } from './inputs/text.input';

interface IProps {
    inputs: Input[]
}

export class FormBuilder extends Component<IProps> {

    private inputRefs: { [key: string]: any } = {}
    private inputs: { [key in InputTypes]: ComponentClass } = {
        text: TextInput,
        number: TextInput
    }


    onClick = () => {
        const data: { [key: string]: any } = {};
        for (const selector in this.inputRefs) {
            const input = this.inputRefs[selector]
            data[selector] = input.getValue();
        }

        console.log(data)
    }


    renderInput = (input: Input, index: number) => {
        return React.createElement(this.inputs[input.type], { key: index, ref: (el) => this.inputRefs[input.selector] = el, ...input })
    }

    render() {
        return (
            <div style={{ backgroundColor: 'silver' }}>
                <Box>
                    {this.props.inputs.map(this.renderInput)}
                </Box>
                <Button onClick={this.onClick}>test</Button>
            </div >
        )
    }
}
