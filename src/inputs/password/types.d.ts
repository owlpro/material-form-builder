import { TextFieldProps } from '@mui/material'
import { BaseInput } from '../../types'
import { LegacyTextFieldProps } from '../legacyTypes'

export type PasswordInputValueType = string | null
export interface PasswordInputProps extends BaseInput<PasswordInputValueType>, LegacyTextFieldProps, Omit<TextFieldProps, 'defaultValue' | 'ref'> {
    type: 'password'
    defaultValue?: PasswordInputValueType
}
