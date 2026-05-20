import { Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import FormBuilder, { useFormBuilder } from 'material-form-builder'
import { useState } from 'react'
import DemoSection from '../../components/DemoSection'
import { useLang } from '../../contexts/LangContext'

// ─── Translations ───────────────────────────────────────────────────────────

const t = {
  en: {
    pageTitle: 'Text Input',
    overview: {
      howTitle: 'How does it work?',
      howBody: (
        <>
          <code>TextInput</code> renders exactly the same MUI{' '}
          <code>
            <a href="https://mui.com/material-ui/react-text-field/" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
              TextField
            </a>
          </code>
          . Every prop — <code>variant</code>, <code>fullWidth</code>, <code>InputProps</code>,{' '}
          <code>inputProps</code>, <code>sx</code>, event handlers and anything else — is passed directly to MUI.
        </>
      ),
      internalTitle: 'Internal connections',
      internalBody: 'On top of MUI props, FormBuilder wires a few internal connections to TextField:',
      connections: [
        ['value',          'Internal state — TextField is never uncontrolled'],
        ['onChange',       'Reads value from event, applies formatter, then notifies parent'],
        ['onBlur/onFocus', 'Detects whether value changed since last focus to skip unnecessary re-renders'],
        ['error',          'Automatically managed from internal validation'],
        ['inputRef',       'Direct ref to DOM input — used for programmatic click / focus / blur'],
      ],
      exclusiveTitle: 'Exclusive props (beyond MUI)',
      exclusiveProps: [
        ['autoDirection', 'Detects the first typed character — sets direction rtl for Arabic/Persian content'],
        ['formatter',     'Runs on every keystroke — filter or transform the value, return undefined to discard'],
        ['defaultValue',  'Initial value on mount and after clear()'],
        ['selector',      'Unique key in getValues output — supports dot notation (e.g. "user.name")'],
        ['required',      'If empty, getValues(true) marks it invalid and the field flashes red for 3s'],
        ['onChangeValue', 'Simple callback with the new value — no event object needed'],
      ],
    },
    demos: {
      basic:         { title: 'Basic' },
      variants:      { title: 'Variants',               desc: 'Supports all MUI TextField variants. Default is standard.' },
      required:      { title: 'Required & Validation',  desc: 'Set required: true. Calling getValues() triggers validation — invalid fields flash red for 3 seconds.' },
      disabled:      { title: 'Disabled & Read-only',   desc: "disabled is a MUI prop. For read-only behavior use MUI's inputProps: { readOnly: true }." },
      multiline:     { title: 'Multiline',              desc: 'Pass multiline + rows to turn the input into a textarea.' },
      formatter:     { title: 'Formatter',              desc: 'formatter runs on every keystroke. Transform or filter the value — return undefined to discard the change.' },
      autoDirection: { title: 'Auto Direction',         desc: "autoDirection detects the first character's script (Latin → ltr, Arabic/Persian → rtl) and sets direction automatically." },
      onChange:      { title: 'onChange / onChangeValue', desc: 'onChangeValue fires on every keystroke with the current value (string | null). onChange is the raw MUI event.' },
      api:           { title: 'API — getValues / setValues / clear', desc: 'Full programmatic control via the useFormBuilder hook.' },
    },
    submit: 'Submit',
    validMsg: (v: string) => `✓  email = "${v}"`,
    invalidMsg: '✗  validation failed',
    currentValue: 'Current value:',
  },
  fa: {
    pageTitle: 'Text Input',
    overview: {
      howTitle: 'چطور کار می‌کنه؟',
      howBody: (
        <>
          <code>TextInput</code> دقیقاً همان MUI{' '}
          <code>
            <a href="https://mui.com/material-ui/react-text-field/" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
              TextField
            </a>
          </code>{' '}
          را رندر می‌کند. تمام props — از <code>variant</code> و <code>fullWidth</code> گرفته تا{' '}
          <code>InputProps</code>، <code>inputProps</code>، <code>sx</code>، event handler‌ها و هر چیز دیگری — مستقیماً به MUI پاس می‌شوند.
        </>
      ),
      internalTitle: 'اتصالات داخلی',
      internalBody: 'علاوه بر MUI props، FormBuilder چند اتصال داخلی به TextField وصل می‌کند:',
      connections: [
        ['value',          'state داخلی — TextField هیچوقت uncontrolled نیست'],
        ['onChange',       'مقدار را از event می‌خواند، formatter را اعمال می‌کند، سپس parent را خبر می‌دهد'],
        ['onBlur/onFocus', 'تشخیص می‌دهد آیا مقدار نسبت به focus قبلی تغییر کرده تا re-render بی‌دلیل نزند'],
        ['error',          'به طور خودکار از validation داخلی مدیریت می‌شود'],
        ['inputRef',       'ref مستقیم به DOM input — برای click / focus / blur برنامه‌نویسی'],
      ],
      exclusiveTitle: 'Props اختصاصی (فراتر از MUI)',
      exclusiveProps: [
        ['autoDirection', 'اولین کاراکتر تایپ‌شده را تشخیص می‌دهد — اگر فارسی/عربی باشد direction را rtl می‌کند'],
        ['formatter',     'روی هر keystroke اجرا می‌شود — مقدار را فیلتر یا تبدیل کن، undefined برگردان تا تغییر را لغو کنی'],
        ['defaultValue',  'مقدار اولیه هنگام mount و بعد از clear()'],
        ['selector',      'کلید یکتا در خروجی getValues — از dot notation پشتیبانی می‌کند (مثلاً "user.name")'],
        ['required',      'اگر مقدار خالی باشد، getValues(true) آن را invalid می‌کند و field 3 ثانیه قرمز می‌شود'],
        ['onChangeValue', 'callback ساده با مقدار جدید — بدون نیاز به event object'],
      ],
    },
    demos: {
      basic:         { title: 'پایه' },
      variants:      { title: 'حالت‌های نمایش',        desc: 'از تمام variant‌های MUI TextField پشتیبانی می‌کند. پیش‌فرض standard است.' },
      required:      { title: 'اجباری و اعتبارسنجی',  desc: 'با required: true فعال می‌شود. صدا زدن getValues() اعتبارسنجی را اجرا می‌کند — فیلدهای نامعتبر 3 ثانیه قرمز می‌شوند.' },
      disabled:      { title: 'غیرفعال و فقط خواندنی', desc: 'disabled یک prop از MUI است. برای read-only از inputProps: { readOnly: true } استفاده کن.' },
      multiline:     { title: 'چندخطی',                desc: 'multiline + rows را ست کن تا input به textarea تبدیل شود.' },
      formatter:     { title: 'فرمت‌کننده',             desc: 'formatter روی هر keystroke اجرا می‌شود. مقدار را فیلتر یا تبدیل کن — بازگشت undefined تغییر را لغو می‌کند.' },
      autoDirection: { title: 'جهت خودکار',             desc: 'autoDirection اولین کاراکتر را شناسایی می‌کند (لاتین → ltr، فارسی/عربی → rtl) و direction را به‌طور خودکار تنظیم می‌کند.' },
      onChange:      { title: 'onChange / onChangeValue', desc: 'onChangeValue روی هر keystroke با مقدار جاری (string | null) فراخوانی می‌شود. onChange همان event خام MUI است.' },
      api:           { title: 'API — getValues / setValues / clear', desc: 'کنترل کامل برنامه‌نویسی از طریق hook useFormBuilder.' },
    },
    submit: 'ارسال',
    validMsg: (v: string) => `✓  email = "${v}"`,
    invalidMsg: '✗  اعتبارسنجی ناموفق',
    currentValue: 'مقدار جاری:',
  },
}

// ─── Overview ───────────────────────────────────────────────────────────────

function TextInputOverview({ lang }: { lang: 'en' | 'fa' }) {
  const ov = t[lang].overview
  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 4, bgcolor: '#f9fafb', borderColor: '#e0e0e0', borderRadius: 2 }}>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        {ov.howTitle}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {ov.howBody}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        {ov.internalTitle}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        {ov.internalBody}
      </Typography>
      <Stack spacing={0.8}>
        {ov.connections.map(([name, desc]) => (
          <Box key={name} sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: '#ede7f6', color: '#512da8', px: 0.8, py: 0.2, borderRadius: 0.5, whiteSpace: 'nowrap', flexShrink: 0 }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">{desc}</Typography>
          </Box>
        ))}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        {ov.exclusiveTitle}
      </Typography>
      <Stack spacing={0.8}>
        {ov.exclusiveProps.map(([name, desc]) => (
          <Box key={name} sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: '#e8f5e9', color: '#2e7d32', px: 0.8, py: 0.2, borderRadius: 0.5, whiteSpace: 'nowrap', flexShrink: 0 }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">{desc}</Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}

// ─── Basic ──────────────────────────────────────────────────────────────────

const basicCode = `import FormBuilder, { useFormBuilder } from 'material-form-builder'

const { ref } = useFormBuilder()

<FormBuilder
  ref={ref}
  inputs={[{
    type: 'text',
    selector: 'name',
    label: 'Full Name',
  }]}
/>`

function BasicDemo() {
  const { ref } = useFormBuilder()
  return <FormBuilder ref={ref} inputs={[{ type: 'text', selector: 'name', label: 'Full Name' }]} />
}

// ─── Variants ───────────────────────────────────────────────────────────────

const variantsCode = `inputs={[
  { type: 'text', selector: 'a', label: 'Standard'  },                       // default
  { type: 'text', selector: 'b', label: 'Outlined', variant: 'outlined' },
  { type: 'text', selector: 'c', label: 'Filled',   variant: 'filled'   },
]}`

function VariantsDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack spacing={3}>
      <FormBuilder
        ref={ref}
        inputs={[
          { type: 'text', selector: 'a', label: 'Standard' },
          { type: 'text', selector: 'b', label: 'Outlined', variant: 'outlined' },
          { type: 'text', selector: 'c', label: 'Filled', variant: 'filled' },
        ]}
      />
    </Stack>
  )
}

