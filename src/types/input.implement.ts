export interface InputImplement<ValueType> {
    setValue: (data: ValueType, withoutEffect?: boolean) => Promise<any>
    getValue: () => ValueType
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | any, value?: any) => void
    clear: () => Promise<any>
    validation: () => boolean
    click?: () => void
    focus?: () => void
    blur?: () => void
}
