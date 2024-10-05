import { TextFieldProps } from '@mui/material'
import { BaseInput } from '@/types'

export type NumberInputValueType = number | null
export interface NumberInputProps extends BaseInput<NumberInputValueType>, Omit<TextFieldProps, 'defaultValue' | 'ref'> {
    type: 'number'
    defaultValue?: NumberInputValueType
}
