import { Box, Slide, Typography } from '@mui/material';
import React, { Component, Fragment } from "react";
import { InputImplement } from '../../types/input.implement';
import { OtpInputProps, OtpInputValueType } from './otp.types';

interface IState {
    value: OtpInputValueType,
    error: boolean,
    isInputFocused: boolean
}

export class OtpInput extends Component<OtpInputProps, IState> implements InputImplement<OtpInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false,
        isInputFocused: false
    }

    validationTimeout: NodeJS.Timeout | undefined;

    inputRef: HTMLInputElement | undefined | null

    shouldComponentUpdate(nextProps: OtpInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.state.isInputFocused !== nextState.isInputFocused:
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
        if (!this.state.value || this.state.value.length < (this.props.digits || 4) && this.props.required) {
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
        let value: OtpInputValueType = event.target.value.replace(/[^0-9]/g, '')
        if(this.props.formatter && typeof this.props.formatter === "function"){
            const formattedValue = this.props.formatter(value)
            if(formattedValue !== undefined){
                value = formattedValue;
            }
        }

        this.setValue(value || null)
    };

    private onClick = (event: React.MouseEvent<HTMLElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false, isInputFocused: true })
        this.inputRef?.focus()
    }

    private onBlur = () => {
        this.setState({ ...this.state, isInputFocused: false })
    }

    render() {
        const settings = {
            digits: this.props.digits || 4,
            borderWidth: this.props.borderWidth || 1,
            height: this.props.height || 55,
            width: this.props.width || 34.61,
            spaceBetween: this.props.spaceBetween || 8,
            borderRadius: this.props.borderRadius || 4,
            emptyColor: this.props.emptyColor || "#0000003b",
            focusColor: this.props.focusColor || "#1976d2",
            completeColor: this.props.completeColor || "#68b36b",
            fontWeight: this.props.fontWeight || 400,
            fontSize: this.props.fontSize || 23,
            color: this.props.color || '#323232'
        }

        const boxes: number[] = Array.from(Array(settings.digits).keys())
        const values = this.state.value?.split('') || [];

        return (<Fragment>
            <Box sx={{
                width: (settings.width * settings.digits) + ((settings.borderWidth * 2) * settings.digits) + (settings.spaceBetween * (settings.digits - 1)),
                display: 'inline-block',
                verticalAlign: "top",
                position: 'relative',

            }}>
                <Box onClick={this.onClick} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <input
                        style={{ position: 'absolute', zIndex: -1, opacity: 0 }}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        value={this.state.value || ""}
                        maxLength={settings.digits}
                        ref={el => this.inputRef = el}
                    />
                    {boxes.map((key) => {
                        const value = values[key] || "";

                        return (
                            <Box key={key} sx={{
                                height: settings.height,
                                width: settings.width,
                                transition: '0.2s border-color',
                                borderRadius: this.props.variant !== "outlined" ? 0 : settings.borderRadius + 'px',
                                borderStyle: 'solid',
                                borderWidth: settings.borderWidth + 'px',
                                borderRightWidth: this.props.variant !== "outlined" ? 0 : settings.borderWidth,
                                borderLeftWidth: this.props.variant !== "outlined" ? 0 : settings.borderWidth,
                                borderTopWidth: this.props.variant !== "outlined" ? 0 : settings.borderWidth,
                                borderColor:
                                    this.state.error && !value ? '#d32f2f' :
                                        this.state.isInputFocused && values.length === key
                                            ? settings.focusColor
                                            : (
                                                values.length === settings.digits
                                                    ? (this.state.isInputFocused && (settings.digits === key + 1)
                                                        ? settings.focusColor
                                                        : settings.completeColor)
                                                    : settings.emptyColor
                                            ),
                            }}>
                                <Slide in={value ? true : false} direction="down" appear={false}>
                                    <Typography sx={{
                                        height: '100%',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: settings.fontWeight,
                                        fontSize: settings.fontSize,
                                        color: settings.color
                                    }}>
                                        {value || "☓"}
                                    </Typography>
                                </Slide>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Fragment>)
    }
}