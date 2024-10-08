import { TextFieldProps } from '@mui/material'
import { BaseInput } from '../../types/input.base'

export type MobileInputValueType = string | null
export interface MobileInputProps extends BaseInput<MobileInputValueType>, Omit<TextFieldProps, 'defaultValue' | 'ref'> {
    type: 'mobile'
    defaultValue?: MobileInputValueType
}
