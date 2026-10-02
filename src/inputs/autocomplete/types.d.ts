import { TextFieldProps } from '@mui/material'
import { AutocompleteProps } from '@mui/material'
import { BaseInput, Variant } from '../../types'
import { LegacyTextFieldProps } from '../legacyTypes'

export type AutocompleteOptionType = {
    label: string
    value: string
}
export type AutocompleteFragType = string | number
export type AutocompleteValueType = AutocompleteOptionType[] | AutocompleteOptionType | undefined
export type AutocompleteInputValueType = AutocompleteFragType | AutocompleteFragType[] | null

export interface AutocompleteInputProps
    extends BaseInput<AutocompleteInputValueType>,
        Omit<AutocompleteProps<any, boolean, boolean, boolean, 'div'>, 'renderInput' | 'defaultValue' | 'ref'> {
    type: 'autocomplete'
    disableClearOnChangeOptions?: boolean
    variant?: Variant
    label?: string
    renderInput?: (params: TextFieldProps) => React.ReactNode
    InputProps?: TextFieldProps & LegacyTextFieldProps
    defaultValue?: AutocompleteInputValueType
    loading?: boolean
}
