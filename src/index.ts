import { FormBuilder } from './formBuilder'
import { AutocompleteInputProps,AutocompleteInputValueType } from './inputs/autocomplete/autocomplete.types'
import { CheckboxInputProps, CheckboxInputValueType } from './inputs/checkbox/checkbox.interface'
import { CustomInputProps, CustomInputValueType } from './inputs/custom/custom.interface'
import { DateInputProps, DateInputValueType } from './inputs/date/date.types'
import { DatetimeInputProps, DatetimeInputValueType } from './inputs/datetime/datetime.types'
import { FileInputProps, FileInputValueType } from './inputs/file/file.types'
import { ItemsInputProps, ItemsInputValueType } from './inputs/items/items.interface'
import { MaskInputProps, MaskInputValueType } from './inputs/mask/mask.types'
import { MobileInputProps, MobileInputValueType } from './inputs/mobile/mobile.types'
import { NumberInputProps, NumberInputValueType } from './inputs/number/number.interface'
import { OtpInputProps, OtpInputValueType } from './inputs/otp/otp.types'
import { PasswordInputProps, PasswordInputValueType } from './inputs/password/password.types'
import { SelectInputProps, SelectInputValueType } from './inputs/select/select.types'
import { TextInputProps, TextInputValueType } from './inputs/text/text.types'
import { TimeInputProps, TimeInputValueType } from './inputs/time/time.types'
import { ToggleInputProps, ToggleInputValueType } from './inputs/toggle/toggle.types'
import { OutputValues } from './types/builder.outputValues'
import { InputActions } from './types/input.base'

type BuilderValue = OutputValues | undefined
type WrapperElement = JSX.Element
type WrapperActions<T = any> = InputActions<T>
export { FormBuilder, BuilderValue }
export {WrapperActions, WrapperElement }

export {
    AutocompleteInputValueType,
    CheckboxInputValueType,
    CustomInputValueType,
    DateInputValueType,
    DatetimeInputValueType,
    FileInputValueType,
    ItemsInputValueType,
    MaskInputValueType,
    MobileInputValueType,
    NumberInputValueType,
    OtpInputValueType,
    PasswordInputValueType,
    SelectInputValueType,
    TextInputValueType,
    TimeInputValueType,
    ToggleInputValueType
}

export {
    AutocompleteInputProps,
    CheckboxInputProps,
    CustomInputProps,
    DateInputProps,
    DatetimeInputProps,
    FileInputProps,
    ItemsInputProps,
    MaskInputProps,
    MobileInputProps,
    NumberInputProps,
    OtpInputProps,
    PasswordInputProps,
    SelectInputProps,
    TextInputProps,
    TimeInputProps,
    ToggleInputProps
}
