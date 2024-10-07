import { BaseInput, Variant } from '../../types'
import { TextFieldProps } from '@mui/material/TextField'
import { MuiPickersAdapter, TimePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'

export type TimeInputValueType = Dayjs | null
export interface TimeInputProps extends BaseInput<TimeInputValueType>, Omit<TimePickerProps<Dayjs, false>, 'value' | 'renderInput' | 'ref'> {
    type: 'time'
    dateAdapter?: new (...args: any) => MuiPickersAdapter<Dayjs>
    variant?: Variant
    defaultValue?: TimeInputValueType
    fullWidth?: boolean
    InputProps?: TextFieldProps
}
