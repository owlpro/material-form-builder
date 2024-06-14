export interface InputActions<ValueType = any> {
    setValue: (data: ValueType) => Promise<ValueType>
    getValue: () => Promise<ValueType>
    clear: () => Promise<ValueType>
    click: () => Promise<any>
    focus: () => Promise<any>
    blur: () => Promise<any>
    copy?: () => Promise<any>
}

export interface BaseInput<ValueType = any> {
    selector: string
    required?: boolean
    /**
     * @default true
     */
    visible?: ((e: any) => boolean | undefined) | boolean
    wrapper?: (children: JSX.Element, actions: InputActions<ValueType>) => JSX.Element
    onChangeValue?: (value: ValueType) => void
    getMutator?: (value: ValueType) => ValueType
    setMutator?: (value: ValueType) => ValueType
    formatter?: (value: ValueType) => ValueType
    _call_parent_for_update?: () => Promise<boolean>,
    ref?: any
}
