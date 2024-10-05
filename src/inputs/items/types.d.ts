import { BaseInput, InputProps } from '@/types'

export type ItemsInputValueType = any
export interface ItemsInputProps extends Omit<BaseInput<ItemsInputValueType>, 'onChangeValue'> {
    type: 'items'
    inputs: InputProps[]
    itemWrapper?: (children: JSX.Element) => JSX.Element
    renderHeader?: (addItem: Function, removeAll: Function) => JSX.Element
    removeIcon?: JSX.Element | React.ReactNode | boolean
    copyIcon?: JSX.Element | React.ReactNode | boolean
    minItems?: number
    maxItems?: number
}
