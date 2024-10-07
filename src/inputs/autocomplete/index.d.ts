import { TextFieldProps } from '@mui/material/TextField'
import { AutocompleteProps } from '@mui/material/Autocomplete'
import { BaseInput, Variant } from '../../types'

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
    disableClearOnChangeOptions?: boolean
    variant?: Variant
    label?: string
    renderInput?: (params: TextFieldProps) => React.ReactNode
    InputProps?: TextFieldProps
    defaultValue?: AutocompleteInputValueType
    loading?: boolean
}
