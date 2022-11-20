import { Box, InputAdornment, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React, { Component } from "react";
import { mask } from '../../helpers/general.helper';
import { InputImplement } from '../../types/input.implement';
import { countries, Country } from "./countries";
import { MobileInputProps, MobileInputValueType } from './mobile.types';

interface IState {
    value: MobileInputValueType,
    error: boolean,
    country: Country
}

const StylesImage = styled('img')({
    borderRadius: 4,
    height: 22,
    width: 28
});


export class MobileInput extends Component<MobileInputProps, IState> implements InputImplement<MobileInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false,
        country: countries[0],
    }

    validationTimeout: NodeJS.Timeout | undefined;

    inputRef: HTMLInputElement | undefined

    shouldComponentUpdate(nextProps: MobileInputProps, nextState: IState) {
        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case this.state.country.dialCode !== nextState.country.dialCode:
            case this.props.label !== nextProps.label:
                // case this.props.variant !== this.props.variant:
                return true;
            default: return false;
        }
    }

    async setValue(value: MobileInputValueType, internalSet: boolean = false): Promise<any> {
        if (value === this.state.value) return Promise.resolve()

        if (value && !internalSet) {
            const splits = value.split('-')
            if (splits.length > 1) {
                const dialCode = splits[0].replace(/[^0-9]/g, '');
                const country = countries.find(c => c.dialCode === dialCode)
                if (country) {
                    await this.setState({ ...this.state, country })
                }
                return this.normalizeValue(splits[1])
            } else {
                return this.normalizeValue(value)
            }
        }

        const setStatePromise = await this.setState({ ...this.state, value })

        if (typeof this.props.onChangeValue === "function") {
            await this.props.onChangeValue(value as MobileInputValueType)
        }
        if(typeof this.props.callParentForUpdate === "function") this.props.callParentForUpdate()
        return setStatePromise
    }

    getValue(): MobileInputValueType {
        if (!this.state.value) return null;
        const value = this.state.value.replace(/[^0-9]/g, '');
        return '+' + this.state.country.dialCode + '-' + value;
    }

    async clear(): Promise<any> {
        return await this.setValue(this.props.defaultValue || null, true)
    }

    validation(): boolean {
        const matchValue = this.state.value?.match(/.*[0-9]/)
        const isValid = matchValue && (matchValue[0].length === this.state.country.mask.length)
        if (!isValid && this.props.required) {
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
        this.normalizeValue(event.target.value)
    };

    private onClick = (event: React.MouseEvent<HTMLElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
        this.normalizeValue(this.state.value)
    }

    private normalizeValue = async (value: MobileInputValueType) => {
        if (!value) return this.setValue(null, true);

        value = value.replace(/^0/, '')
        const pattern = this.state.country.mask;
        const pureValue = value.replace(/[^0-9]/g, '')
        const maskedValues = mask(pureValue, pattern, '_')
        await this.setValue(pureValue ? maskedValues : null, true)
        const valueForLength = maskedValues.match(/.*[0-9]/)
        if (this.inputRef && valueForLength) {
            this.inputRef.selectionStart = this.inputRef.selectionEnd = valueForLength[0].length
        }
    }

    private onChangeCountry = async (event: SelectChangeEvent) => {
        const dialCode = event.target.value as string;
        const country = countries.find(c => c.dialCode === dialCode)
        if (country) {
            await this.setState({ ...this.state, country })
        }

        if (this.state.value && country) {
            this.normalizeValue(this.state.value)
        }

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
        const { onChangeValue, visible, ...restProps } = this.props;
        const isOutlined = this.props.variant === "outlined";
        let inputWidth = 207;
        switch (this.props.variant) {
            case "outlined": inputWidth = 235; break;
            case "filled": inputWidth = 231; break;
            default: break;
        }
        return (
            <Box sx={{
                display: 'inline-flex',
                alignItems: 'flex-end',
                width: this.props.fullWidth ? '100%' : inputWidth,
                position: 'relative'
            }}>
                <Select
                    value={this.state.country.dialCode}
                    onChange={this.onChangeCountry}
                    variant="standard"
                    margin='none'
                    sx={{
                        width: '65px',
                        position: 'absolute',
                        zIndex: 2,
                        left: (isOutlined ? '8px' : 0),
                        top: (isOutlined ? '5px' : '18px'),
                        bottom: 2
                    }}
                    renderValue={(value) => {
                        return <Typography paddingLeft={'8px'}>
                            +{value}
                        </Typography>;
                    }}
                    disableUnderline={true}
                >
                    {countries.map((country, index) => {
                        return (
                            <MenuItem key={index} value={country.dialCode} sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                minWidth: '100px',
                                paddingRight: '8px',
                                paddingLeft: '8px'
                            }}>
                                <Typography display={'inline'}>
                                    +{country.dialCode}
                                </Typography>
                                <StylesImage src={country.flag} />
                            </MenuItem>
                        )
                    })}
                </Select>
                <TextField {...restProps}
                    variant={this.props.variant || "standard"}
                    error={this.state.error}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    value={this.state.value || ''}
                    inputRef={el => this.inputRef = el}
                    InputProps={{
                        sx: { width: this.props.fullWidth ? '100%' : inputWidth },
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Box ml={'56px'}></Box>
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
        )
    }
}