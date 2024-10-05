import { TextFieldProps } from '@mui/material'
import { MuiPickersAdapter, TimePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { Variant } from '@/types/helpers'
import { BaseInput } from '@/types'

export type TimeInputValueType = Dayjs | null
export interface TimeInputProps extends BaseInput<TimeInputValueType>, Omit<TimePickerProps<Dayjs, false>, 'onChange' | 'value' | 'renderInput' | 'ref'> {
    type: 'time'
    dateAdapter?: new (...args: any) => MuiPickersAdapter<Dayjs>
    variant?: Variant
    defaultValue?: TimeInputValueType
    fullWidth?: boolean
    inputProps?: TextFieldProps
    onChange?: (value: any, keyboardInputValue?: string) => void
}
