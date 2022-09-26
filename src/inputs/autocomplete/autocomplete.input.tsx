import { Autocomplete, AutocompleteRenderInputParams } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { Component } from "react";
import { InputImplement } from '../../types/input.implement';
import { AutocompleteInputProps, AutocompleteOptionType, AutocompleteValueType } from './autocomplete.types';

interface IState {
    value: AutocompleteValueType,
    error: boolean
}

export class AutocompleteInput extends Component<AutocompleteInputProps, IState> implements Omit<InputImplement<AutocompleteValueType>, 'onChange'> {
    state: IState = {
        value: this.getDefaultsValue(),
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    inputRef: HTMLInputElement | undefined

    private getDefaultsValue() {
        return typeof this.props.defaultValue?.[0] === "string"
            ? this.props.defaultValue
            : this.props.options.filter(option => this.props.defaultValue?.some(
                item =>
                    (typeof item === "string" ? item : item?.value) === (typeof option === "string" ? option : option?.value))) || null
    }

    shouldComponentUpdate(nextProps: AutocompleteInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
                return true;
            default: return false;
        }
    }

    async setValue(value: AutocompleteValueType): Promise<any> {
        const joinedValues = value?.map((i) => typeof i === "string" ? i : i.value).join('@')
        const joinedCurrentValues = this.state.value?.map((i) => typeof i === "string" ? i : i.value).join('@')
        if (joinedValues === joinedCurrentValues) return Promise.resolve()

        const setStatePromise = await this.setState({ ...this.state, value })
        if (typeof this.props.onChangeValue === "function") {
            this.props.onChangeValue(value as AutocompleteOptionType[])
        }
        return setStatePromise
    }

    getValue(): AutocompleteValueType {
        return this.state.value || [];
    }

    async clear(): Promise<any> {
        return await this.setValue(this.getDefaultsValue() || null)
    }

    validation(): boolean {
        if (!this.state.value || (Array.isArray(this.state.value) && this.state.value.length < 1) && this.props.required) {
            clearTimeout(this.validationTimeout)
            this.setState({ ...this.state, error: true })
            this.validationTimeout = setTimeout(() => {
                this.setState({ ...this.state, error: false })
            }, 3000)
            return false;
        }
        return true;
    }

    onChange = (_: React.SyntheticEvent, value: AutocompleteValueType) => {
        this.setValue(value || null)

    };

    private onClick = (event: React.MouseEvent<HTMLElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
    }

    public click = () => {
        this.inputRef?.click()
    }
    public focus = () => {
        this.inputRef?.focus()
    }
    public blur = () => {
        this.inputRef?.blur()
    }

    render() {
        const { defaultValue, onChangeValue, InputProps, renderInput, label, variant, required, visible, ...restProps } = this.props;
        return (
            <Autocomplete
                {...restProps}
                options={this.props.options}
                onChange={this.onChange}
                value={this.state.value || undefined}
                renderInput={renderInput ? (params: any) => {
                    params.inputRef = (el: any) => this.inputRef = el
                    params.error = this.state.error;
                    params.variant = variant || "standard"
                    params.label = label;
                    params.required = required
                    params.onClick = this.onClick
                    return renderInput(params)
                } : ((params: AutocompleteRenderInputParams) => <TextField
                    {...params}
                    {...InputProps}
                    label={label}
                    variant={variant || "standard"}
                    required={required}
                    onClick={this.onClick}
                    error={this.state.error}
                    inputRef={el => this.inputRef = el} />
                )}
            />
        )
    }
}