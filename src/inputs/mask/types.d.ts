import { TextFieldProps } from '@mui/material'
import { BaseInput } from '../../types'
import { LegacyTextFieldProps } from '../legacyTypes'

export type MaskInputValueType = string | null
export interface MaskInputProps extends BaseInput<MaskInputValueType>, LegacyTextFieldProps, Omit<TextFieldProps, 'defaultValue' | 'ref'> {
    type: 'mask'
    pattern: string
    /**
     * @default _
     */
    char?: string
    defaultValue?: MaskInputValueType
}
