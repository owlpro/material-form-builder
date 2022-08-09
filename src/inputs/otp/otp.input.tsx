import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { Component, Fragment } from "react";
import { InputImplement } from '../../types/input.implement';
import { OtpInputProps, OtpInputValueType } from './otp.types';

interface IState {
    value: OtpInputValueType,
    error: boolean
}

export class OtpInput extends Component<OtpInputProps, IState> implements InputImplement<OtpInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    shouldComponentUpdate(nextProps: OtpInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
                return true;
            default: return false;
        }
    }

    async setValue(value: OtpInputValueType): Promise<any> {
        if (value === this.state.value) return Promise.resolve()

        const setStatePromise = await this.setState({ ...this.state, value })
        if (typeof this.props.onChangeValue === "function") {
            this.props.onChangeValue(value as OtpInputValueType)
        }
        return setStatePromise
    }

    getValue(): OtpInputValueType {
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
        // this.setValue(event.target.value || null)
        this.setValue(1234 || null)
    };

    private onClick = (event: React.MouseEvent<HTMLElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
    }

    render() {
        const { onChangeValue, ...restProps } = this.props;
        return (<Fragment>
            <Box display='inline-block'>
                input contents contents
            </Box>
        </Fragment>)
    }
}