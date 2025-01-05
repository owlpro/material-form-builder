import { ReactNode } from 'react'
import { ObjectLiteral } from '../../types/helper.types'
import { InputProps } from '../../types/input'
import { BaseInput } from '../../types/input.base'

export type ItemsInputValueType = any
export interface ItemsInputProps extends Omit<BaseInput<ItemsInputValueType>, 'onChangeValue'> {
    type: 'items'
    inputs: InputProps[]
    /**
     * @example itemWrapper: (el, key) => <Box key={key}>{el}</Box>,
     */
    itemWrapper?: (children: ReactNode, key: string) => ReactNode
    renderHeader?: (addItem: Function, removeAll: Function) => ReactNode
    removeIcon?: ReactNode | boolean
    copyIcon?: ReactNode | boolean
    minItems?: number
    maxItems?: number
}
