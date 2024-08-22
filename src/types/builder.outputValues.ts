import { ObjectLiteral } from './helper.types'
import { InputProps } from './input'

export type OutputValues<T = ObjectLiteral> = {
    data: T
    validation: {
        status: boolean
        inputs: InputProps[]
    }
}