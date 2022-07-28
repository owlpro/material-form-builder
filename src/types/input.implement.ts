
export interface InputImplement<ValueType> {
    setValue: (data: ValueType) => Promise<any>,
    getValue: () => ValueType,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    clear: () => Promise<any>,
    validation: () => boolean
}