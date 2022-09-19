import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { Component } from "react";
import { randomString } from '../../helpers/general.helper';
import { InputImplement } from '../../types/input.implement';
import { FileInputProps, FileInputValueType } from './file.types';
import ReactDOM from 'react-dom';

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
                return true;
            default: return false;
        }
    }

    async setValue(value: FileInputValueType): Promise<any> {
        if (value === this.state.value) return Promise.resolve()
        const inputKey = !value ? randomString(20) : this.state.inputKey;
        const setStatePromise = await this.setState({ ...this.state, value, inputKey })

        if (this.inputRef && value) {
            this.inputRef.files = value
        }

        if (typeof this.props.onChangeValue === "function") {
            this.props.onChangeValue(value as FileInputValueType)
        }

        return setStatePromise
    }

    getValue(): FileInputValueType {
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

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: FileInputValueType = event.target.files;
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
        const { onChangeValue, label, helperText, FormControlProps, InputLabelProps, FormHelperTextProps, InputProps, multiple, ...restProps } = this.props;
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