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
    renderHeader?: (addItem: () => any, removeAll: () => any) => ReactNode

    renderRemoveButton?: (action: () => any) => ReactNode
    renderCopyButton?: (action: () => any) => ReactNode
    /**
     * `false` = hidden
     */
    removeIcon?: ReactNode | boolean
    /**
     * `false` = hidden
     */
    copyIcon?: ReactNode | boolean
    minItems?: number
    defaultItems?: number
    maxItems?: number
}
