import { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup'
import { ReactNode } from 'react'
import { BaseInput } from '../../types'

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
