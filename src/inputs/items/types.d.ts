import { BaseInput, InputProps } from '../../types'

export type ItemsInputValueType = any

interface ItemsInputBaseProps extends Omit<BaseInput<ItemsInputValueType>, 'onChangeValue'> {
    type: 'items'
    inputs: InputProps[]
    renderHeader?: (addItem: Function, removeAll: Function) => JSX.Element
    removeIcon?: JSX.Element | React.ReactNode | boolean
    copyIcon?: JSX.Element | React.ReactNode | boolean
    minItems?: number
    maxItems?: number
}

interface ItemsInputPropsCustomWrapper extends ItemsInputBaseProps {
    disableDefaultItemWrapper: true
    itemWrapper: (children: JSX.Element, actions: { copyItem: () => void; removeItem: () => void }) => JSX.Element
}

interface ItemsInputPropsDefaultWrapper extends ItemsInputBaseProps {
    disableDefaultItemWrapper?: false
    itemWrapper?: (children: JSX.Element, actions: { copyItem: () => void; removeItem: () => void }) => JSX.Element
}

export type ItemsInputProps =
    | ItemsInputPropsCustomWrapper
    | ItemsInputPropsDefaultWrapper
