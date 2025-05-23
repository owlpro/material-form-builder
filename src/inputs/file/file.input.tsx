import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import React, { Component } from "react";
import { randomString, stringify } from '../../helpers/general.helper';
import { InputImplement } from '../../types/input.implement';
import { FileInputProps, FileInputValueType } from './file.types';

interface IState {
    value: FileInputValueType,
    error: boolean,
    inputKey: string
}

export class FileInput extends Component<FileInputProps, IState> implements InputImplement<FileInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false,
        inputKey: randomString(20)
    }

    validationTimeout: NodeJS.Timeout | undefined;
    inputIdentity: string = ''
    textHelperIdentity: string = ''
    inputRef: HTMLInputElement | undefined

    constructor(props: FileInputProps) {
        super(props)
        this.inputIdentity = randomString(20)
        this.textHelperIdentity = randomString(20);
    }

    shouldComponentUpdate(nextProps: FileInputProps, nextState: IState) {
        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.props.label !== nextProps.label:
            case this.props.disabled !== nextProps.disabled:
            case stringify(nextProps?.updateListener ?? {}) !== stringify(this.props?.updateListener ?? {}):
                return true;
            default: return false;
        }
    }

    setValue(value: FileInputValueType): Promise<any> {
        if (value === this.state.value) return Promise.resolve(value)

        return new Promise((resolve) => {
            const inputKey = !value ? randomString(20) : this.state.inputKey;
            this.setState({ ...this.state, value, inputKey }, () => {
                if (this.inputRef && value) {
                    this.inputRef.files = value
                }
                this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as FileInputValueType)
                resolve(value)
            })
        })
    }

    getValue(): FileInputValueType {
        return this.state.value || null;
    }

    clear(): Promise<FileInputValueType> {
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

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: FileInputValueType = event.target.files;
        this.setValue(value || null)
        this.props.onChange?.(event)
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

    render() {
        const { defaultValue, onChangeValue, label, helperText, FormControlProps, InputLabelProps, FormHelperTextProps, InputProps, multiple, visible, _call_parent_for_update,updateListener, ...restProps } = this.props;
        return (
            <FormControl {...FormControlProps} variant={FormControlProps?.variant ?? 'standard'} >

                {this.props.label ? (
                    <InputLabel {...InputLabelProps} shrink={InputLabelProps?.shrink ?? true} htmlFor={this.inputIdentity}>{this.props.label}</InputLabel>
                ) : null}
                <Input
                    {...restProps}
                    id={this.inputIdentity}
                    // key={this.state.inputKey}
                    aria-describedby={this.textHelperIdentity}
                    type="file"
                    inputProps={{
                        multiple: multiple || false,
                        ...InputProps,
                        key: this.state.inputKey
                    }}
                    error={this.state.error}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    // value={this.state.value?.length ? this.state.value[0].name : ''}
                    inputRef={el => this.inputRef = el}
                />
                {helperText ? (
                    <FormHelperText {...FormHelperTextProps} id={this.textHelperIdentity} >
                        {helperText}
                    </FormHelperText>
                ) : null}
            </FormControl>
        )
    }
}