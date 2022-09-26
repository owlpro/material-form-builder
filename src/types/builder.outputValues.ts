import { ObjectLiteral } from './helper.types'
import { InputProps } from './input'

export type OutputValues = {
    data: ObjectLiteral
    validation: {
        status: boolean
        inputs: InputProps[]
    }
}