import { CheckboxProps } from '@mui/material/Checkbox'
import { BaseInput } from '../../types'
export type CheckboxInputValueType = boolean
export interface CheckboxInputProps extends BaseInput<CheckboxInputValueType>, Omit<CheckboxProps, 'defaultChecked' | 'ref'> {
    type: 'checkbox'
    label?: string
    defaultChecked?: CheckboxInputValueType
}
