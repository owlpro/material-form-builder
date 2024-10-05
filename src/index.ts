import { FormBuilder } from '@/formBuilder'
import { AutocompleteInputProps, AutocompleteInputValueType } from '@/inputs/autocomplete/types'
import { AutocompleteInput } from '@/inputs/autocomplete'
import { CheckboxInputProps, CheckboxInputValueType } from '@/inputs/checkbox/types'
import { CheckboxInput } from '@/inputs/checkbox'
import { CustomInputProps, CustomInputValueType } from '@/inputs/custom/types'
import { CustomInput } from '@/inputs/custom'
import { DateInputProps, DateInputValueType } from '@/inputs/date/types'
import { DateInput } from '@/inputs/date'
import { DatetimeInputProps, DatetimeInputValueType } from '@/inputs/datetime/types'
import { DatetimeInput } from '@/inputs/datetime'
import { FileInputProps, FileInputValueType } from '@/inputs/file/types'
import { FileInput } from '@/inputs/file'
import { ItemsInputProps, ItemsInputValueType } from '@/inputs/items/types'
import { ItemsInput } from '@/inputs/items'
import { MaskInputProps, MaskInputValueType } from '@/inputs/mask/types'
import { MaskInput } from '@/inputs/mask'
import { MobileInputProps, MobileInputValueType } from '@/inputs/mobile/types'
import { MobileInput } from '@/inputs/mobile'
import { NumberInputProps, NumberInputValueType } from '@/inputs/number/types'
import { NumberInput } from '@/inputs/number'
import { OtpInputProps, OtpInputValueType } from '@/inputs/otp/types'
import { OtpInput } from '@/inputs/otp'
import { PasswordInputProps, PasswordInputValueType } from '@/inputs/password/types'
import { PasswordInput } from '@/inputs/password'
import { SelectInputProps, SelectInputValueType } from '@/inputs/select/types'
import { SelectInput } from '@/inputs/select'
import { TextInputProps, TextInputValueType } from '@/inputs/text/types'
import { TextInput } from '@/inputs/text'
import { TimeInputProps, TimeInputValueType } from '@/inputs/time/types'
import { TimeInput } from '@/inputs/time'
import { ToggleInputProps, ToggleInputValueType } from '@/inputs/toggle/types'
import { ToggleInput } from '@/inputs/toggle'

import { InputActions, OutputValues } from '@/types'

import { Input, InputProps } from '@/types'
// import { InputActions } from '@/types'

type BuilderValue<T = any> = OutputValues<T> | undefined
type WrapperElement = JSX.Element
type WrapperActions<T = any> = InputActions<T>

export { BuilderValue, WrapperActions, WrapperElement }

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
    ToggleInputValueType,
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
    ToggleInputProps,
}

export {
    AutocompleteInput,
    CheckboxInput,
    CustomInput,
    DateInput,
    DatetimeInput,
    FileInput,
    ItemsInput,
    MaskInput,
    MobileInput,
    NumberInput,
    OtpInput,
    PasswordInput,
    SelectInput,
    TextInput,
    TimeInput,
    ToggleInput,
}

export { Input, InputProps }

export default FormBuilder
