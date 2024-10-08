import { TextFieldProps } from '@mui/material'
import { BaseInput } from '../../types'

export type PasswordInputValueType = string | null
export interface PasswordInputProps extends BaseInput<PasswordInputValueType>, Omit<TextFieldProps, 'defaultValue' | 'ref'> {
    type: 'password'
    defaultValue?: PasswordInputValueType
}
