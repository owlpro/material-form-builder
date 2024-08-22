import { ToggleButtonGroupProps } from '@mui/material'
import { BaseInput } from '../../types/input.base'
import { ReactNode } from 'react'

export type ToggleInputValueType = string | string[] | null
export type ToggleInputOptionType = {
    label: string | ReactNode
    value: any
}

export interface ToggleInputProps extends BaseInput<ToggleInputValueType>, Omit<ToggleButtonGroupProps, 'defaultValue' | 'ref'> {
    type: 'toggle'
    options: ToggleInputOptionType[]
    defaultValue?: ToggleInputValueType
    exclusive?: boolean
    label?: string
    enforceValueSet?: boolean
}
