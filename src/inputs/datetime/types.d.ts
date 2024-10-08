import { TextFieldProps } from '@mui/material'
import { DateTimePickerProps, MuiPickersAdapter } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { BaseInput, Variant } from '../../types'

export type DatetimeInputValueType = Dayjs | null
export interface DatetimeInputProps extends BaseInput<DatetimeInputValueType>, Omit<DateTimePickerProps<Dayjs, false>, 'value' | 'renderInput' | 'ref'> {
    type: 'datetime'
    /**
     * @deprecated
     * use LocalizationProvider wrapper instead
     * @docs https://mui.com/x/react-date-pickers/getting-started/#localizationprovider
     */
    dateAdapter?: new (...args: any) => MuiPickersAdapter<Dayjs>
    variant?: Variant
    defaultValue?: DatetimeInputValueType
    fullWidth?: boolean
    InputProps?: TextFieldProps
}
