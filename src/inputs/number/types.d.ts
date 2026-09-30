import { TextFieldProps } from '@mui/material'
import { BaseInput } from '../../types'
import { LegacyTextFieldProps } from '../legacyTypes'

export type NumberInputValueType = number | null
export interface NumberInputProps extends BaseInput<NumberInputValueType>, LegacyTextFieldProps, Omit<TextFieldProps, 'defaultValue' | 'ref'> {
    type: 'number'
    defaultValue?: NumberInputValueType
}
