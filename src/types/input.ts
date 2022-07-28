import { CheckboxInput } from "../inputs/checkbox/checkbox.input";
import { CheckboxInputProps } from "../inputs/checkbox/checkbox.interface";
import { CustomInput } from "../inputs/custom/custom.input";
import { CustomInputProps } from "../inputs/custom/custom.interface";
import { ItemsInput } from "../inputs/items/items.input";
import { ItemsInputProps } from "../inputs/items/items.interface";
import { NumberInput } from "../inputs/number/number.input";
import { NumberInputProps } from "../inputs/number/number.interface";
import { TextInput } from "../inputs/text/text.input";
import { TextInputProps, TextInputValueType } from "../inputs/text/text.types";

export type InputProps = TextInputProps | NumberInputProps | ItemsInputProps | CustomInputProps | CheckboxInputProps
export type Input = TextInput | NumberInput | ItemsInput | CustomInput | CheckboxInput


export type InputGetValueTypes = ReturnType<Input['getValue']>
export type InputTypes = InputProps['type']