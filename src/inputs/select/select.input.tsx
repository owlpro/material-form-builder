import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, CircularProgress, FormControl, Grow, InputLabel, ListSubheader, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { Component } from "react";
import { InputImplement } from '../../types/input.implement';
import { SelectInputProps, SelectInputValueType } from './select.types';
interface IState {
    value: SelectInputValueType,
    error: boolean
}

export class SelectInput extends Component<SelectInputProps, IState> implements InputImplement<SelectInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    shouldComponentUpdate(nextProps: SelectInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.props.options.map(i => i.value).join('_') !== nextProps.options.map(i => i.value).join('_'):
                return true;
            default: return false;
        }
    }

    componentDidUpdate(props: SelectInputProps) {
        if (this.props.options.map(i => i.value).join('_') !== props.options.map(i => i.value).join('_')) {
            this.setValue(null)
        }
    }

    async setValue(value: SelectInputValueType): Promise<any> {
        if (value === this.state.value) return Promise.resolve()

        const setStatePromise = await this.setState({ ...this.state, value })
        if (typeof this.props.onChangeValue === "function") {
            this.props.onChangeValue(value as SelectInputValueType)
        }
        return setStatePromise
    }

    getValue(): SelectInputValueType {
        return this.state.value || null;
    }

    async clear(): Promise<any> {
        return await this.setValue(this.props.defaultValue || null)
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

    onChange = (event: SelectChangeEvent<any>) => {
        this.setValue(event.target.value || null)
    };

    private onOpen = () => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
    }

    inputRef: HTMLInputElement | null | undefined;

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
        const { onChangeValue, variant,visible, ...restProps } = this.props;
        let variantWidth = '207px';
        if (this.props.variant === "outlined") variantWidth = "235px";
        if (this.props.variant === "filled") variantWidth = "231px";

        const LoadingComponent = (props: any) => (
            <Grow in={true} timeout={550}>
                <Box sx={{ paddingRight: '16px', paddingTop: '4px' }}>
                    <CircularProgress size={24} />
                </Box>
            </Grow>
        )

        const inputWidth = this.props.fullWidth ? '100%' : variantWidth;

        return <FormControl sx={{ width: inputWidth }} variant={variant || "standard"}>
            <InputLabel id={`${this.props.selector + "-select-label"}`}>{this.props.label}</InputLabel>
            <Select
                {...restProps}
                id={`${this.props.selector + "-select-label"}`}
                onOpen={this.onOpen}
                value={this.state.value || (this.props.multiple ? [] : "")}
                onChange={this.onChange}
                disabled={this.props.loading}
                IconComponent={this.props.loading ? LoadingComponent : ArrowDropDownIcon}
                inputRef={el => this.inputRef = el}
            >
                {!this.props.options.length ? (
                    <ListSubheader sx={{ textAlign: 'center' }}>Items Not Found</ListSubheader>
                ) : this.props.options.map((option, key) => <MenuItem key={key} value={option.value}>{option.label}</MenuItem>)}
            </Select>
        </FormControl>
    }
}