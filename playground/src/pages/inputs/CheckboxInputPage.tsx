import { Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import FormBuilder, { useFormBuilder } from 'material-form-builder'
import { useState } from 'react'
import DemoSection from '../../components/DemoSection'
import { useLang } from '../../contexts/LangContext'

// ─── Translations ────────────────────────────────────────────────────────────

const t = {
  en: {
    pageTitle: 'Checkbox Input',
    overview: {
      howTitle: 'How does it work?',
      howBody: (
        <>
          <code>CheckboxInput</code> wraps MUI <code>FormControlLabel</code> +{' '}
          <code>Checkbox</code>. The value is always <code>boolean</code> — <code>true</code>{' '}
          when checked, <code>false</code> otherwise. The label automatically appends{' '}
          <code> *</code> when <code>required: true</code>.
        </>
      ),
      noteTitle: 'Key behaviors',
      notes: [
        ['boolean value',   'getValue() always returns true or false — never null. Default is false'],
        ['required',        'Validation fails when value is false. Triggers a 3s red highlight on the checkbox icon'],
        ['defaultChecked',  'Initial checked state on mount and the value clear() restores'],
        ['clear()',         'Resets to checked || defaultChecked || false'],
        ['label *',         'The label string automatically gets " *" appended when required: true'],
      ],
      exclusiveTitle: 'Exclusive props',
      exclusiveProps: [
        ['label',          'Text shown next to the checkbox. Appends " *" when required'],
        ['defaultChecked', 'Initial checked state (default: false)'],
        ['size',           '"small" | "medium" — checkbox size'],
        ['color',          'MUI color applied to the checkbox when checked'],
        ['disabled',       'Disables the checkbox'],
        ['onChangeValue',  'Callback with boolean value on every change'],
      ],
    },
    demos: {
      basic:      { title: 'Basic' },
      defaultVal: { title: 'defaultChecked',        desc: 'Set an initial checked state on mount.' },
      sizes:      { title: 'Sizes & colors',         desc: 'size and color follow MUI Checkbox props.' },
      disabled:   { title: 'Disabled',               desc: 'disabled: true prevents interaction.' },
      required:   { title: 'Required & Validation',  desc: 'required: true fails when the checkbox is unchecked.' },
      api:        { title: 'API — getValues / setValues / clear', desc: 'getValue returns boolean, setValues accepts boolean.' },
    },
    submit: 'Submit',
    validMsg: (v: unknown) => `✓  value = ${JSON.stringify(v)}`,
    invalidMsg: '✗  validation failed',
  },
  fa: {
    pageTitle: 'Checkbox Input',
    overview: {
      howTitle: 'چطور کار می‌کنه؟',
      howBody: (
        <>
          <code>CheckboxInput</code> یک <code>FormControlLabel</code> +{' '}
          <code>Checkbox</code> از MUI را wrap می‌کند. مقدار همیشه <code>boolean</code> است —{' '}
          <code>true</code> وقتی تیک خورده، <code>false</code> در غیر این صورت. برچسب وقتی{' '}
          <code>required: true</code> باشد به صورت خودکار <code> *</code> اضافه می‌کند.
        </>
      ),
      noteTitle: 'رفتارهای کلیدی',
      notes: [
        ['مقدار boolean',  'getValue() همیشه true یا false برمی‌گرداند — هیچوقت null. پیش‌فرض false است'],
        ['required',       'وقتی مقدار false باشد اعتبارسنجی fail می‌شود. ۳ ثانیه آیکون checkbox قرمز می‌ماند'],
        ['defaultChecked', 'حالت اولیه تیک هنگام mount و مقداری که clear() برمی‌گرداند'],
        ['clear()',        'به checked || defaultChecked || false ریست می‌شود'],
        ['برچسب *',        'وقتی required: true باشد، " *" به انتهای رشته label اضافه می‌شود'],
      ],
      exclusiveTitle: 'Props اختصاصی',
      exclusiveProps: [
        ['label',          'متنی که کنار checkbox نمایش داده می‌شود. وقتی required باشد " *" اضافه می‌کند'],
        ['defaultChecked', 'حالت اولیه تیک (پیش‌فرض: false)'],
        ['size',           '"small" | "medium" — اندازه checkbox'],
        ['color',          'رنگ MUI برای checkbox وقتی تیک خورده'],
        ['disabled',       'checkbox را غیرفعال می‌کند'],
        ['onChangeValue',  'callback با مقدار boolean روی هر تغییر'],
      ],
    },
    demos: {
      basic:      { title: 'پایه' },
      defaultVal: { title: 'defaultChecked',          desc: 'حالت اولیه تیک را هنگام mount تنظیم کن.' },
      sizes:      { title: 'اندازه‌ها و رنگ‌ها',    desc: 'size و color از props استاندارد MUI Checkbox پیروی می‌کنند.' },
      disabled:   { title: 'غیرفعال',                desc: 'disabled: true از تعامل جلوگیری می‌کند.' },
      required:   { title: 'اجباری و اعتبارسنجی',   desc: 'required: true وقتی checkbox تیک نخورده خطا می‌دهد.' },
      api:        { title: 'API — getValues / setValues / clear', desc: 'getValue مقدار boolean برمی‌گرداند، setValues مقدار boolean می‌پذیرد.' },
    },
    submit: 'ارسال',
    validMsg: (v: unknown) => `✓  مقدار = ${JSON.stringify(v)}`,
    invalidMsg: '✗  اعتبارسنجی ناموفق',
  },
}

// ─── Overview ─────────────────────────────────────────────────────────────────

function CheckboxInputOverview({ lang }: { lang: 'en' | 'fa' }) {
  const ov = t[lang].overview
  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 4, bgcolor: '#f9fafb', borderColor: '#e0e0e0', borderRadius: 2 }}>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>{ov.howTitle}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{ov.howBody}</Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>{ov.noteTitle}</Typography>
      <Stack spacing={0.8} sx={{ mb: 2 }}>
        {ov.notes.map(([name, desc]) => (
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

// ─── Basic ────────────────────────────────────────────────────────────────────

const basicCode = `inputs={[{
  type: 'checkbox',
  selector: 'agree',
  label: 'I agree to the terms',
}]}`

function BasicDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[{ type: 'checkbox', selector: 'agree', label: 'I agree to the terms' }]}
    />
  )
}

