import { TextFieldProps } from '@mui/material'
import { BaseInput } from '../../types/input.base'

export type TextInputValueType = string | null
export interface TextInputProps extends BaseInput<TextInputValueType>, Omit<TextFieldProps, 'defaultValue' | 'ref'> {
    type: 'text'
    defaultValue?: TextInputValueType
}
