import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, CircularProgress, FormControl, Grow, InputLabel, ListSubheader, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { Component, SyntheticEvent } from "react";
import { stringify } from '../../helpers/general.helper';
import { InputImplement } from '../../types/input.implement';
import { SelectInputProps, SelectInputValueType } from './select.types';
interface IState {
    value: SelectInputValueType,
    error: boolean
}

const LoadingComponent = (props: any) => (
    <Grow in={true} timeout={550}>
        <Box sx={{ paddingRight: '16px', paddingTop: '4px' }}>
            <CircularProgress size={18} />
        </Box>
    </Grow>
)

export class SelectInput extends Component<SelectInputProps, IState> implements InputImplement<SelectInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    inputRef: HTMLInputElement | null | undefined;

    shouldComponentUpdate(nextProps: SelectInputProps, nextState: IState) {
        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.props.options.map(i => i.value).join('@') !== nextProps.options.map(i => i.value).join('@'):
            case this.props.loading !== nextProps.loading:
            case this.props.label !== nextProps.label:
            case this.props.disabled !== nextProps.disabled:
            case stringify(nextProps?.updateListener ?? {}) !== stringify(this.props?.updateListener ?? {}):
                return true;
            default: return false;
        }
    }

    componentDidUpdate(props: SelectInputProps) {
        if (this.props.options.map(i => i.value).join('@') !== props.options.map(i => i.value).join('@')) {
            this.setValue(null)
        }
    }

    setValue(value: SelectInputValueType): Promise<SelectInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)
        const valueToSet: SelectInputValueType = value;
        return new Promise((resolve) => {
            this.setState({ ...this.state, value: valueToSet }, () => {
                this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(valueToSet as SelectInputValueType)
                resolve(valueToSet)
            })
        })
    }

    getValue(): SelectInputValueType {
        return this.state.value || null;
    }

    clear(): Promise<SelectInputValueType> {
        return this.setValue(this.props.defaultValue || null)
    }

    validation(): boolean {
        if (!this.state.value && this.props.required) {
            clearTimeout(this.validationTimeout)
            this.setState({ ...this.state, error: true })
            this.validationTimeout = setTimeout(() => {
                this.setState({ ...this.state, error: false })
            }, 3000)
            return false;
        }
        return true;
    }

    onChange = (event: SelectChangeEvent<any>, child: React.ReactNode) => {
        const value = event.target.value;
        this.setValue(value || null)
        this.props.onChange?.(event, child)
    };

    private onOpen = (event: SyntheticEvent<Element, Event>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
        this.props.onOpen?.(event)
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
        const { onChangeValue, variant, visible, required, _call_parent_for_update, loading, listSubheaderText, defaultValue, updateListener, ...restProps } = this.props;
        let variantWidth = '207px';
        if (this.props.variant === "outlined") variantWidth = "235px";
        if (this.props.variant === "filled") variantWidth = "231px";

        const inputWidth = this.props.fullWidth ? '100%' : variantWidth;

        return (
            <FormControl sx={{ width: inputWidth }} variant={variant || "standard"} error={this.state.error} id={this.props.selector}>
                <InputLabel required={required} id={`${this.props.selector + "-select-label"}`} htmlFor={`${this.props.selector + "-select-input"}`}>{this.props.label}</InputLabel>
                <Select
                    {...restProps}
                    labelId={`${this.props.selector + "-select-label"}`}
                    inputProps={{
                        id: `${this.props.selector + "-select-input"}`
                    }}
                    id={`${this.props.selector + "-select-identity"}`}
                    onOpen={this.onOpen}
                    value={this.state.value || (this.props.multiple ? [] : "")}
                    onChange={this.onChange}
                    disabled={this.props.disabled || this.props.loading}
                    IconComponent={this.props.loading ? LoadingComponent : (this.props.IconComponent || ArrowDropDownIcon)}
                    inputRef={el => this.inputRef = el}
                >
                    {!this.props.options.length ? (
                        <ListSubheader sx={{ textAlign: 'center' }}>
                            {this.props.listSubheaderText || (
                                "Items Not Found"
                            )}
                        </ListSubheader>
                    ) : this.props.options.map((option, key) => <MenuItem key={key} value={option.value}>{option.label}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }
}