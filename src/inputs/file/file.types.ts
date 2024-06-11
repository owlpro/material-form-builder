import { FormControlProps, FormHelperTextProps, InputBaseComponentProps, InputBaseProps, InputLabelProps, InputProps } from '@mui/material'
import { Variant } from '../../types/helper.types'
import { BaseInput } from '../../types/input.base'

export type FileInputValueType = FileList | null
export interface FileInputProps extends BaseInput<FileInputValueType>, Omit<InputProps, 'ref'> {
    type: 'file'
    label?: string
    defaultValue?: FileInputValueType
    variant?: Variant
    helperText?: string
    FormControlProps?: FormControlProps
    InputLabelProps?: InputLabelProps
    FormHelperTextProps?: FormHelperTextProps
    multiple?: boolean
    InputProps?: InputBaseComponentProps,
    ref?: Function
}
