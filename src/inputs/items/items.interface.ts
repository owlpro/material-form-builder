import { ObjectLiteral } from "../../types/helper.types";
import { InputProps } from "../../types/input";
import { BaseInput } from "../../types/input.base";

export type ItemsInputValueType = ObjectLiteral[] | null;
export interface ItemsInputProps extends Omit<BaseInput, 'onChangeValue'> {
    type: "items",
    inputs: InputProps[],
}