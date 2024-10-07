import { FormControlProps } from '@mui/material/FormControl'
import { FormHelperTextProps } from '@mui/material/FormHelperText'
import { InputProps as MuiInputProps } from '@mui/material/Input'
import { InputLabelProps } from '@mui/material/InputLabel'
import { BaseInput, Variant } from '../../types'

export type FileInputValueType = FileList | null
export interface FileInputProps extends BaseInput<FileInputValueType>, Omit<MuiInputProps, 'ref'> {
    type: 'file'
    label?: string
    defaultValue?: FileInputValueType
    variant?: Variant
    helperText?: string
    FormControlProps?: FormControlProps
    InputLabelProps?: InputLabelProps
    FormHelperTextProps?: FormHelperTextProps
    multiple?: boolean
}
