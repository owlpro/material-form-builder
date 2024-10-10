import { SwitchProps } from '@mui/material'
import { BaseInput } from '../../types'
export type SwitchInputValueType = boolean
export interface SwitchInputProps extends BaseInput<SwitchInputValueType>, Omit<SwitchProps, 'defaultChecked' | 'ref'> {
    type: 'switch'
    label?: string
    defaultChecked?: SwitchInputValueType
}
