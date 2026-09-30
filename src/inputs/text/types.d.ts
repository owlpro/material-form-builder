import { TextFieldProps } from "@mui/material";
import { BaseInput } from "../../types"
import { LegacyTextFieldProps } from '../legacyTypes';

export type TextInputValueType = string | null;
export interface TextInputProps extends BaseInput<TextInputValueType>, LegacyTextFieldProps, Omit<TextFieldProps, "defaultValue" | "ref"> {
	type: "text";
	autoDirection?: boolean;
	defaultValue?: TextInputValueType;
}
