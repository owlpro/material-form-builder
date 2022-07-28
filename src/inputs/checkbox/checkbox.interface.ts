import { CheckboxProps } from '@mui/material'
import { BaseInput } from '../../types/input.base'
export type CheckboxInputValueType = boolean;
export interface CheckboxInputProps extends BaseInput<CheckboxInputValueType>, Omit<CheckboxProps, 'defaultChecked'> {
    type: 'checkbox',
    label?: string,
    defaultChecked?: CheckboxInputValueType
}
