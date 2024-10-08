import { TextFieldProps } from '@mui/material'
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { MuiPickersAdapter } from '@mui/x-date-pickers'
import { BaseInput, Variant } from '../../types'
import { Dayjs } from 'dayjs'

export type DateInputValueType = Dayjs | null
export interface DateInputProps extends BaseInput<DateInputValueType>, Omit<DatePickerProps<Dayjs, false>, 'value' | 'renderInput' | 'ref'> {
    type: 'date'
    /**
     * @deprecated
     * use LocalizationProvider wrapper instead
     * @docs https://mui.com/x/react-date-pickers/getting-started/#localizationprovider
     */
    dateAdapter?: new (...args: any) => MuiPickersAdapter<Dayjs>
    variant?: Variant
    defaultValue?: DateInputValueType
    fullWidth?: boolean
    InputProps?: TextFieldProps
    // onChange?: (value: any, keyboardInputValue?: string) => void
}
