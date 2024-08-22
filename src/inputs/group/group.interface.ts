import { OutputValues } from '../../types/builder.outputValues'
import { ObjectLiteral } from '../../types/helper.types'
import { InputProps } from '../../types/input'
import { BaseInput } from '../../types/input.base'

export type GroupInputValueType = ObjectLiteral | undefined | null
export interface GroupInputProps extends Omit<BaseInput<GroupInputValueType>, 'onChangeValue'> {
    type: 'group'
    inputs: InputProps[]
    itemWrapper?: (children: JSX.Element) => JSX.Element,
    onChangeValue?: (data: OutputValues) => void
}
