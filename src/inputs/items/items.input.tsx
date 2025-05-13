import { Add, CopyAll, Delete, Remove } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React, { Component, Fragment } from "react";
import { FormBuilder } from "../../formBuilder";
import { randomString, stringify } from "../../helpers/general.helper";
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
            case JSON.stringify(this.state.items) !== JSON.stringify(nextState.items):
            case stringify(nextProps?.updateListener ?? {}) !== stringify(this.props?.updateListener ?? {}):
                return true;
            default: return false;
        }
    }

    UNSAFE_componentWillMount(): void {
        const setupItems = this.props.defaultItems ?? this.props.minItems ?? 0
        if (setupItems > 0) {
            const items: IState['items'] = [];

            [...Array(setupItems).keys()].forEach(() => {
                const random = this.getRandomKey()
                items.push(random)
            })

            this.setState({ ...this.state, items })
        }
    }

    private sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setValue(values: ItemsInputValueType): Promise<ItemsInputValueType> {
        if (!values) values = []

        return new Promise((resolve) => {
            this.setState({ ...this.state, items: [] }, async () => {
                const output = await Promise.all(values.map(async (object: any) => {
                    const key = await this.addItem();
                    return this.setItemValue(key, object)
                }))

                resolve(output)
            })
        })
    }

    private setItemValue = async (key: string, object: any): Promise<any> => {
        const formBuilderRef = this.formBuilderRef[key];
        if (!formBuilderRef) {
            await this.sleep(5)
            return await this.setItemValue(key, object)
        }

        return formBuilderRef.setValues(object)
    }

    exportFormBuilderData = (validation: boolean): OutputValues[] => {
        const values: OutputValues[] = [];
        for (const key in this.formBuilderRef) {
            const builder = this.formBuilderRef[key]
            if (builder) {
                values.push(builder.getValues(validation))
            }
        }
        return values;
    }

    getValue(validation?: boolean): any {
        if (validation === undefined) validation = true

        const items = this.exportFormBuilderData(validation);
        return items.map(item => item.data)
    }

    clear(): Promise<ItemsInputValueType> {
        return this.removeAll()
    }

    validation(validation?: boolean): boolean {
        const data = this.exportFormBuilderData(validation ?? true);
        return !data.some(datum => !datum?.validation.status);
    }

    getRandomKey = (): string => {
        const random = randomString(8)
        if (this.state.items.indexOf(random) > -1) return this.getRandomKey()
        return random;
    }

    addItem = (): Promise<string> => {
        if (typeof (this.props.maxItems) === "number" && this.state.items.length >= this.props.maxItems) return Promise.resolve('')

        const random = this.getRandomKey()

        return new Promise((resolve) => {
            this.setState((oldState) => {
                let state = { ...oldState }
                state.items = [...state.items, random];
                return state;
            }, () => {
                resolve(random)
            })
        })
    }

    copyItem = (key: string) => async () => {
        const newKey = await this.addItem()
        const builder = this.formBuilderRef[key]
        if (builder) {
            const copyData = builder.getValues(false).data;
            this.formBuilderRef[newKey]?.setValues(copyData)
        }
    }

    removeItem = (key: string) => async () => {
        if (typeof (this.props.minItems) === "number" && this.state.items.length <= this.props.minItems) return Promise.resolve('')
        const formBuilderRef = this.formBuilderRef[key];
        if (formBuilderRef) {
            await formBuilderRef.clear()
            this.setState((oldState) => {
                let state = { ...oldState }
                state.items = state.items.filter(item => item !== key);
                return state;
            }, () => {
                delete this.formBuilderRef[key];
            })
        }
    }

    removeAll = () => {
        const items: IState['items'] = [];

        [...Array(this.props.minItems).keys()].forEach(() => {
            const random = this.getRandomKey()
            items.push(random)
        })

        return this.setValue(items);
    }

    public click = () => { }
    public focus = () => { }
    public blur = () => { }

    renderItem = (key: string, withoutExtraElement: boolean = false) => {
        const removeButton = (
            this.props.removeIcon !== false ? (
                this.props.renderRemoveButton ? this.props.renderRemoveButton(this.removeItem(key)) : (
                    <IconButton onClick={this.removeItem(key)}>{this.props.removeIcon ? this.props.removeIcon : <Remove />}</IconButton>
                )
            ) : null
        );
        const copyButton = (
            this.props.copyIcon !== false ? (
                this.props.renderCopyButton ? this.props.renderCopyButton(this.copyItem(key)) : (
                    <IconButton onClick={this.copyItem(key)}>{this.props.copyIcon ? this.props.copyIcon : <CopyAll />}</IconButton>
                )
            ) : null
        )
        return withoutExtraElement ? (
            <Fragment key={key}>
                {removeButton}
                <FormBuilder inputs={this.props.inputs} ref={el => this.formBuilderRef = { ...this.formBuilderRef, [key]: el }} />
                {copyButton}
            </Fragment>
        ) : (
            <Box key={key} display="flex" alignItems="center">
                {removeButton}
                <FormBuilder inputs={this.props.inputs} ref={el => this.formBuilderRef = { ...this.formBuilderRef, [key]: el }} />
                {copyButton}
            </Box>
        )
    }



    render() {
        return (
            <>
                {this.props.renderHeader ? (
                    this.props.renderHeader(this.addItem, this.removeAll)
                ) : (
                    <Box>
                        <IconButton onClick={this.addItem}><Add /></IconButton>
                        <IconButton onClick={this.removeAll}><Delete /></IconButton>
                    </Box>
                )}

                {this.state.items.map((key) =>
                    this.props.itemWrapper
                        ? this.props.itemWrapper(this.renderItem(key, true), key)
                        : this.renderItem(key)
                )}
            </>
        )
    }
}