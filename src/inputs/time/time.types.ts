import { TextFieldProps } from '@mui/material'
import { TimePickerProps } from '@mui/x-date-pickers'
import { MuiPickersAdapter } from '@mui/x-date-pickers/internals'
import { Variant } from '../../types/helper.types'
import { BaseInput } from '../../types/input.base'

export type TimeInputValueType = Date | null
export interface TimeInputProps
    extends BaseInput<TimeInputValueType>,
        Omit<TimePickerProps<TimeInputValueType, TimeInputValueType>, 'onChange' | 'value' | 'renderInput' | 'ref'> {
    type: 'time'
    dateAdapter?: new (...args: any) => MuiPickersAdapter<unknown>
    variant?: Variant
    defaultValue?: TimeInputValueType
    fullWidth?: boolean
    inputProps?: TextFieldProps
    onChange?: (value: any, keyboardInputValue?: string) => void
}
