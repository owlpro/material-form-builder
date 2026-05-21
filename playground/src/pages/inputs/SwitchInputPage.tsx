import { Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import FormBuilder, { useFormBuilder } from 'material-form-builder'
import { useState } from 'react'
import DemoSection from '../../components/DemoSection'
import { useLang } from '../../contexts/LangContext'

// ─── Translations ────────────────────────────────────────────────────────────

const t = {
  en: {
    pageTitle: 'Switch Input',
    overview: {
      howTitle: 'How does it work?',
      howBody: (
        <>
          <code>SwitchInput</code> wraps MUI <code>Switch</code>. When a <code>label</code>{' '}
          is provided it is additionally wrapped in <code>FormControlLabel</code>; without a
          label only the bare switch element is rendered. The value is always{' '}
          <code>boolean</code>.
        </>
      ),
      noteTitle: 'Key behaviors',
      notes: [
        ['boolean value',   'getValue() always returns true or false — never null. Default is false'],
        ['label optional',  'With label → wrapped in FormControlLabel. Without label → bare Switch element only'],
        ['required',        'Validation fails when value is false. Triggers a 3s red highlight on the switch'],
        ['defaultChecked',  'Initial on/off state on mount and the value clear() restores'],
        ['clear()',         'Resets to checked ?? defaultChecked ?? false'],
      ],
      exclusiveTitle: 'Exclusive props',
      exclusiveProps: [
        ['label',          'Optional text label. When provided, wraps the switch in FormControlLabel'],
        ['defaultChecked', 'Initial on/off state (default: false)'],
        ['size',           '"small" | "medium" — switch size'],
        ['color',          'MUI color when the switch is on'],
        ['disabled',       'Disables the switch'],
        ['onChangeValue',  'Callback with boolean value on every change'],
      ],
    },
    demos: {
      basic:      { title: 'Basic' },
      noLabel:    { title: 'With & without label',   desc: 'Without label, only the Switch element is rendered — no FormControlLabel wrapper.' },
      defaultVal: { title: 'defaultChecked',          desc: 'Set an initial on state on mount.' },
      sizes:      { title: 'Sizes & colors',           desc: 'size and color follow MUI Switch props.' },
      required:   { title: 'Required & Validation',    desc: 'required: true fails when the switch is off.' },
      api:        { title: 'API — getValues / setValues / clear', desc: 'getValue returns boolean, setValues accepts boolean.' },
    },
    submit: 'Submit',
    validMsg: (v: unknown) => `✓  value = ${JSON.stringify(v)}`,
    invalidMsg: '✗  validation failed',
  },
  fa: {
    pageTitle: 'Switch Input',
    overview: {
      howTitle: 'چطور کار می‌کنه؟',
      howBody: (
        <>
          <code>SwitchInput</code> یک <code>Switch</code> از MUI را wrap می‌کند. وقتی{' '}
          <code>label</code> داده شود، در <code>FormControlLabel</code> هم wrap می‌شود؛ بدون
          label فقط خود عنصر switch رندر می‌شود. مقدار همیشه <code>boolean</code> است.
        </>
      ),
      noteTitle: 'رفتارهای کلیدی',
      notes: [
        ['مقدار boolean',  'getValue() همیشه true یا false برمی‌گرداند — هیچوقت null. پیش‌فرض false است'],
        ['label اختیاری', 'با label → در FormControlLabel wrap می‌شود. بدون label → فقط خود Switch'],
        ['required',       'وقتی مقدار false باشد اعتبارسنجی fail می‌شود. ۳ ثانیه روی switch قرمز می‌ماند'],
        ['defaultChecked', 'حالت اولیه روشن/خاموش هنگام mount و مقداری که clear() برمی‌گرداند'],
        ['clear()',        'به checked ?? defaultChecked ?? false ریست می‌شود'],
      ],
      exclusiveTitle: 'Props اختصاصی',
      exclusiveProps: [
        ['label',          'برچسب متنی اختیاری. وقتی داده شود، switch را در FormControlLabel قرار می‌دهد'],
        ['defaultChecked', 'حالت اولیه روشن/خاموش (پیش‌فرض: false)'],
        ['size',           '"small" | "medium" — اندازه switch'],
        ['color',          'رنگ MUI وقتی switch روشن است'],
        ['disabled',       'switch را غیرفعال می‌کند'],
        ['onChangeValue',  'callback با مقدار boolean روی هر تغییر'],
      ],
    },
    demos: {
      basic:      { title: 'پایه' },
      noLabel:    { title: 'با و بدون برچسب',       desc: 'بدون label فقط عنصر Switch رندر می‌شود — بدون FormControlLabel.' },
      defaultVal: { title: 'defaultChecked',          desc: 'حالت اولیه روشن را هنگام mount تنظیم کن.' },
      sizes:      { title: 'اندازه‌ها و رنگ‌ها',   desc: 'size و color از props استاندارد MUI Switch پیروی می‌کنند.' },
      required:   { title: 'اجباری و اعتبارسنجی',  desc: 'required: true وقتی switch خاموش است خطا می‌دهد.' },
      api:        { title: 'API — getValues / setValues / clear', desc: 'getValue مقدار boolean برمی‌گرداند، setValues مقدار boolean می‌پذیرد.' },
    },
    submit: 'ارسال',
    validMsg: (v: unknown) => `✓  مقدار = ${JSON.stringify(v)}`,
    invalidMsg: '✗  اعتبارسنجی ناموفق',
  },
}

// ─── Overview ─────────────────────────────────────────────────────────────────

function SwitchInputOverview({ lang }: { lang: 'en' | 'fa' }) {
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
  type: 'switch',
  selector: 'darkMode',
  label: 'Dark mode',
}]}`

function BasicDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[{ type: 'switch', selector: 'darkMode', label: 'Dark mode' }]}
    />
  )
}

// ─── With & without label ─────────────────────────────────────────────────────

const noLabelCode = `// with label → FormControlLabel wraps the Switch
{ type: 'switch', selector: 'a', label: 'With label' }

