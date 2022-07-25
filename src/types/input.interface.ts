import { ChangeEvent } from "react";

export interface IInput<ValueType> {
    setValue: (data: ValueType) => Promise<any>,
    getValue: () => ValueType,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}