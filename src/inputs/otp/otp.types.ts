import { CSSProperties, DetailedHTMLProps, HTMLProps, InputHTMLAttributes } from 'react'
import { BaseInput } from '../../types/input.base'

export type OtpInputValueType = string | null
export interface OtpInputProps extends BaseInput<OtpInputValueType>, Omit<HTMLProps<HTMLInputElement>, 'defaultValue' | 'ref'>{
    type: 'otp'

    defaultValue?: OtpInputValueType

    /** * @default standard */
    variant?: 'outlined' | 'standard'

    /** * @default 4 */
    digits?: number

    autoFocus?: boolean

    /** @default 55 */
    height?: number

    /** @default 34.61 */
    width?: number

    /** @default 1 */
    borderWidth?: number

    /** @default 8 */
    spaceBetween?: number

    /** @default 4 */
    borderRadius?: number

    /** @default #0000003b */
    emptyColor?: CSSProperties['color']

    /** @default #1976d2 */
    focusColor?: CSSProperties['color']

    /** @default #68b36b */
    completeColor?: CSSProperties['color']

    /** @default 400 */
    fontWeight?: number

    /** @default 23 */
    fontSize?: number

    /** @default #323232 */
    color?: CSSProperties['color']
}
