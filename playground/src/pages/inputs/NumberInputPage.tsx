import { Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import FormBuilder, { useFormBuilder } from 'material-form-builder'
import { useState } from 'react'
import DemoSection from '../../components/DemoSection'
import { useLang } from '../../contexts/LangContext'

// ─── Translations ────────────────────────────────────────────────────────────

const t = {
  en: {
    pageTitle: 'Number Input',
    overview: {
      howTitle: 'How does it work?',
      howBody: (
        <>
          <code>NumberInput</code> renders the same MUI <code>TextField</code> as the Text input,
          but parses every keystroke with <code>parseInt</code> — so the value is always{' '}
          <code>number | null</code>, never a string. Decimal input is truncated by default.
          All MUI TextField props are passed through.
        </>
      ),
      diffTitle: 'Key differences from Text',
      diffBody: 'These behaviors are specific to NumberInput:',
      diffs: [
        ['value type',  'number | null — getValue() always returns a number or null, never a string'],
        ['onChange',    'Parses with parseInt(value, 10) before storing — decimals are discarded'],
        ['formatter',   'Receives number | null (already parsed), not a raw string'],
        ['0 is valid',  'Zero passes validation — only null/undefined triggers required error'],
        ['defaultValue','Accepts number | null (e.g. defaultValue: 0 sets the field to 0)'],
      ],
      exclusiveTitle: 'Exclusive props (beyond MUI)',
      exclusiveProps: [
        ['formatter',    'Runs after parseInt — transform or clamp the number, return undefined to discard'],
        ['defaultValue', 'Initial number on mount and after clear()'],
        ['selector',     'Unique key in getValues output — supports dot notation'],
        ['required',     'Marks invalid if value is null — 0 is treated as a valid value'],
        ['onChangeValue','Callback with the parsed number (or null) on every change'],
      ],
    },
    demos: {
      basic:        { title: 'Basic' },
      variants:     { title: 'Variants',            desc: 'Same MUI TextField variants as Text input.' },
      minMax:       { title: 'min / max / step',    desc: 'Pass min, max, and step via MUI inputProps. Browser enforces these on the native spinner but not on direct keyboard input — use formatter for strict enforcement.' },
      integerOnly:  { title: 'Integer only (parseInt)', desc: 'NumberInput always calls parseInt — typing 3.14 stores 3. To accept decimals you need a custom formatter that uses parseFloat.' },
      formatter:    { title: 'Formatter',           desc: 'formatter receives number | null (already parsed). Use it to clamp, transform, or reject values.' },
      textAlt:      { title: 'When to use Text + formatter instead', desc: 'Number input uses parseInt — no decimals, no display formatting. Switch to type: "text" with a formatter when you need decimals, currency symbols, or thousands separators.' },
      required:     { title: 'Required & Validation', desc: 'required: true fails only when value is null. Entering 0 is valid and passes validation.' },
      defaultValue: { title: 'Default Value',       desc: 'defaultValue sets the initial number. clear() resets back to it.' },
      api:          { title: 'API — getValues / setValues / clear', desc: 'getValues always returns number | null for this field.' },
    },
    submit: 'Submit',
    validMsg: (v: number | null) => `✓  value = ${v}`,
    invalidMsg: '✗  validation failed (null)',
    currentValue: 'Current value:',
    setTo42: 'Set to 42',
  },
  fa: {
    pageTitle: 'Number Input',
    overview: {
      howTitle: 'چطور کار می‌کنه؟',
      howBody: (
        <>
          <code>NumberInput</code> همان MUI <code>TextField</code> را رندر می‌کند — اما هر
          keystroke را با <code>parseInt</code> پردازش می‌کند، بنابراین مقدار همیشه{' '}
          <code>number | null</code> است، نه string. اعشار به‌طور پیش‌فرض حذف می‌شود.
          تمام MUI TextField props پاس می‌شوند.
        </>
      ),
      diffTitle: 'تفاوت‌های کلیدی با Text',
      diffBody: 'این رفتارها مختص NumberInput هستند:',
      diffs: [
        ['نوع مقدار',    'number | null — خروجی getValue() همیشه عدد یا null است، هرگز string'],
        ['onChange',     'با parseInt(value, 10) پردازش می‌کند — اعشار حذف می‌شود'],
        ['formatter',    'مقدار number | null دریافت می‌کند (از قبل parse شده)، نه string خام'],
        ['صفر معتبر است', 'عدد صفر اعتبارسنجی را رد می‌کند — فقط null/undefined خطا می‌دهد'],
        ['defaultValue', 'number | null می‌پذیرد (مثلاً defaultValue: 0 فیلد را روی صفر می‌گذارد)'],
      ],
      exclusiveTitle: 'Props اختصاصی (فراتر از MUI)',
      exclusiveProps: [
        ['formatter',    'بعد از parseInt اجرا می‌شود — عدد را تبدیل یا محدود کن، undefined برگردان تا تغییر لغو شود'],
        ['defaultValue', 'عدد اولیه هنگام mount و بعد از clear()'],
        ['selector',     'کلید یکتا در خروجی getValues — از dot notation پشتیبانی می‌کند'],
        ['required',     'فقط وقتی مقدار null است invalid می‌شود — 0 مقدار معتبری است'],
        ['onChangeValue', 'callback با عدد parse‌شده (یا null) روی هر تغییر'],
      ],
    },
    demos: {
      basic:        { title: 'پایه' },
      variants:     { title: 'حالت‌های نمایش',        desc: 'همان variant‌های MUI TextField.' },
      minMax:       { title: 'min / max / step',      desc: 'از طریق inputProps به MUI پاس می‌شوند. مرورگر اعمال می‌کند اما keyboard input را محدود نمی‌کند — برای اعمال سخت از formatter استفاده کن.' },
      integerOnly:  { title: 'فقط عدد صحیح (parseInt)', desc: 'NumberInput همیشه parseInt را صدا می‌زند — تایپ 3.14 مقدار 3 ذخیره می‌کند. برای اعشار باید formatter با parseFloat بسازی.' },
      formatter:    { title: 'فرمت‌کننده',              desc: 'formatter مقدار number | null دریافت می‌کند. برای محدودسازی، تبدیل، یا رد کردن مقادیر استفاده کن.' },
      textAlt:      { title: 'کِی از Text + formatter استفاده کنیم؟', desc: 'Number از parseInt استفاده می‌کند — اعشار ندارد، نمایش فرمت‌بندی‌شده ندارد. وقتی اعشار، نماد ارزی، یا جداکننده هزارگان نیاز داری، از type: "text" با formatter استفاده کن.' },
      required:     { title: 'اجباری و اعتبارسنجی',    desc: 'required: true فقط وقتی مقدار null است خطا می‌دهد. وارد کردن 0 معتبر است و خطا نمی‌دهد.' },
      defaultValue: { title: 'مقدار پیش‌فرض',          desc: 'defaultValue عدد اولیه را مشخص می‌کند. clear() آن را بازمی‌گرداند.' },
      api:          { title: 'API — getValues / setValues / clear', desc: 'getValues همیشه number | null برای این فیلد برمی‌گرداند.' },
    },
    submit: 'ارسال',
    validMsg: (v: number | null) => `✓  مقدار = ${v}`,
    invalidMsg: '✗  اعتبارسنجی ناموفق (null)',
    currentValue: 'مقدار جاری:',
    setTo42: 'ست کردن به ۴۲',
  },
}

// ─── Overview ────────────────────────────────────────────────────────────────

function NumberInputOverview({ lang }: { lang: 'en' | 'fa' }) {
  const ov = t[lang].overview
  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 4, bgcolor: '#f9fafb', borderColor: '#e0e0e0', borderRadius: 2 }}>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>{ov.howTitle}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{ov.howBody}</Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>{ov.diffTitle}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{ov.diffBody}</Typography>
      <Stack spacing={0.8} sx={{ mb: 2 }}>
        {ov.diffs.map(([name, desc]) => (
          <Box key={name} sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: '#fff3e0', color: '#e65100', px: 0.8, py: 0.2, borderRadius: 0.5, whiteSpace: 'nowrap', flexShrink: 0 }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">{desc}</Typography>
          </Box>
        ))}
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>{ov.exclusiveTitle}</Typography>
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

