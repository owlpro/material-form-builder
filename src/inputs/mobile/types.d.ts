import { TextFieldProps } from '@mui/material'
import { BaseInput } from '../../types'
import { LegacyTextFieldProps } from '../legacyTypes'

export type MobileInputValueType = string | null
export interface MobileInputProps extends BaseInput<MobileInputValueType>, LegacyTextFieldProps, Omit<TextFieldProps, 'defaultValue' | 'ref'> {
    type: 'mobile'
    defaultValue?: MobileInputValueType
}
