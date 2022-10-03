import { DatePickerProps } from '@mui/x-date-pickers'
import { MuiPickersAdapter } from '@mui/x-date-pickers/internals'
import { Variant } from '../../types/helper.types'
import { BaseInput } from '../../types/input.base'

export type DateInputValueType = Date | null
export interface DateInputProps
    extends BaseInput<DateInputValueType>,
        Omit<DatePickerProps<DateInputValueType, DateInputValueType>, 'onChange' | 'value' | 'renderInput'> {
    type: 'date'
    dateAdapter?: new (...args: any) => MuiPickersAdapter<unknown>
    variant?: Variant
    defaultValue?: DateInputValueType,
    fullWidth?: boolean
}
