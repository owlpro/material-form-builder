import { TextFieldProps } from '@mui/material'
import { BaseInput } from '../../types/input.base'

export type NumberInputValueType = number | null | undefined
export interface NumberInputProps extends BaseInput<NumberInputValueType>, Omit<TextFieldProps, 'defaultValue'> {
    type: 'number'
    defaultValue?: NumberInputValueType
}
