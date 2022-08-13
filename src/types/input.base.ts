export interface BaseInput<ValueType = any> {
    selector: string
    required?: boolean
    wrapper?: (children: JSX.Element) => JSX.Element
    onChangeValue?: (value: ValueType) => void
    getMutator?: (value: any) => any
    setMutator?: (value: any) => any
    formatter?: (value: ValueType) => ValueType
}
