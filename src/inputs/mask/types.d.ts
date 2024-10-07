import { TextFieldProps } from '@mui/material/TextField'
import { BaseInput } from '../../types'

export type MaskInputValueType = string | null
export interface MaskInputProps extends BaseInput<MaskInputValueType>, Omit<TextFieldProps, 'defaultValue' | 'ref'> {
    type: 'mask'
    pattern: string
    /**
     * @default _
     */
    char?: string
    defaultValue?: MaskInputValueType
}
