import { AutocompleteInput } from './inputs/autocomplete'
import type { AutocompleteInputProps } from './inputs/autocomplete/types'

import { CheckboxInput } from './inputs/checkbox'
import type { CheckboxInputProps } from './inputs/checkbox/types'

import { CustomInput } from './inputs/custom'
import type { CustomInputProps } from './inputs/custom/types'

import { DateInput } from './inputs/date'
import type { DateInputProps } from './inputs/date/types'

import { DatetimeInput } from './inputs/datetime'
import type { DatetimeInputProps } from './inputs/datetime/types'

import { FileInput } from './inputs/file'
import type { FileInputProps } from './inputs/file/types'

import { GroupInput } from './inputs/group'
import type { GroupInputProps } from './inputs/group/types'

import { ItemsInput } from './inputs/items'
import type { ItemsInputProps } from './inputs/items/types'

import { MaskInput } from './inputs/mask'
import type { MaskInputProps } from './inputs/mask/types'

import { MobileInput } from './inputs/mobile'
import type { MobileInputProps } from './inputs/mobile/types'

import { NumberInput } from './inputs/number'
import type { NumberInputProps } from './inputs/number/types'

import { OtpInput } from './inputs/otp'
import type { OtpInputProps } from './inputs/otp/types'

import { PasswordInput } from './inputs/password'
import type { PasswordInputProps } from './inputs/password/types'

import { SelectInput } from './inputs/select'
import type { SelectInputProps } from './inputs/select/types'

import { TextInput } from './inputs/text'
import type { TextInputProps } from './inputs/text/types'

import { TimeInput } from './inputs/time'
import type { TimeInputProps } from './inputs/time/types'

import { ToggleInput } from './inputs/toggle'
import type { ToggleInputProps } from './inputs/toggle/types'

type InputProps =
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
    | MaskInputProps
    | FileInputProps
    | AutocompleteInputProps
    | ToggleInputProps
    | GroupInputProps

type Input =
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
    | MaskInput
    | FileInput
    | AutocompleteInput
    | ToggleInput
    | GroupInput

type ObjectLiteral = { [key: string]: any }
type Variant = 'standard' | 'filled' | 'outlined'

interface InputActions<ValueType = any> {
    setValue: (data: ValueType) => Promise<ValueType>
    getValue: () => Promise<ValueType>
    clear: () => Promise<ValueType>
    click: () => Promise<any>
    focus: () => Promise<any>
    blur: () => Promise<any>
    copy?: () => Promise<any>
}

interface BaseInput<ValueType = any> {
    selector: string
    required?: boolean
    /**
     * @default true
     */
    visible?: ((e: any) => boolean | undefined) | boolean
    wrapper?: (children: JSX.Element, actions: InputActions<ValueType>) => JSX.Element
    onChangeValue?: (value: ValueType) => void
    getMutator?: (value: any) => any
    setMutator?: (value: any) => any
    formatter?: (value: any) => any
    _call_parent_for_update?: () => Promise<boolean>
    ref?: any
}

interface InputImplement<ValueType> {
    setValue: (data: ValueType, withoutEffect?: boolean) => Promise<ValueType>
    getValue: () => ValueType
    clear: () => Promise<ValueType>
    validation?: () => boolean
    click?: () => void
    focus?: () => void
    blur?: () => void
}

type InputGetValueTypes = ReturnType<Input['getValue']>

type OutputValues<T = ObjectLiteral> = {
    data: T
    validation: {
        status: boolean
        inputs: Array<any>
    }
}

type BuilderValue<T = any> = OutputValues<T> | undefined
type WrapperElement = JSX.Element
type WrapperActions<T = any> = InputActions<T>

export {
    BaseInput,
    BuilderValue,
    Input,
    InputActions,
    InputGetValueTypes,
    InputImplement,
    InputProps,
    ObjectLiteral,
    OutputValues,
    Variant,
    WrapperActions,
    WrapperElement,
}
