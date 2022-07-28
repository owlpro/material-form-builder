import { InputProps } from "./input"
import { Value } from "./value.interface"

export type OutputValues = {
    data: Value,
    validation: {
        status: boolean,
        inputs: InputProps[]
    }
}