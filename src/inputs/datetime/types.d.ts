import { TextFieldProps } from '@mui/material/TextField'
import { DateTimePickerProps, MuiPickersAdapter } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { BaseInput, Variant } from '../../types'

export type DatetimeInputValueType = Dayjs | null
export interface DatetimeInputProps extends BaseInput<DatetimeInputValueType>, Omit<DateTimePickerProps<Dayjs, false>, 'value' | 'renderInput' | 'ref'> {
    type: 'datetime'
    dateAdapter?: new (...args: any) => MuiPickersAdapter<Dayjs>
    variant?: Variant
    defaultValue?: DatetimeInputValueType
    fullWidth?: boolean
    InputProps?: TextFieldProps
}
