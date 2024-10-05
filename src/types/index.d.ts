import { AutocompleteInput } from '@/inputs/autocomplete'
import { AutocompleteInputProps } from '@/inputs/autocomplete/types'

import { CheckboxInput } from '@/inputs/checkbox'
import { CheckboxInputProps } from '@/inputs/checkbox/types'
import { CustomInput } from '@/inputs/custom'
import { CustomInputProps } from '@/inputs/custom/types'
import { DateInput } from '@/inputs/date'
import { DateInputProps } from '@/inputs/date/types'
import { DatetimeInput } from '@/inputs/datetime'
import { DatetimeInputProps } from '@/inputs/datetime/types'
import { FileInput } from '@/inputs/file'
import { FileInputProps } from '@/inputs/file/types'
import { GroupInput } from '@/inputs/group'
import { GroupInputProps } from '@/inputs/group/types'
import { ItemsInput } from '@/inputs/items'
import { ItemsInputProps } from '@/inputs/items/types'
import { MaskInput } from '@/inputs/mask'
import { MaskInputProps } from '@/inputs/mask/types'
import { MobileInput } from '@/inputs/mobile'
import { MobileInputProps } from '@/inputs/mobile/types'
import { NumberInput } from '@/inputs/number'
import { NumberInputProps } from '@/inputs/number/types'
import { OtpInput } from '@/inputs/otp'
import { OtpInputProps } from '@/inputs/otp/types'
import { PasswordInput } from '@/inputs/password'
import { PasswordInputProps } from '@/inputs/password/types'
import { SelectInput } from '@/inputs/select'
import { SelectInputProps } from '@/inputs/select/types'
import { TextInput } from '@/inputs/text'
import { TextInputProps } from '@/inputs/text/types'
import { TimeInput } from '@/inputs/time'
import { TimeInputProps } from '@/inputs/time/types'
import { ToggleInput } from '@/inputs/toggle'
import { ToggleInputProps } from '@/inputs/toggle/types'
import { ObjectLiteral } from '@/types/helpers'

export interface InputActions<ValueType = any> {
    setValue: (data: ValueType) => Promise<ValueType>
    getValue: () => Promise<ValueType>
    clear: () => Promise<ValueType>
    click: () => Promise<any>
    focus: () => Promise<any>
    blur: () => Promise<any>
    copy?: () => Promise<any>
}

export interface BaseInput<ValueType = any> {
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


export interface InputImplement<ValueType> {
    setValue: (data: ValueType, withoutEffect?: boolean) => Promise<ValueType>
    getValue: () => ValueType
    clear: () => Promise<ValueType>
    validation?: () => boolean
    click?: () => void
    focus?: () => void
    blur?: () => void
}



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
    | MaskInputProps
    | FileInputProps
    | AutocompleteInputProps
    | ToggleInputProps
    | GroupInputProps

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
    | MaskInput
    | FileInput
    | AutocompleteInput
    | ToggleInput
    | GroupInput

export type InputGetValueTypes = ReturnType<Input['getValue']>
export type InputTypes = InputProps['type']

export type OutputValues<T = ObjectLiteral> = {
    data: T
    validation: {
        status: boolean
        inputs: InputProps[]
    }
}
