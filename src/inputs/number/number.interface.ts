import { TextFieldProps } from "@mui/material";
import { BaseInput } from "../../types/input.base";
import { NumberInput } from "./number.input";


export interface NumberInputProps extends BaseInput<NumberInput>, Omit<TextFieldProps, '*'> {
    type: "number",
}