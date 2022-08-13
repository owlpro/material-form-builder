import { SelectProps, TextFieldProps } from '@mui/material'
import { BaseInput } from '../../types/input.base'

export type SelectInputValueType = any;
export type SelectOptionType = {
    label: string | JSX.Element,
    value: any
}
export interface SelectInputProps extends BaseInput<SelectInputValueType>, Omit<SelectProps, 'defaultValue'> {
    type: 'select',
    loading?: boolean,
    options: SelectOptionType[],
    defaultValue?: SelectInputValueType
}
