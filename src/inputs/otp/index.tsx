import { Box, Slide, Typography } from "@mui/material";
import React, { Component, FocusEvent, Fragment } from "react";
import { stringify } from "src/helpers/general";
import { InputImplement } from '../../types';
import { OtpInputProps, OtpInputValueType } from './types';

interface IState {
    value: OtpInputValueType,
    value_when_focus: OtpInputValueType,
    error: boolean,
    isInputFocused: boolean
}

export class OtpInput extends Component<OtpInputProps, IState> implements InputImplement<OtpInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        value_when_focus: this.props.defaultValue || null,
        error: false,
        isInputFocused: false
    }

    validationTimeout: any;

    inputRef: HTMLInputElement | undefined | null

    shouldComponentUpdate(nextProps: OtpInputProps, nextState: IState) {

        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.state.isInputFocused !== nextState.isInputFocused:
            case stringify(nextProps?.updateListener ?? {}) !== stringify(this.props?.updateListener ?? {}):
                return true;
            default: return false;
        }
    }

    async setValue(value: OtpInputValueType, withoutEffect?: boolean): Promise<OtpInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)

        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                if (!withoutEffect) this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as OtpInputValueType)
                resolve(value)
            })
        })
    }

    getValue(): OtpInputValueType {
        return this.state.value || null;
    }

    clear(): Promise<OtpInputValueType> {
        return this.setValue(this.props.defaultValue || null)
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
        if (this.props.formatter && typeof this.props.formatter === "function") {
            const formattedValue = this.props.formatter(value)
            if (formattedValue !== undefined) {
                value = formattedValue;
            }
        }

        this.setValue(value || null, true).then(() => {
            this.props.onChange?.(event)
        })
    };

    private onClick = (event: React.MouseEvent<HTMLInputElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false, isInputFocused: true }, () => {
            this.inputRef?.focus()
            this.props.onClick?.(event)
        })
    }

    private onBlur = (e: FocusEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, isInputFocused: false })

        const value: OtpInputValueType = e.target.value || null
        if (value !== this.state.value_when_focus) {
            this.props._call_parent_for_update?.()
        }

        this.props.onBlur?.(e)
    }

    private onFocus = (e: FocusEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, isInputFocused: true }, () => {
            const value_when_focus: OtpInputValueType = e.target.value || null
            if (this.state.value_when_focus !== value_when_focus) this.setState({ ...this.state, value_when_focus })
            this.props.onFocus?.(e)
        })

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
                        autoFocus={this.props.autoFocus}
                        style={{ position: 'absolute', zIndex: -1, opacity: 0 }}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        value={this.state.value || ""}
                        maxLength={settings.digits}
                        inputMode='numeric'
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