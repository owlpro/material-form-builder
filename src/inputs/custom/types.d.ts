import { BaseInput } from '../../types'

export type CustomInputValueType = any
export interface CustomInputProps extends Omit<BaseInput, 'onChangeValue' | 'ref'> {
    type: 'custom'
    element: React.ElementType
    allowObject?: boolean,
    [key: string]: any
}
