import { AutocompleteProps, TextFieldProps } from '@mui/material'
import { Variant } from '../../types/helper.types'
import { BaseInput } from '../../types/input.base'

export type AutocompleteOptionType = {
    label: string
    value: string
}
export type AutocompleteFragType = string | number
export type AutocompleteValueType = AutocompleteOptionType[] | AutocompleteOptionType | undefined
export type AutocompleteInputValueType = AutocompleteFragType | AutocompleteFragType[] | null

export interface AutocompleteInputProps
    extends BaseInput<AutocompleteInputValueType>,
        Omit<AutocompleteProps<any, boolean, true, boolean, 'div'>, 'renderInput' | 'defaultValue' | 'ref'> {
    type: 'autocomplete'
    variant?: Variant
    label?: string
    renderInput?: (params: TextFieldProps) => React.ReactNode
    InputProps?: TextFieldProps
    defaultValue?: AutocompleteInputValueType
    loading?: boolean
    ref?: Function
}