// without label → bare Switch element only
{ type: 'switch', selector: 'b' }`

function NoLabelDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <FormBuilder ref={ref} inputs={[{ type: 'switch', selector: 'a', label: 'With label' }]} />
      <FormBuilder ref={ref} inputs={[{ type: 'switch', selector: 'b' }]} />
    </Stack>
  )
}

// ─── defaultChecked ───────────────────────────────────────────────────────────

const defaultValCode = `inputs={[
  { type: 'switch', selector: 'a', label: 'Off by default', defaultChecked: false },
  { type: 'switch', selector: 'b', label: 'On by default',  defaultChecked: true  },
]}`

function DefaultValDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[
        { type: 'switch', selector: 'a', label: 'Off by default', defaultChecked: false },
        { type: 'switch', selector: 'b', label: 'On by default',  defaultChecked: true  },
      ]}
    />
  )
}

// ─── Sizes & colors ───────────────────────────────────────────────────────────

const sizesCode = `inputs={[
  { type: 'switch', selector: 'a', label: 'Small',   size: 'small',  defaultChecked: true },
  { type: 'switch', selector: 'b', label: 'Medium',  size: 'medium', defaultChecked: true },  // default
  { type: 'switch', selector: 'c', label: 'Success', color: 'success', defaultChecked: true },
  { type: 'switch', selector: 'd', label: 'Warning', color: 'warning', defaultChecked: true },
]}`

function SizesDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[
        { type: 'switch', selector: 'a', label: 'Small (size: "small")',   size: 'small',  defaultChecked: true },
        { type: 'switch', selector: 'b', label: 'Medium (default)',          size: 'medium', defaultChecked: true },
        { type: 'switch', selector: 'c', label: 'Success color', color: 'success', defaultChecked: true },
        { type: 'switch', selector: 'd', label: 'Warning color', color: 'warning', defaultChecked: true },
      ]}
    />
  )
}

// ─── Required ─────────────────────────────────────────────────────────────────

const requiredCode = `inputs={[{
  type: 'switch',
  selector: 'termsAccepted',
  label: 'I have read and accept the terms',
  required: true,
}]}`

function RequiredDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref, getValues } = useFormBuilder<{ termsAccepted: boolean }>()
  const [result, setResult] = useState<string | null>(null)
  const T = t[lang]
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'switch',
          selector: 'termsAccepted',
          label: 'I have read and accept the terms',
          required: true,
        }]}
      />
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button variant="contained" size="small" onClick={() => {
          const { data, validation } = getValues()
          setResult(validation.status ? T.validMsg(data.termsAccepted) : T.invalidMsg)
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
  notifications: boolean
}>()

const { data } = getValues(false)
console.log(data.notifications)   // true | false

await setValues({ notifications: true })
await clear()                       // resets to defaultChecked ?? false`

function ApiDemo() {
  const { ref, getValues, setValues, clear } = useFormBuilder<{ notifications: boolean }>()
  const [output, setOutput] = useState<string | null>(null)
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'switch', selector: 'notifications', label: 'Enable notifications' }]}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Button size="small" variant="outlined" onClick={() =>
          setOutput(JSON.stringify(getValues(false).data, null, 2))
        }>getValues</Button>
        <Button size="small" variant="outlined" onClick={async () => {
          await setValues({ notifications: true })
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

function SwitchInputContent({ lang }: { lang: 'en' | 'fa' }) {
  const d = t[lang].demos
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t[lang].pageTitle}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          <Chip label='type: "switch"' size="small" variant="outlined" />
          <Chip label="value: boolean" size="small" variant="outlined" />
          <Chip label="label: optional" size="small" variant="outlined" />
          <Chip label="required → must be true" size="small" variant="outlined" />
        </Stack>
        <SwitchInputOverview lang={lang} />
      </Box>

      <DemoSection title={d.basic.title} code={basicCode}>
        <BasicDemo />
      </DemoSection>

      <DemoSection title={d.noLabel.title} description={d.noLabel.desc} code={noLabelCode}>
        <NoLabelDemo />
      </DemoSection>

      <DemoSection title={d.defaultVal.title} description={d.defaultVal.desc} code={defaultValCode}>
        <DefaultValDemo />
      </DemoSection>

      <DemoSection title={d.sizes.title} description={d.sizes.desc} code={sizesCode}>
        <SizesDemo />
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

export default function SwitchInputPage() {
  const { lang } = useLang()
  return <SwitchInputContent lang={lang} />
}
