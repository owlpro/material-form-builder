import { Box, Button } from "@mui/material";
import React, { Component } from "react";
import { FormBuilder } from "../../formBuilder";
import { randomString } from "../../helpers/general.helper";
import { OutputValues } from "../../types/builder.outputValues";
import { InputImplement } from '../../types/input.implement';
import { ItemsInputProps, ItemsInputValueType } from './items.interface';

interface IState {
    error: boolean,
    items: string[],
}

export class ItemsInput extends Component<ItemsInputProps, IState> implements InputImplement<ItemsInputValueType> {
    state: IState = {
        error: false,
        items: []
    }

    validationTimeout: NodeJS.Timeout | undefined;
    formBuilderRef: { [key: string]: FormBuilder | null } = {};

    shouldComponentUpdate(nextProps: ItemsInputProps, nextState: IState) {
        switch (true) {
            case this.state.items.length !== nextState.items.length:
                return true;
            default: return false;
        }
    }

    async setValue(values: ItemsInputValueType): Promise<any> {
        await this.setState({ ...this.state, items: [] })
        this.formBuilderRef = {}

        if (!values) return Promise.resolve()
        return await Promise.all(values.map(async (object) => {
            const key = await this.addItem();
            const formBuilderRef = this.formBuilderRef[key];
            if (formBuilderRef) {
                formBuilderRef.setValues(object)
            }
        }))
    }

    exportFormBuilderData = (): OutputValues[] => {
        const values: OutputValues[] = [];
        for (const key in this.formBuilderRef) {
            const builder = this.formBuilderRef[key]
            if (builder) {
                values.push(builder.getValues())
            }
        }
        return values;
    }
    getValue(): any {
        const items = this.exportFormBuilderData();
        return items.map(item => item.data)
    }

    async clear(): Promise<any> {
        const clearAllPromise = Object.keys(this.formBuilderRef).map(async key => {
            const builder = this.formBuilderRef[key]
            if (builder) {
                return await builder.clear()
            }
        })

        return await Promise.all(clearAllPromise);
    }

    validation(): boolean {
        const data = this.exportFormBuilderData();
        return !data.some(datum => !datum?.validation.status);
    }

    addItem = async () => {
        const random = randomString(8)
        await this.setState((oldState) => {
            let state = { ...oldState }
            state.items = [...state.items, random];
            return state;
        })
        return random;
    }

    removeItem = (key: string) => async () => {
        const formBuilderRef = this.formBuilderRef[key];
        if (formBuilderRef) {
            formBuilderRef.clear()
            await this.setState((oldState) => {
                let state = { ...oldState }
                state.items = state.items.filter(item => item !== key);
                return state;
            })
            delete this.formBuilderRef[key];
        }
    }

    public click = () => { }
    public focus = () => { }
    public blur = () => { }

    render() {
        return <Box>
            <Button onClick={this.addItem}>add item</Button>
            <Button onClick={() => this.setValue(null)}>remove all</Button>
            {this.state.items.map((key) => {
                return (
                    <Box key={key}>
                        <Button onClick={this.removeItem(key)}>remove</Button>
                        <FormBuilder inputs={this.props.inputs} ref={el => this.formBuilderRef[key] = el} />
                    </Box>
                )
            })}
        </Box>
    }
}