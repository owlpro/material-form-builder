import { FilledInputProps, FormHelperTextProps, InputBaseComponentProps, InputLabelProps, InputProps, OutlinedInputProps, SelectProps } from '@mui/material'

/**
 * TextField props that MUI v9 removed. The inputs still accept them and move them into `slotProps`.
 */
export interface LegacyTextFieldProps {
    /** @deprecated use `slotProps.input` */
    InputProps?: Partial<InputProps> | Partial<FilledInputProps> | Partial<OutlinedInputProps>
    /** @deprecated use `slotProps.htmlInput` */
    inputProps?: InputBaseComponentProps
    /** @deprecated use `slotProps.inputLabel` */
    InputLabelProps?: Partial<InputLabelProps>
    /** @deprecated use `slotProps.select` */
    SelectProps?: Partial<SelectProps>
    /** @deprecated use `slotProps.formHelperText` */
    FormHelperTextProps?: Partial<FormHelperTextProps>
}
