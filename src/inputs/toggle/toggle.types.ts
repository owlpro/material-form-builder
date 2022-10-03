import { ToggleButtonGroupProps } from '@mui/material'
import { BaseInput } from '../../types/input.base'

export type ToggleInputValueType = string | string[] | null
export type ToggleInputOptionType = {
    label: string
    value: any
}

export interface ToggleInputProps extends BaseInput<ToggleInputValueType>, Omit<ToggleButtonGroupProps, 'defaultValue'> {
    type: 'toggle'
    options: ToggleInputOptionType[]
    defaultValue?: ToggleInputValueType
    exclusive?: boolean
    label?: string
}
