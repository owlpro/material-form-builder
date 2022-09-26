import { AutocompleteProps, AutocompleteRenderInputParams, ChipTypeMap, TextFieldProps } from '@mui/material'
import { Variant } from '../../types/helper.types'
import { BaseInput } from '../../types/input.base'
import { TextInputProps } from '../text/text.types'

export type AutocompleteOptionType = {
    label: string
    value: string
} | string
export type AutocompleteValueType = AutocompleteOptionType[] | undefined | null

export interface AutocompleteInputProps
    extends BaseInput<AutocompleteOptionType[]>,
        Omit<AutocompleteProps<AutocompleteOptionType, true, false, true, 'div'>, 'renderInput'> {
    type: 'autocomplete',
    variant?: Variant,
    // options: AutocompleteOptionType[]
    label?: string
    // defaultValue?: AutocompleteOptionType[]
    renderInput?: (params: TextInputProps) => React.ReactNode
    InputProps?: TextInputProps
}
