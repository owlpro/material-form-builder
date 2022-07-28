import { InputProps } from "./input"
import { Value } from "./value.interface"

export type OutputValues = {
    data: ObjectLiteral,
    validation: {
        status: boolean,
        inputs: InputProps[]
    }
}