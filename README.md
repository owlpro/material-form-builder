# Material Form Builder

> A dynamic, composable, and type-safe form builder built on top of **Material-UI (MUI 5 & 6)** — designed for developers who want power and flexibility in building complex, data-driven forms.

Created and maintained by [**Mahdi Amiri (@owlpro)**](https://github.com/owlpro)

---

## 🚀 Overview

**Material Form Builder** helps you build complex, nested, and fully dynamic forms using only JSON configs or JSX — without losing control of layout, validation, or interactivity.  
It’s perfect for admin panels, CMS dashboards, product editors, or anywhere you need fast, customizable forms.

---

## 🌟 Features

✅ **Dynamic JSON structure** – define your form with plain objects  
✅ **Nested group inputs** – build multi-level data structures  
✅ **Reactive form system** – handle visibility, validation, and dependencies  
✅ **Full MUI support** – all unknown props are passed to the underlying MUI components  
✅ **Custom Input API** – create reusable input types with full `setValue` / `getValue` / `clear` control  
✅ **TypeScript ready** – fully typed generics for safe development  
✅ **Works with React >=17 and MUI 5 & 6**

---

## 📦 Installation

```bash
npm install material-form-builder
# or
yarn add material-form-builder
```

Make sure you have these peer dependencies installed:

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled dayjs
```

---

## 🧱 Basic Example (with useFormBuilder)

```tsx
import React from "react"
import { Box, Button } from "@mui/material"
import { FormBuilder, useFormBuilder } from "material-form-builder"

export default function ExampleForm() {
  const { ref, getValues, setValues, clear } = useFormBuilder<{ text: string | null }>()

  return (
    <Box>
      <FormBuilder
        ref={ref}
        inputs={[
          { type: "text", selector: "text", label: "Text", variant: "outlined" }
        ]}
      />
      <Button onClick={() => console.log(getValues().data.text)}>Get</Button>
      <Button onClick={() => clear()}>Clear</Button>
      <Button onClick={() => setValues({ text: "foo" })}>Set</Button>
    </Box>
  )
}
```

---

## 🧩 Advanced Example — Nested Groups & Layouts

```tsx
<FormBuilder
  inputs={[
    {
      selector: "basic",
      type: "group",
      wrapper: inputs => (
        <TabPanel value={0}>
          <Typography variant="h6">Basic Information</Typography>
          <Grid container spacing={2}>{inputs}</Grid>
        </TabPanel>
      ),
      inputs: [
        { selector: "name", type: "text", label: "Product Name", required: true, fullWidth: true },
        { selector: "price", type: "text", label: "Price", required: true, fullWidth: true },
        { selector: "currency", type: "select", label: "Currency", options: [
          { label: "USD", value: "usd" },
          { label: "EUR", value: "eur" }
        ]}
      ]
    },
    {
      selector: "images",
      type: "group",
      wrapper: inputs => (
        <TabPanel value={1}>
          <Typography variant="h6">Images</Typography>
          <Grid container spacing={2}>{inputs}</Grid>
        </TabPanel>
      ),
      inputs: [
        { selector: "items", type: "custom", element: MultiMediaInput }
      ]
    }
  ]}
/>
```

---

## 🧠 Custom Input Example

```tsx
import { Box } from "@mui/material"
import { forwardRef, useImperativeHandle, useState } from "react"
import { CustomInputProps } from "material-form-builder"

export interface ExampleInputProps extends CustomInputProps {}
export type ExampleInputValueType = string | null

export default forwardRef(function ExampleInput(_: ExampleInputProps, ref) {
  const [value, setValue] = useState<ExampleInputValueType>(null)

  useImperativeHandle(ref, () => ({
    setValue: (v: ExampleInputValueType) => setValue(v),
    getValue: () => value,
    clear: () => setValue(null),
  }))

  return <Box>Value: {value}</Box>
})
```

Then use it inside your form:

```tsx
<FormBuilder
  ref={formRef}
  inputs={[
    {
      type: "custom",
      selector: "example",
      element: ExampleInput,
      label: "Custom Example",
    },
  ]}
/>
```

---

## 🧠 Complex Example — SEO Input

You can even build **nested FormBuilders inside custom inputs**.  
Here’s a simplified version of the internal `SeoInput` component:

```tsx
import FormBuilder, { CustomInputProps } from "material-form-builder"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"

export default forwardRef(function SeoInput(_: CustomInputProps, ref) {
  const builderRef = useRef<FormBuilder>(null)
  const [title, setTitle] = useState("")

  useImperativeHandle(ref, () => ({
    setValue: async v => builderRef.current?.setValues(v),
    getValue: () => builderRef.current?.getValues().data,
    clear: () => builderRef.current?.clear()
  }))

  return (
    <FormBuilder
      ref={builderRef}
      inputs={[
        { selector: "title", type: "text", label: "Meta Title", onChangeValue: setTitle },
        { selector: "description", type: "text", label: "Meta Description", multiline: true },
        {
          selector: "og",
          type: "group",
          wrapper: inputs => <Stack spacing={2}>{inputs}</Stack>,
          inputs: [
            { selector: "title", type: "text", label: "OG Title" },
            { selector: "description", type: "text", label: "OG Description", multiline: true }
          ]
        }
      ]}
    />
  )
})
```

This is a real-world example from production usage — showing how `FormBuilder` can recursively manage other forms.

---

## ⚙️ API Overview

### `<FormBuilder />` Props

| Prop | Type | Description |
|------|------|-------------|
| `inputs` | `InputProps[]` | Array of input configurations |
| `onChange` | `(values) => void` | Called when any input value changes |
| `onMount` | `(values) => void` | Called after first render |
| `ref` | `FormBuilder` | Ref to access form methods (`getValues`, `setValues`, `clear`) |

### InputProps (common fields)

| Key | Type | Description |
|-----|------|-------------|
| `type` | `"text" \| "number" \| "group" \| "custom" \| ...` | Input type |
| `selector` | `string` | Unique key for field |
| `label` | `string` | Input label |
| `required` | `boolean` | Field required or not |
| `visible` | `(data) => boolean` | Function to show/hide field |
| `wrapper` | `(child, actions) => ReactNode` | Custom layout wrapper |
| `updateListener` | `any[]` | Dependencies for reactive updates |
| `element` | `React.ComponentType` | For `type: "custom"` |
| `inputs` | `InputProps[]` | For nested groups |

### FormBuilder Ref Methods

| Method | Returns | Description |
|---------|----------|-------------|
| `getValues(validation?: boolean)` | `{ data, validation }` | Get form data and validation state |
| `setValues(values)` | `Promise<void>` | Set form values |
| `clear()` | `Promise<void>` | Reset all fields |

---

## 🧩 TypeScript Support

All hooks and components are strongly typed.  
You can safely define the expected form shape:

```ts
const { ref, getValues } = useFormBuilder<{ name: string; price: number }>()
const values = getValues().data // { name: string; price: number }
```

---

## 🪪 License

MIT © [Mahdi Amiri](https://github.com/owlpro)