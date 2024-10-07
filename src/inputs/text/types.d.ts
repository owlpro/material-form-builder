import { TextFieldProps } from '@mui/material/TextField'
import { BaseInput } from '../../types'

export type TextInputValueType = string | null
export interface TextInputProps extends BaseInput<TextInputValueType>, Omit<TextFieldProps, 'defaultValue' | 'ref'> {
    type: 'text'
    defaultValue?: TextInputValueType
}