// ─── Basic ───────────────────────────────────────────────────────────────────

const basicCode = `<FormBuilder
  ref={ref}
  inputs={[{
    type: 'number',
    selector: 'count',
    label: 'Count',
  }]}
/>`

function BasicDemo() {
  const { ref } = useFormBuilder()
  return <FormBuilder ref={ref} inputs={[{ type: 'number', selector: 'count', label: 'Count' }]} />
}

// ─── Variants ────────────────────────────────────────────────────────────────

const variantsCode = `inputs={[
  { type: 'number', selector: 'a', label: 'Standard'  },
  { type: 'number', selector: 'b', label: 'Outlined', variant: 'outlined' },
  { type: 'number', selector: 'c', label: 'Filled',   variant: 'filled'   },
]}`

function VariantsDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack spacing={3}>
      <FormBuilder
        ref={ref}
        inputs={[
          { type: 'number', selector: 'a', label: 'Standard' },
          { type: 'number', selector: 'b', label: 'Outlined', variant: 'outlined' },
          { type: 'number', selector: 'c', label: 'Filled', variant: 'filled' },
        ]}
      />
    </Stack>
  )
}

// ─── min / max / step ────────────────────────────────────────────────────────

const minMaxCode = `inputs={[{
  type: 'number',
  selector: 'age',
  label: 'Age (1 – 120)',
  variant: 'outlined',
  inputProps: { min: 1, max: 120, step: 1 },
}]}`

function MinMaxDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[{
        type: 'number', selector: 'age', label: 'Age (1 – 120)',
        variant: 'outlined', inputProps: { min: 1, max: 120, step: 1 },
      }]}
    />
  )
}

// ─── Integer only ────────────────────────────────────────────────────────────

const integerCode = `// typing "3.14" → stored as 3
// typing "99.9" → stored as 99

inputs={[{
  type: 'number',
  selector: 'qty',
  label: 'Quantity',
  variant: 'outlined',
}]}

// To support decimals, use a formatter:
inputs={[{
  type: 'number',
  selector: 'price',
  label: 'Price',
  variant: 'outlined',
  formatter: (value) => {
    // formatter receives already-parseInt'd value
    // for decimals you need a text input + custom parsing
  },
}]}`

function IntegerDemo() {
  const { ref } = useFormBuilder<{ qty: number | null }>()
  const [val, setVal] = useState<number | null>(null)
  return (
    <Stack spacing={1.5}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'number', selector: 'qty', label: 'Quantity — try typing 3.14',
          variant: 'outlined', onChangeValue: setVal,
        }]}
      />
      <Typography variant="body2" color="text.secondary">
        Stored value: <strong>{val ?? 'null'}</strong>
        {val !== null && ' (decimal truncated)'}
      </Typography>
    </Stack>
  )
}

// ─── Formatter ───────────────────────────────────────────────────────────────

const formatterCode = `// Clamp to 0–100
inputs={[{
  type: 'number',
  selector: 'percent',
  label: 'Percent (0 – 100)',
  variant: 'outlined',
  formatter: (value) => {
    if (value === null) return null
    return Math.min(100, Math.max(0, value))
  },
}]}`

function FormatterDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[{
        type: 'number', selector: 'percent', label: 'Percent (0 – 100)',
        variant: 'outlined',
        formatter: (value: number | null) => {
          if (value === null) return null
          return Math.min(100, Math.max(0, value))
        },
      }]}
    />
  )
}

// ─── Text + formatter alternative ───────────────────────────────────────────

const textAltCode = `// ❌ number input — no decimals, no display formatting
{ type: 'number', selector: 'price', label: 'Price' }
// getValue() → 1234  (raw integer only)

// ✅ text + formatter — decimal, thousands separator, currency
{
  type: 'text',
  selector: 'price',
  label: 'Price (USD)',
  variant: 'outlined',
  inputProps: { inputMode: 'decimal' },
  formatter: (value) => {
    const digits = value.replace(/[^0-9.]/g, '')
    const parts = digits.split('.')
    const integer = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')
    return parts.length > 1 ? integer + '.' + parts[1].slice(0, 2) : integer
  },
  getMutator: (value) => parseFloat((value ?? '').replace(/,/g, '')) || null,
}
// getValue()   → "1,234.56"  (formatted string for display)
// getValues()  → { price: 1234.56 }  (getMutator strips commas → float)`

function TextAltDemo() {
  const { ref, getValues } = useFormBuilder()
  const [output, setOutput] = useState<string | null>(null)

  const thousandsFormatter = (value: string) => {
    const digits = value.replace(/[^0-9.]/g, '')
    const parts = digits.split('.')
    const integer = (parts[0] ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.length > 1 ? integer + '.' + (parts[1] ?? '').slice(0, 2) : integer
  }

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[
          {
            type: 'text', selector: 'price', label: 'Price (USD) — e.g. 1234.56',
            variant: 'outlined', inputProps: { inputMode: 'decimal' },
            formatter: thousandsFormatter,
            getMutator: (v: string | null) => parseFloat((v ?? '').replace(/,/g, '')) || null,
          },
          {
            type: 'text', selector: 'decimal', label: 'Decimal — e.g. 3.14',
            variant: 'outlined', inputProps: { inputMode: 'decimal' },
            formatter: (v: string) => v.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'),
            getMutator: (v: string | null) => parseFloat(v ?? '') || null,
          },
          {
            type: 'text', selector: 'negative', label: 'Allows negative — e.g. -42.5',
            variant: 'outlined', inputProps: { inputMode: 'decimal' },
            formatter: (v: string) => v.replace(/[^0-9.\-]/g, '').replace(/(\..*)\./g, '$1'),
            getMutator: (v: string | null) => parseFloat(v ?? '') || null,
          },
        ]}
      />
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Button size="small" variant="outlined" onClick={() => {
          setOutput(JSON.stringify(getValues(false).data, null, 2))
        }}>
          getValues (after getMutator)
        </Button>
      </Box>
      {output && (
        <Box component="pre" sx={{ m: 0, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 1, fontSize: '0.8rem', fontFamily: 'monospace' }}>
          {output}
        </Box>
      )}
    </Stack>
  )
}

