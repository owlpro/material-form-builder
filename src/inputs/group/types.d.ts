import { BaseInput, OutputValues, InputProps, ObjectLiteral} from '../../types'

export type GroupInputValueType = ObjectLiteral | undefined | null
export interface GroupInputProps extends Omit<BaseInput<GroupInputValueType>, 'onChangeValue'> {
    type: 'group'
    inputs: InputProps[]
    itemWrapper?: (children: JSX.Element) => JSX.Element,
    onChangeValue?: (data: OutputValues) => void
}
