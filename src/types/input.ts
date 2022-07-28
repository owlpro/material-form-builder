import { ItemsInput } from "../inputs/items/items.input";
import { ItemsInputProps } from "../inputs/items/items.interface";
import { NumberInput } from "../inputs/number/number.input";
import { NumberInputProps } from "../inputs/number/number.interface";
import { TextInput } from "../inputs/text/text.input";
import { TextInputProps } from "../inputs/text/text.interface";

export type InputProps = TextInputProps | NumberInputProps | ItemsInputProps
export type Input = TextInput | NumberInput | ItemsInput
export type InputGetValueTypes = ReturnType<Input['getValue']>
export type InputTypes = InputProps['type']