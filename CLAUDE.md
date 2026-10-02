# material-form-builder — Project Context

## Overview
An npm library (v2.x) providing a dynamic, type-safe React form builder on top of MUI v9 and MUI X v9.
`main` (= `mui-v9`) holds 2.x (MUI v9); `mui-v6` holds 1.x (MUI v6); `mui-v5` holds 0.x (MUI v5).
One tag per MUI line: `mui-vX/<version>` (`mui-v5/0.22.0`, `mui-v6/1.5.9`, `mui-v9/2.0.0`).
Author: Mahdi Amiri (@owlpro)

## Build
```bash
yarn build   # rm -rf dist && rollup -c
yarn watch   # rollup -cw
```

## Key Architecture

### Core files
- `src/formBuilder.tsx` — `FormBuilder` class component (main engine)
- `src/helpers/useFormBuilder.ts` — `useFormBuilder<TValues>()` hook (ref + getValues/setValues/clear)
- `src/index.ts` — public exports
- `src/types.d.ts` — all shared types

### Input types (18 total)
| type | value type | notes |
|------|-----------|-------|
| `text` | `string \| null` | MUI TextField + `autoDirection`, `formatter` |
| `number` | `number \| null` | MUI TextField numeric |
| `password` | `string \| null` | with show/hide toggle |
| `select` | `any` | `options: [{label, value}]`, `loading`, `listSubheaderText` |
| `autocomplete` | `string \| number \| array \| null` | MUI Autocomplete, `disableClearOnChangeOptions` |
| `toggle` | `string \| string[] \| null` | ToggleButtonGroup, `options`, `exclusive`, `enforceValueSet` |
| `switch` | `boolean` | MUI Switch, `label`, `defaultChecked` |
| `checkbox` | — | MUI Checkbox |
| `date` | — | MUI DatePicker (dayjs) |
| `time` | — | MUI TimePicker |
| `datetime` | — | MUI DateTimePicker |
| `mobile` | `string \| null` | phone input with country code |
| `otp` | — | one-time password field |
| `mask` | — | masked text input |
| `file` | — | file upload |
| `items` | `any` | repeatable group: `inputs[]`, `minItems`, `maxItems`, `renderHeader`, `itemWrapper` |
| `group` | `ObjectLiteral` | nested FormBuilder: `inputs[]`, `itemWrapper` |
| `custom` | `any` | bring-your-own component: `element`, `allowObject` |

### BaseInput (all inputs share these)
```ts
selector: string          // unique key, supports dot notation (e.g. "address.city")
required?: boolean
visible?: boolean | ((data) => boolean)
wrapper?: (child, actions) => JSX.Element
updateListener?: any[]
onChangeValue?: (value) => void
getMutator?: (value) => any   // transform on getValues
setMutator?: (value) => any   // transform on setValues
formatter?: (value) => any    // text inputs
reactKey?: string
ref?: any
```

### FormBuilder API
```ts
// Ref methods
getValues(validation?: boolean): OutputValues  // { data, validation: { status, inputs }, api: { refs } }
setValues(values: ObjectLiteral): Promise<void>
clear(): Promise<void>

// Props
inputs: InputProps[]
onChange?: (values: OutputValues) => void
onMount?: (values: OutputValues) => void
```

### useFormBuilder hook
```ts
const { ref, getValues, setValues, clear, getBuilder } = useFormBuilder<TValues>()
// attach ref to <FormBuilder ref={ref} ... />
```

### selector dot-notation
Supports nested paths: `"user.address.city"` maps to `{ user: { address: { city: value } } }`.
Also supports array key-value selectors: `"items[id=123].name"`.

### Custom Input pattern
```tsx
forwardRef(function MyInput(props: CustomInputProps, ref) {
  useImperativeHandle(ref, () => ({
    setValue: async (v) => { ... },
    getValue: () => value,
    clear: async () => { ... },
    validation?: () => boolean,  // optional
  }))
})
```

## Peer dependencies
`@mui/material` 9, `@mui/icons-material` 9, `@mui/x-date-pickers` 9, `@emotion/react`, `@emotion/styled`, `dayjs`, `react` 18 / 19

## MUI v9 notes
- TextField-based inputs pass their props through `withLegacySlotProps` (`src/helpers/general.ts`), which moves the removed `InputProps` / `inputProps` / `InputLabelProps` / `SelectProps` / `FormHelperTextProps` into `slotProps`. Their types live in `src/inputs/legacyTypes.d.ts`.
- When an input adds its own `slotProps` entry, merge it with `mergeSlot` so the consumer's entry is kept (entries can be objects or callbacks).
- Import pickers as `@mui/x-date-pickers/DatePicker`, never `.../DatePicker/index.js` — v9's `exports` map rejects the `index.js` path at runtime.
- Picker fields render sections next to a hidden `<input>`; focus sits on a section, so `blur()` blurs the active element inside the field.
- No system props (`display`, `alignItems`, `mt`, ...) on `Box` / `Stack` / `Typography` — use `sx`.
- `skipLibCheck` hides errors in the `types.d.ts` files. To check them, copy them to `.ts` temporarily and run `tsc`.

## Docs
- `README.md` — full overview + examples
- `docs/inputs/*.md` — per-input documentation
