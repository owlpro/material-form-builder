export interface InputImplement<ValueType> {
    setValue: (data: ValueType) => Promise<any>
    getValue: () => ValueType
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | any, value?: any) => void
    clear: () => Promise<any>
    validation: () => boolean
    click?: () => void
    focus?: () => void
    blur?: () => void
}
