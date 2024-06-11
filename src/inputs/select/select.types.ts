import { SelectProps, TextFieldProps } from '@mui/material'
import { BaseInput } from '../../types/input.base'

export type SelectInputValueType = any;
export type SelectOptionType = {
    label: string | JSX.Element,
    value: any
}
export interface SelectInputProps extends BaseInput<SelectInputValueType>, Omit<SelectProps, 'defaultValue' | 'ref'> {
    type: 'select',
    options: SelectOptionType[],
    defaultValue?: SelectInputValueType,
    listSubheaderText?: string
    loading?: boolean,
    ref?: Function
}
