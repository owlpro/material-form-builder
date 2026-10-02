import type { ReactNode } from 'react'
import { SelectProps } from '@mui/material'
import { BaseInput } from '../../types'

export type SelectInputValueType = any
export type SelectOptionType = {
    label: ReactNode
    value: any
}
export interface SelectInputProps extends BaseInput<SelectInputValueType>, Omit<SelectProps, 'defaultValue' | 'ref'> {
    type: 'select'
    options: SelectOptionType[]
    defaultValue?: SelectInputValueType
    listSubheaderText?: string
    loading?: boolean
}
