import { CheckboxInput } from '../inputs/checkbox/checkbox.input'
import { CheckboxInputProps } from '../inputs/checkbox/checkbox.interface'
import { CustomInput } from '../inputs/custom/custom.input'
import { CustomInputProps } from '../inputs/custom/custom.interface'
import { DateInput } from '../inputs/date/date.input'
import { DateInputProps } from '../inputs/date/date.types'
import { DatetimeInput } from '../inputs/datetime/datetime.input'
import { DatetimeInputProps } from '../inputs/datetime/datetime.types'
import { ItemsInput } from '../inputs/items/items.input'
import { ItemsInputProps } from '../inputs/items/items.interface'
import { MobileInput } from '../inputs/mobile/mobile.input'
import { MobileInputProps } from '../inputs/mobile/mobile.types'
import { NumberInput } from '../inputs/number/number.input'
import { NumberInputProps } from '../inputs/number/number.interface'
import { OtpInput } from '../inputs/otp/otp.input'
import { OtpInputProps } from '../inputs/otp/otp.types'
import { PasswordInput } from '../inputs/password/password.input'
import { PasswordInputProps } from '../inputs/password/password.types'
import { SelectInput } from '../inputs/select/select.input'
import { SelectInputProps } from '../inputs/select/select.types'
import { TextInput } from '../inputs/text/text.input'
import { TextInputProps } from '../inputs/text/text.types'
import { TimeInput } from '../inputs/time/time.input'
import { TimeInputProps } from '../inputs/time/time.types'

export type InputProps =
    | TextInputProps
    | NumberInputProps
    | ItemsInputProps
    | CustomInputProps
    | CheckboxInputProps
    | MobileInputProps
    | OtpInputProps
    | PasswordInputProps
    | SelectInputProps
    | DateInputProps
    | TimeInputProps
    | DatetimeInputProps

export type Input =
    | TextInput
    | NumberInput
    | ItemsInput
    | CustomInput
    | CheckboxInput
    | MobileInput
    | OtpInput
    | PasswordInput
    | SelectInput
    | DateInput
    | TimeInput
    | DatetimeInput

export type InputGetValueTypes = ReturnType<Input['getValue']>
export type InputTypes = InputProps['type']