// ─── Required ────────────────────────────────────────────────────────────────

const requiredCode = `// 0 is valid — only null triggers the error
inputs={[{
  type: 'number',
  selector: 'score',
  label: 'Score',
  required: true,
  variant: 'outlined',
}]}`

function RequiredDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref, getValues } = useFormBuilder<{ score: number | null }>()
  const [result, setResult] = useState<string | null>(null)
  const T = t[lang]

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'number', selector: 'score', label: 'Score',
          required: true, variant: 'outlined',
        }]}
      />
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button variant="contained" size="small" onClick={() => {
          const { data, validation } = getValues()
          setResult(validation.status ? T.validMsg(data.score) : T.invalidMsg)
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

// ─── Default Value ───────────────────────────────────────────────────────────

const defaultValueCode = `inputs={[
  { type: 'number', selector: 'a', label: 'defaultValue: 10',  defaultValue: 10,  variant: 'outlined' },
  { type: 'number', selector: 'b', label: 'defaultValue: 0',   defaultValue: 0,   variant: 'outlined' },
  { type: 'number', selector: 'c', label: 'defaultValue: null (empty)', variant: 'outlined' },
]}`

function DefaultValueDemo() {
  const { ref, clear } = useFormBuilder()
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[
          { type: 'number', selector: 'a', label: 'defaultValue: 10', defaultValue: 10, variant: 'outlined' },
          { type: 'number', selector: 'b', label: 'defaultValue: 0', defaultValue: 0, variant: 'outlined' },
          { type: 'number', selector: 'c', label: 'defaultValue: null (empty)', variant: 'outlined' },
        ]}
      />
      <Box>
        <Button size="small" variant="outlined" onClick={() => clear()}>
          clear() — resets to defaultValues
        </Button>
      </Box>
    </Stack>
  )
}

// ─── API ─────────────────────────────────────────────────────────────────────

const apiCode = `const { ref, getValues, setValues, clear } = useFormBuilder<{
  amount: number | null
}>()

const { data } = getValues(false)
console.log(data.amount)  // number | null

await setValues({ amount: 42 })
await clear()              // resets to defaultValue`

function ApiDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref, getValues, setValues, clear } = useFormBuilder<{ amount: number | null }>()
  const [output, setOutput] = useState<string | null>(null)
  const T = t[lang]

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'number', selector: 'amount', label: 'Amount', variant: 'outlined' }]}
      />
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" onClick={() => {
          setOutput(JSON.stringify(getValues(false).data, null, 2))
        }}>getValues</Button>
        <Button size="small" variant="outlined" onClick={async () => {
          await setValues({ amount: 42 })
          setOutput(null)
        }}>{T.setTo42}</Button>
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

// ─── Page content ─────────────────────────────────────────────────────────────

function NumberInputContent({ lang }: { lang: 'en' | 'fa' }) {
  const d = t[lang].demos
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t[lang].pageTitle}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          <Chip label='type: "number"' size="small" variant="outlined" />
          <Chip label="value: number | null" size="small" variant="outlined" />
          <Chip label="parseInt on change" size="small" variant="outlined" color="warning" />
        </Stack>
        <NumberInputOverview lang={lang} />
      </Box>

      <DemoSection title={d.basic.title} code={basicCode}>
        <BasicDemo />
      </DemoSection>

      <DemoSection title={d.variants.title} description={d.variants.desc} code={variantsCode}>
        <VariantsDemo />
      </DemoSection>

      <DemoSection title={d.minMax.title} description={d.minMax.desc} code={minMaxCode}>
        <MinMaxDemo />
      </DemoSection>

      <DemoSection title={d.integerOnly.title} description={d.integerOnly.desc} code={integerCode}>
        <IntegerDemo />
      </DemoSection>

      <DemoSection title={d.formatter.title} description={d.formatter.desc} code={formatterCode}>
        <FormatterDemo />
      </DemoSection>

      <DemoSection title={d.textAlt.title} description={d.textAlt.desc} code={textAltCode}>
        <TextAltDemo />
      </DemoSection>

      <DemoSection title={d.required.title} description={d.required.desc} code={requiredCode}>
        <RequiredDemo lang={lang} />
      </DemoSection>

      <DemoSection title={d.defaultValue.title} description={d.defaultValue.desc} code={defaultValueCode}>
        <DefaultValueDemo />
      </DemoSection>

      <DemoSection title={d.api.title} description={d.api.desc} code={apiCode}>
        <ApiDemo lang={lang} />
      </DemoSection>
    </Box>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function NumberInputPage() {
  const { lang } = useLang()
  return <NumberInputContent lang={lang} />
}