// ─── Required & Validation ──────────────────────────────────────────────────

const requiredCode = `const { ref, getValues } = useFormBuilder()

<FormBuilder
  ref={ref}
  inputs={[{
    type: 'text',
    selector: 'email',
    label: 'Email',
    required: true,
    variant: 'outlined',
  }]}
/>

const { data, validation } = getValues()   // validation: true
// if empty → field flashes red for 3s, validation.status = false`

function RequiredDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref, getValues } = useFormBuilder<{ email: string | null }>()
  const [result, setResult] = useState<string | null>(null)
  const T = t[lang]

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'text', selector: 'email', label: 'Email', required: true, variant: 'outlined', fullWidth: true }]}
      />
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button variant="contained" size="small" onClick={() => {
          const { data, validation } = getValues()
          setResult(validation.status ? T.validMsg(data.email ?? '') : T.invalidMsg)
        }}>
          {T.submit}
        </Button>
        {result && (
          <Typography variant="body2" color={result.startsWith('✓') ? 'success.main' : 'error.main'}>
            {result}
          </Typography>
        )}
      </Box>
    </Stack>
  )
}

// ─── Disabled & Read-only ───────────────────────────────────────────────────

const disabledCode = `inputs={[
  {
    type: 'text', selector: 'a', label: 'Disabled',
    defaultValue: 'Cannot edit', variant: 'outlined', disabled: true,
  },
  {
    type: 'text', selector: 'b', label: 'Read-only',
    defaultValue: 'Read only', variant: 'outlined',
    inputProps: { readOnly: true },
  },
]}`

function DisabledDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[
          { type: 'text', selector: 'a', label: 'Disabled', defaultValue: 'Cannot edit', variant: 'outlined', disabled: true },
          { type: 'text', selector: 'b', label: 'Read-only', defaultValue: 'Read only', variant: 'outlined', inputProps: { readOnly: true } },
        ]}
      />
    </Stack>
  )
}

// ─── Multiline ──────────────────────────────────────────────────────────────

const multilineCode = `inputs={[{
  type: 'text',
  selector: 'notes',
  label: 'Notes',
  multiline: true,
  rows: 4,
  variant: 'outlined',
  fullWidth: true,
}]}`

function MultilineDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[{ type: 'text', selector: 'notes', label: 'Notes', multiline: true, rows: 4, variant: 'outlined', fullWidth: true }]}
    />
  )
}

// ─── Formatter ──────────────────────────────────────────────────────────────

const formatterCode = `inputs={[{
  type: 'text',
  selector: 'username',
  label: 'Username — only a-z and 0-9',
  variant: 'outlined',
  formatter: (value) => value.replace(/[^a-z0-9]/g, '').toLowerCase(),
}]}`

function FormatterDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[{
        type: 'text', selector: 'username', label: 'Username — only a-z and 0-9',
        variant: 'outlined', fullWidth: true,
        formatter: (value: string) => value.replace(/[^a-z0-9]/g, '').toLowerCase(),
      }]}
    />
  )
}

// ─── autoDirection ──────────────────────────────────────────────────────────

const autoDirectionCode = `inputs={[{
  type: 'text',
  selector: 'content',
  label: 'Auto Direction',
  variant: 'outlined',
  fullWidth: true,
  autoDirection: true,   // detects first char: Persian → rtl, English → ltr
}]}`

function AutoDirectionDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[{
        type: 'text', selector: 'content',
        label: 'Auto Direction — try typing in Persian or English',
        variant: 'outlined', fullWidth: true, autoDirection: true,
      }]}
    />
  )
}

// ─── onChange / onChangeValue ───────────────────────────────────────────────

const onChangeCode = `const [val, setVal] = useState<string | null>(null)

inputs={[{
  type: 'text',
  selector: 'search',
  label: 'Search',
  variant: 'outlined',
  onChangeValue: (value) => setVal(value),   // fires on every keystroke
}]}`

function OnChangeDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref } = useFormBuilder()
  const [val, setVal] = useState<string | null>(null)

  return (
    <Stack spacing={1.5}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'text', selector: 'search', label: 'Search',
          variant: 'outlined', fullWidth: true,
          onChangeValue: (value: string | null) => setVal(value),
        }]}
      />
      <Typography variant="body2" color="text.secondary">
        {t[lang].currentValue} <strong>{val ?? '(null)'}</strong>
      </Typography>
    </Stack>
  )
}

// ─── Full API ────────────────────────────────────────────────────────────────

const apiCode = `const { ref, getValues, setValues, clear } = useFormBuilder<{
  title: string | null
}>()

// read without triggering validation
const { data } = getValues(false)
console.log(data.title)

// write programmatically
await setValues({ title: 'Hello!' })

// reset to defaultValue (null if not set)
await clear()`

function ApiDemo() {
  const { ref, getValues, setValues, clear } = useFormBuilder<{ title: string | null }>()
  const [output, setOutput] = useState<string | null>(null)

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'text', selector: 'title', label: 'Title', variant: 'outlined', fullWidth: true }]}
      />
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" onClick={() => {
          setOutput(JSON.stringify(getValues(false).data, null, 2))
        }}>getValues</Button>
        <Button size="small" variant="outlined" onClick={async () => {
          await setValues({ title: 'Hello from setValues!' })
          setOutput(null)
        }}>setValues</Button>
        <Button size="small" variant="outlined" color="error" onClick={async () => {
          await clear()
          setOutput(null)
        }}>clear</Button>
      </Stack>
      {output && (
        <Box component="pre" sx={{ m: 0, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 1, fontSize: '0.8rem', fontFamily: 'monospace' }}>
          {output}
        </Box>
      )}
    </Stack>
  )
}

// ─── Page content ────────────────────────────────────────────────────────────

function TextInputContent({ lang }: { lang: 'en' | 'fa' }) {
  const d = t[lang].demos
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t[lang].pageTitle}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          <Chip label='type: "text"' size="small" variant="outlined" />
          <Chip label="value: string | null" size="small" variant="outlined" />
          <Chip label="defaultValue?: string | null" size="small" variant="outlined" />
        </Stack>
        <TextInputOverview lang={lang} />
      </Box>

      <DemoSection title={d.basic.title} code={basicCode}>
        <BasicDemo />
      </DemoSection>

      <DemoSection title={d.variants.title} description={d.variants.desc} code={variantsCode}>
        <VariantsDemo />
      </DemoSection>

      <DemoSection title={d.required.title} description={d.required.desc} code={requiredCode}>
        <RequiredDemo lang={lang} />
      </DemoSection>

      <DemoSection title={d.disabled.title} description={d.disabled.desc} code={disabledCode}>
        <DisabledDemo />
      </DemoSection>

      <DemoSection title={d.multiline.title} description={d.multiline.desc} code={multilineCode}>
        <MultilineDemo />
      </DemoSection>

      <DemoSection title={d.formatter.title} description={d.formatter.desc} code={formatterCode}>
        <FormatterDemo />
      </DemoSection>

      <DemoSection title={d.autoDirection.title} description={d.autoDirection.desc} code={autoDirectionCode}>
        <AutoDirectionDemo />
      </DemoSection>

      <DemoSection title={d.onChange.title} description={d.onChange.desc} code={onChangeCode}>
        <OnChangeDemo lang={lang} />
      </DemoSection>

      <DemoSection title={d.api.title} description={d.api.desc} code={apiCode}>
        <ApiDemo />
      </DemoSection>
    </Box>
  )
}

// ─── Export ──────────────────────────────────────────────────────────────────

export default function TextInputPage() {
  const { lang } = useLang()
  return <TextInputContent lang={lang} />
}
