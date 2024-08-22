import { TextFieldProps } from '@mui/material'
import { DateTimePickerProps } from '@mui/x-date-pickers'
import { MuiPickersAdapter } from '@mui/x-date-pickers/internals'
import { Variant } from '../../types/helper.types'
import { BaseInput } from '../../types/input.base'

export type DatetimeInputValueType = Date | null
export interface DatetimeInputProps
    extends BaseInput<DatetimeInputValueType>,
        Omit<DateTimePickerProps<DatetimeInputValueType, DatetimeInputValueType>, 'value' | 'renderInput' | 'ref'> {
    type: 'datetime'
    dateAdapter?: new (...args: any) => MuiPickersAdapter<unknown>
    variant?: Variant
    defaultValue?: DatetimeInputValueType
    fullWidth?: boolean
    inputProps?: TextFieldProps
}
