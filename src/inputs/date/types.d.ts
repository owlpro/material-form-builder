import { TextFieldProps } from '@mui/material'
import { DatePickerProps, MuiPickersAdapter } from '@mui/x-date-pickers'
// import { MuiPickersAdapter } from '@mui/x-date-pickers/internals'
import { Variant } from '@/types/helpers'
import { BaseInput } from '@/types'
import { Dayjs } from 'dayjs'

export type DateInputValueType = Dayjs | null
export interface DateInputProps extends BaseInput<DateInputValueType>, Omit<DatePickerProps<Dayjs, false>, 'onChange' | 'value' | 'renderInput' | 'ref'> {
    type: 'date'
    dateAdapter?: new (...args: any) => MuiPickersAdapter<Dayjs>
    variant?: Variant
    defaultValue?: DateInputValueType
    fullWidth?: boolean
    inputProps?: TextFieldProps
    onChange?: (value: any, keyboardInputValue?: string) => void
}
