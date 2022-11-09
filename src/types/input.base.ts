export interface InputActions {
    setValue: (data: any) => void
    getValue: () => any
    clear: () => void
    click: () => void
    focus: () => void
    blur: () => void
    copy?: () => void
}

export interface BaseInput<ValueType = any> {
    selector: string
    required?: boolean
    /**
     * @default true
     */
    visible?: ((e: any) => boolean | undefined) | boolean
    wrapper?: (children: JSX.Element, actions: InputActions) => JSX.Element
    onChangeValue?: (value: ValueType) => void
    getMutator?: (value: any) => any
    setMutator?: (value: any) => any
    formatter?: (value: ValueType) => ValueType
}
