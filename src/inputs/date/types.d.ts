import { TextFieldProps } from '@mui/material/TextField'
import { DatePickerProps} from '@mui/x-date-pickers/DatePicker'
import { MuiPickersAdapter } from '@mui/x-date-pickers'
import { BaseInput, Variant } from '../../types'
import { Dayjs } from 'dayjs'

export type DateInputValueType = Dayjs | null
export interface DateInputProps extends BaseInput<DateInputValueType>, Omit<DatePickerProps<Dayjs, false>,  'value' | 'renderInput' | 'ref'> {
    type: 'date'
    dateAdapter?: new (...args: any) => MuiPickersAdapter<Dayjs>
    variant?: Variant
    defaultValue?: DateInputValueType
    fullWidth?: boolean
    InputProps?: TextFieldProps
    // onChange?: (value: any, keyboardInputValue?: string) => void
}
