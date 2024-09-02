import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteRenderInputParams, Box, CircularProgress, Grow, IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { Component } from "react";
import { isNull } from '../../helpers/general.helper';
import { InputImplement } from '../../types/input.implement';
import { AutocompleteInputProps, AutocompleteInputValueType, AutocompleteOptionType, AutocompleteValueType } from './autocomplete.types';

const LoadingComponent = (props: any) => (
    <Grow in={true} timeout={550}>
        <Box sx={{ paddingRight: '8px', paddingTop: '4px' }}>
            <CircularProgress size={18} />
        </Box>
    </Grow>
)
interface IState {
    value: AutocompleteValueType | null,
    error: boolean
}

export class AutocompleteInput extends Component<AutocompleteInputProps, IState> implements Omit<InputImplement<AutocompleteInputValueType>, 'onChange'> {
    state: IState = {
        value: this.getValuesFrom(this.props.defaultValue || null),
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    inputRef: HTMLInputElement | undefined

    shouldComponentUpdate(nextProps: AutocompleteInputProps, nextState: IState) {
        switch (true) {
            case this.state.value !== nextState.value:
            case this.getValueForCheck(this.state.value || undefined) !== this.getValueForCheck(nextState.value || undefined):
            case this.state.error !== nextState.error:
            case this.props.options?.map((i) => this.optionGetter(i, 'value')).join('@') !== nextProps.options?.map((i) => this.optionGetter(i, 'value')).join('@'):
            case this.props.loading !== nextProps.loading:
            case this.props.loadingText !== nextProps.loadingText:
            case this.props.label !== nextProps.label:
            case this.props.disabled !== nextProps.disabled:
                return true;
            default: return false;
        }
    }

    private getValuesFrom(value: AutocompleteInputValueType) {
        if (!value) return null;
        if (this.props.multiple && !Array.isArray(value)) return null;
        if (!this.props.multiple && Array.isArray(value)) return null;
        if (this.props.freeSolo && !this.props.multiple) {
            const exists = this.props.options.find(i => (typeof i === "string" ? i : i.value) === value || (typeof i === "string" ? i : i.label) === value);
            return exists || { label: value?.toString() || "", value: value?.toString() || "" }
        }

        if (this.props.freeSolo && this.props.multiple && typeof value === "object" && Array.isArray(value)) {
            const outputOptions = value.map(valueItem => {
                const exists = this.props.options.find(i => (typeof i === "string" ? i : i.value) === valueItem)
                return exists || { label: valueItem?.toString().trim() || "", value: valueItem?.toString().trim() || "" }
            })
            return outputOptions;
        }
        if (typeof value === "object" && Array.isArray(value)) {
            return this.props.options.filter(i => value.indexOf(typeof i === "string" ? i : i.value) > -1);
        } else if (value) {
            return this.props.options.find(i => (typeof i === "string" ? i : i.value) === value);
        }
        return undefined;
    }

    componentDidUpdate(props: AutocompleteInputProps) {
        if (this.props.options?.map((i) => this.optionGetter(i, 'value')).join('@') !== props.options?.map((i) => this.optionGetter(i, 'value')).join('@')) {
            this.clear()
        }
    }

    setValue(value: AutocompleteInputValueType): Promise<AutocompleteInputValueType> {
        const valueToSet = this.getValuesFrom(value)
        return new Promise((resolve) => {
            this.setState({ ...this.state, value: valueToSet }, () => {
                this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as AutocompleteInputValueType)
                resolve(value)
            })
        })
    }

    getValue(): AutocompleteInputValueType {
        return (
            Array.isArray(this.state.value)
                ? this.state.value.map(i => typeof i === "string" ? i : i.value)
                : typeof this.state.value === "string" ? this.state.value : this.state.value?.value
        ) || (this.props.multiple ? [] : null)
    }

    clear(withoutDefaults = false): Promise<AutocompleteInputValueType> {
        return this.setValue((!withoutDefaults ? this.props.defaultValue : null) || null)
    }

    validation(): boolean {
        if (!this.getValueForCheck(this.state.value) && this.props.required) {
            clearTimeout(this.validationTimeout)
            this.setState({ ...this.state, error: true })
            this.validationTimeout = setTimeout(() => {
                this.setState({ ...this.state, error: false })
            }, 3000)
            return false;
        }
        return true;
    }

