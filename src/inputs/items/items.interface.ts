import { InputProps } from "../../types/input";
import { BaseInput } from "../../types/input.base";
import { ItemsInput } from "./items.input";


export interface ItemsInputProps extends BaseInput<ItemsInput> {
    type: "items",
    inputs: InputProps[],
    // required?: boolean
    // selector: string;
}