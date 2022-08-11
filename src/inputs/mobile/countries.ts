import IRFlag from './flags/ir.svg'
import USFlag from './flags/us.svg'
import AUFlag from './flags/au.svg'
import AEFlag from './flags/ae.svg'

export type Country = {
    title: string
    dialCode: string
    mask: string
    flag: string
}
export const countries: Country[] = [
    {
        title: 'IR',
        dialCode: '98',
        mask: '(...) ... ....',
        flag: IRFlag,
    },
    {
        title: 'AE',
        dialCode: '971',
        mask: '. ... ....',
        flag: AEFlag,
    },
    {
        title: 'US',
        dialCode: '1',
        mask: '... ... ....',
        flag: USFlag,
    },
]
