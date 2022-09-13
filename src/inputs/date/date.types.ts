import { DatePickerProps } from '@mui/x-date-pickers'
import { MuiPickersAdapter } from '@mui/x-date-pickers/internals'
import { Dayjs } from 'dayjs'
import { Variant } from '../../types/helper.types'
import { BaseInput } from '../../types/input.base'

export type DateInputValueType = Dayjs | any
export interface DateInputProps
    extends BaseInput<DateInputValueType>,
        Omit<DatePickerProps<DateInputValueType, DateInputValueType>, 'onChange' | 'value' | 'renderInput'> {
    type: 'date'
    dateAdapter?: new (...args: any) => MuiPickersAdapter<unknown>
    variant?: Variant
    defaultValue?: DateInputValueType
}
