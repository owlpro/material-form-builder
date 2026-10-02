import { BaseInput, Variant } from '../../types'
import { LegacyTextFieldProps } from '../legacyTypes'
import { TextFieldProps } from '@mui/material'
import { MuiPickersAdapter, TimePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'

export type TimeInputValueType = Dayjs | null
export interface TimeInputProps extends BaseInput<TimeInputValueType>, Omit<TimePickerProps, 'value' | 'ref'> {
    type: 'time'
    /**
     * @deprecated
     * use LocalizationProvider wrapper instead
     * @docs https://mui.com/x/react-date-pickers/getting-started/#localizationprovider
     */
    dateAdapter?: new (...args: any) => MuiPickersAdapter<Dayjs>
    variant?: Variant
    defaultValue?: TimeInputValueType
    fullWidth?: boolean
    InputProps?: TextFieldProps & LegacyTextFieldProps
}
