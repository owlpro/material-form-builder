

export type { FormBuilder } from './formBuilder';

export type ObjectLiteral = { [key: string]: any }
export type Variant = 'standard' | 'filled' | 'outlined'

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
    getMutator?: (value: any) => any
    setMutator?: (value: any) => any
    formatter?: (value: any) => any
    _call_parent_for_update?: () => Promise<boolean>
    ref?: any
}

export interface InputImplement<ValueType> {
    setValue: (data: ValueType, withoutEffect?: boolean) => Promise<ValueType>
    getValue: () => ValueType
    clear: () => Promise<ValueType>
    validation?: () => boolean
    click?: () => void
    focus?: () => void
    blur?: () => void
}

export type InputGetValueTypes = ReturnType<Input['getValue']>

export type OutputValues<T = ObjectLiteral> = {
    data: T
    validation: {
        status: boolean
        inputs: Array<any>
    }
}

export type BuilderValue<T = any> = OutputValues<T> | undefined
export type WrapperElement = JSX.Element
export type WrapperActions<T = any> = InputActions<T>