    onChange = (_: React.SyntheticEvent, option: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => {
        if (Array.isArray(option)) {
            this.setValue(option.map(i => typeof i === "string" ? i : i.value))
        } else {
            this.setValue(typeof option === "string" ? option : option.value)
        }

        this.props.onChange?.(_, option, reason, details)
    };

    private onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
        this.props.onClick?.(event)
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
        return typeof item === "string" || typeof item === "number" || isNull(item) ? (item ?? "") : (item?.[selector] ?? "")
    }

    private getValueForCheck(value: AutocompleteValueType | undefined | null) {
        return !isNull(value) && Array.isArray(value) ? value.join('@') : value;
    }

    private onInputBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        if (!this.props.multiple && this.props.freeSolo) {
            this.setValue(event.target.value)
        }

        this.props.InputProps?.onBlur?.(event)
    }

    private renderOption = (props: any, option: any) => {
        const { key, ...rest } = props;
        return (
            <li key={key} {...rest}>
                {typeof option === "object" ? option.label : (option.toString())}
            </li>
        );
    }

    private getOptionLabel = (option: any) => typeof option === "object" ? option.label : (option.toString())

    private isOptionEqualToValue = (option: any, value: any) => {
        if (!value) return false;
        return typeof option === "string" ? option === (typeof value === "string" ? value : value.value.toString()) : option.value.toString() === (typeof value === "string" ? value : value.value.toString());
    }

    render() {
        const { defaultValue, onChangeValue, InputProps, renderInput, label, variant, required, visible, _call_parent_for_update, ...restProps } = this.props;
        let variantWidth = '207px';
        if (this.props.variant === "outlined") variantWidth = "235px";
        if (this.props.variant === "filled") variantWidth = "231px";
        const inputWidth = this.props.fullWidth ? '100%' : variantWidth;
        return (
            <Autocomplete
                {...restProps}
                sx={{ width: inputWidth, display: 'inline-flex', ...this.props.sx }}
                options={this.props.options}
                renderOption={this.props.renderOption ?? this.renderOption}
                getOptionLabel={this.props.getOptionLabel ?? this.getOptionLabel}
                onChange={this.onChange}
                disableClearable={this.props.disableClearable || false}
                size={this.props.size || !variant || variant === "standard" ? "small" : "medium"}
                value={this.state.value || (this.props.multiple ? [] : (this.props.freeSolo ? "" : null))}
                disabled={this.props.disabled || this.props.loading}
                clearOnBlur={this.props.multiple || (this.props.multiple && this.props.freeSolo) || (!this.props.multiple && !this.props.freeSolo)}
                popupIcon={this.props.loading ? <LoadingComponent /> : (this.props.popupIcon || <ArrowDropDownIcon />)}
                isOptionEqualToValue={this.props.isOptionEqualToValue ?? this.isOptionEqualToValue}
                renderInput={renderInput ? (params: any) => {
                    params.inputRef = (el: any) => this.inputRef = el
                    params.error = this.state.error;
                    params.variant = variant || "standard"
                    params.label = label;
                    params.required = required
                    params.onClick = this.onClick
                    return renderInput(params)
                } : ((params: AutocompleteRenderInputParams) => (
                    <TextField
                        {...params}
                        {...InputProps}
                        label={label}
                        placeholder={InputProps?.placeholder}
                        variant={variant || "standard"}
                        required={required}
                        onClick={this.onClick}
                        error={this.state.error}
                        inputRef={el => this.inputRef = el}
                        InputProps={{
                            ...InputProps?.InputProps,
                            ...params.InputProps,
                            onBlur: this.onInputBlur,
                            endAdornment: (
                                <InputAdornment position="end">
                                    {params.InputProps.endAdornment}
                                    {!this.props.disableClearable && this.getValueForCheck(this.state.value) ? (
                                        <IconButton size="small" onClick={(e) => {
                                            e.stopPropagation()
                                            this.clear(true)
                                        }}>
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    ) : null}
                                </InputAdornment>
                            )
                        }}
                    />
                )
                )}
            />
        )
    }
}