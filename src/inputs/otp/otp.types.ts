import { BaseInput } from '../../types/input.base'

export type OtpInputValueType = number | null
export interface OtpInputProps extends BaseInput<OtpInputValueType> {
    type: 'otp'
    label?: string
    /**
     * @default 4
     */
    digits?: number
    defaultValue?: OtpInputValueType
}
