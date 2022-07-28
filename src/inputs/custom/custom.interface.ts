import { BaseInput } from '../../types/input.base'

export type CustomInputValueType = any;
export interface CustomInputProps extends Omit<BaseInput, 'onChangeValue'> {
    type: 'custom'
    element: React.ElementType
    [key: string]: any
}
