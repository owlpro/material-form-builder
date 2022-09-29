import { Autocomplete, AutocompleteRenderInputParams } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { Component } from "react";
import { randomString } from '../../helpers/general.helper';
import { InputImplement } from '../../types/input.implement';
import { AutocompleteInputProps, AutocompleteOptionType, AutocompleteValueType } from './autocomplete.types';

interface IState {
    key: string,
    value: AutocompleteValueType,
    error: boolean
}

export class AutocompleteInput extends Component<AutocompleteInputProps, IState> implements Omit<InputImplement<AutocompleteValueType>, 'onChange'> {
    state: IState = {
        key: randomString(10),
        value: this.getDefaultsValue(),
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    inputRef: HTMLInputElement | undefined

    private getDefaultsValue() {
        return this.props.defaultValue || null

        // return typeof this.props.defaultValue?.[0] === "string"
        //     ? this.props.defaultValue
        //     : this.props.options.filter(option => this.props.defaultValue?.some(
        //         item =>
        //             (typeof item === "string" ? item : item?.value) === (typeof option === "string" ? option : option?.value))) || null
    }

    shouldComponentUpdate(nextProps: AutocompleteInputProps, nextState: IState) {
        switch (true) {
            case this.state.key !== nextState.key:
            case this.state.value !== nextState.value:
            case this.getValueForCheck(this.state.value) !== this.getValueForCheck(nextState.value):
            case this.state.error !== nextState.error:
            case this.props.options?.map((i) => this.optionGetter(i, 'value')).join('@') !== nextProps.options?.map((i) => this.optionGetter(i, 'value')).join('@'):
                return true;
            default: return false;
        }
    }

    async setValue(value: AutocompleteValueType): Promise<any> {
        if (value && this.getValueForCheck(value) === this.getValueForCheck(this.state.value)) return Promise.resolve()
        const setStatePromise = await this.setState({ ...this.state, value })
        if (typeof this.props.onChangeValue === "function") {
            this.props.onChangeValue(value as AutocompleteValueType)
        }
        return setStatePromise
    }

    getValue(): AutocompleteValueType {
        return this.state.value;
    }

    async clear(): Promise<any> {
        await this.setState({ ...this.state, key: randomString(10) })
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

    onChange = (_: React.SyntheticEvent, value: AutocompleteOptionType | AutocompleteValueType) => {
        !value ? this.clear() : this.setValue(value || null)
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

    private optionGetter(item: AutocompleteOptionType, selector: "value" | "label" = "value") {
        return typeof item === "string" ? (item ?? "") : (item[selector] ?? "")
    }

    private getValueForCheck(value: AutocompleteValueType) {
        switch (typeof value) {
            case "string":
                return value;
            case "object":
                return Array.isArray(value) ? value.map(i => typeof i === "string" ? i : i.value).join('@') : value?.value
            default:
                return null;
        }
    }

    render() {
        const { defaultValue, onChangeValue, InputProps, renderInput, label, variant, required, visible, ...restProps } = this.props;
        let variantWidth = '207px';
        if (this.props.variant === "outlined") variantWidth = "235px";
        if (this.props.variant === "filled") variantWidth = "231px";

        return (
            <Autocomplete
                {...restProps}
                sx={{ width: variantWidth, display: 'inline-flex', ...this.props.sx }}
                key={this.state.key}
                options={this.props.options}
                getOptionLabel={(option) => this.optionGetter(option, 'label')}
                multiple={this.props.multiple}
                freeSolo={this.props.freeSolo}
                onChange={this.onChange}
                disableClearable={this.props.disableClearable}
                defaultValue={this.props.defaultValue}
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