// ─── defaultChecked ───────────────────────────────────────────────────────────

const defaultValCode = `inputs={[
  { type: 'checkbox', selector: 'a', label: 'Unchecked (default)', defaultChecked: false },
  { type: 'checkbox', selector: 'b', label: 'Checked by default',  defaultChecked: true  },
]}`

function DefaultValDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[
        { type: 'checkbox', selector: 'a', label: 'Unchecked (default)', defaultChecked: false },
        { type: 'checkbox', selector: 'b', label: 'Checked by default',  defaultChecked: true  },
      ]}
    />
  )
}

// ─── Sizes & colors ───────────────────────────────────────────────────────────

const sizesCode = `inputs={[
  { type: 'checkbox', selector: 'a', label: 'Small',   size: 'small'  },
  { type: 'checkbox', selector: 'b', label: 'Medium',  size: 'medium' },  // default
  { type: 'checkbox', selector: 'c', label: 'Success', color: 'success', defaultChecked: true },
  { type: 'checkbox', selector: 'd', label: 'Error',   color: 'error',   defaultChecked: true },
]}`

function SizesDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[
        { type: 'checkbox', selector: 'a', label: 'Small (size: "small")',  size: 'small'  },
        { type: 'checkbox', selector: 'b', label: 'Medium (default)',        size: 'medium' },
        { type: 'checkbox', selector: 'c', label: 'Success color', color: 'success', defaultChecked: true },
        { type: 'checkbox', selector: 'd', label: 'Error color',   color: 'error',   defaultChecked: true },
      ]}
    />
  )
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

const disabledCode = `inputs={[
  { type: 'checkbox', selector: 'a', label: 'Disabled unchecked', disabled: true },
  { type: 'checkbox', selector: 'b', label: 'Disabled checked',   disabled: true, defaultChecked: true },
]}`

function DisabledDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[
        { type: 'checkbox', selector: 'a', label: 'Disabled unchecked', disabled: true },
        { type: 'checkbox', selector: 'b', label: 'Disabled checked',   disabled: true, defaultChecked: true },
      ]}
    />
  )
}

// ─── Required ─────────────────────────────────────────────────────────────────

const requiredCode = `inputs={[{
  type: 'checkbox',
  selector: 'agree',
  label: 'I accept the terms and conditions',
  required: true,
}]}`

function RequiredDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref, getValues } = useFormBuilder<{ agree: boolean }>()
  const [result, setResult] = useState<string | null>(null)
  const T = t[lang]
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'checkbox',
          selector: 'agree',
          label: 'I accept the terms and conditions',
          required: true,
        }]}
      />
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button variant="contained" size="small" onClick={() => {
          const { data, validation } = getValues()
          setResult(validation.status ? T.validMsg(data.agree) : T.invalidMsg)
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

// ─── API ──────────────────────────────────────────────────────────────────────

const apiCode = `const { ref, getValues, setValues, clear } = useFormBuilder<{
  subscribe: boolean
}>()

const { data } = getValues(false)
console.log(data.subscribe)   // true | false

await setValues({ subscribe: true })
await clear()                  // resets to defaultChecked || false`

function ApiDemo() {
  const { ref, getValues, setValues, clear } = useFormBuilder<{ subscribe: boolean }>()
  const [output, setOutput] = useState<string | null>(null)
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'checkbox', selector: 'subscribe', label: 'Subscribe to newsletter' }]}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Button size="small" variant="outlined" onClick={() =>
          setOutput(JSON.stringify(getValues(false).data, null, 2))
        }>getValues</Button>
        <Button size="small" variant="outlined" onClick={async () => {
          await setValues({ subscribe: true })
          setOutput(null)
        }}>setValues(true)</Button>
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

function CheckboxInputContent({ lang }: { lang: 'en' | 'fa' }) {
  const d = t[lang].demos
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t[lang].pageTitle}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          <Chip label='type: "checkbox"' size="small" variant="outlined" />
          <Chip label="value: boolean" size="small" variant="outlined" />
          <Chip label="required → must be true" size="small" variant="outlined" />
        </Stack>
        <CheckboxInputOverview lang={lang} />
      </Box>

      <DemoSection title={d.basic.title} code={basicCode}>
        <BasicDemo />
      </DemoSection>

      <DemoSection title={d.defaultVal.title} description={d.defaultVal.desc} code={defaultValCode}>
        <DefaultValDemo />
      </DemoSection>

      <DemoSection title={d.sizes.title} description={d.sizes.desc} code={sizesCode}>
        <SizesDemo />
      </DemoSection>

      <DemoSection title={d.disabled.title} description={d.disabled.desc} code={disabledCode}>
        <DisabledDemo />
      </DemoSection>

      <DemoSection title={d.required.title} description={d.required.desc} code={requiredCode}>
        <RequiredDemo lang={lang} />
      </DemoSection>

      <DemoSection title={d.api.title} description={d.api.desc} code={apiCode}>
        <ApiDemo />
      </DemoSection>
    </Box>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function CheckboxInputPage() {
  const { lang } = useLang()
  return <CheckboxInputContent lang={lang} />
}
