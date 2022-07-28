import { TextFieldProps } from "@mui/material";
import { BaseInput } from "../../types/input.base";
import { TextInput } from "./text.input";


export interface TextInputProps extends BaseInput<TextInput>, Omit<TextFieldProps, '*'> {
    type: "text",
    // selector: string;
}