import { CheckboxProps } from '@mui/material'
import { BaseInput } from '../../types/input.base'
export type CheckboxInputValueType = boolean;
export interface CheckboxInputProps extends BaseInput<CheckboxInputValueType>, Omit<CheckboxProps, 'defaultChecked' | 'ref'> {
    type: 'checkbox',
    label?: string,
    defaultChecked?: CheckboxInputValueType,
    ref?: Function
}
