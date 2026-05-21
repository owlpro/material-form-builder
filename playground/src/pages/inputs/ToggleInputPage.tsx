import { Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import FormBuilder, { useFormBuilder } from 'material-form-builder'
import { useState } from 'react'
import DemoSection from '../../components/DemoSection'
import { useLang } from '../../contexts/LangContext'

// ─── Translations ────────────────────────────────────────────────────────────

const t = {
  en: {
    pageTitle: 'Toggle Input',
    overview: {
      howTitle: 'How does it work?',
      howBody: (
        <>
          <code>ToggleInput</code> wraps MUI <code>ToggleButtonGroup</code> with{' '}
          <code>ToggleButton</code> items. Options are passed as{' '}
          <code>{'{ label, value }'}</code> pairs. By default the group is{' '}
          <strong>exclusive</strong> (single selection) — set <code>exclusive: false</code> for
          multi-select, in which case the value becomes a <code>string[]</code>.
        </>
      ),
      noteTitle: 'Key behaviors',
      notes: [
        ['exclusive (default true)',  'Single-select mode — value is string | null. Clicking the active button deselects it (value → null) unless enforceValueSet is true'],
        ['exclusive: false',          'Multi-select mode — value is string[]. Clicking an active button removes it from the array'],
        ['enforceValueSet',           'Prevents deselecting all buttons — clicking the active selection is a no-op and the current value is kept'],
        ['required',                  'Fails validation when value is null (exclusive) or empty array (multi). Triggers a 3s red flash on the buttons'],
        ['label prop',                'Declared in types but NOT rendered — use a Typography above the FormBuilder to label the group'],
      ],
      exclusiveTitle: 'Exclusive props',
      exclusiveProps: [
        ['options',          'Required. Array of { label: string | ReactNode, value: any }'],
        ['exclusive',        'true (default) = single selection, false = multi-selection'],
        ['enforceValueSet',  'Prevents deselecting all — keeps the current value when clicking the active button'],
        ['defaultValue',     'Initial value on mount and after clear()'],
        ['color',            'MUI color for the active button (default: "primary")'],
        ['size',             '"small" | "medium" | "large" — button size'],
        ['orientation',      '"horizontal" (default) | "vertical"'],
        ['onChangeValue',    'Callback with the new value on every change'],
      ],
    },
    demos: {
      basic:        { title: 'Basic' },
      multiSelect:  { title: 'Multi-select',          desc: 'Set exclusive: false to allow multiple values. getValue() returns a string[].' },
      enforceValue: { title: 'Enforce selection',     desc: 'enforceValueSet: true prevents deselecting all — the user must always have one value active.' },
      sizes:        { title: 'Sizes & orientation',   desc: 'size controls button height; orientation: "vertical" stacks buttons.' },
      required:     { title: 'Required & Validation', desc: 'required: true fails when nothing is selected.' },
      api:          { title: 'API — getValues / setValues / clear', desc: 'setValues expects the exact value (string for exclusive, string[] for multi).' },
    },
    submit: 'Submit',
    validMsg: (v: unknown) => `✓  value = ${JSON.stringify(v)}`,
    invalidMsg: '✗  validation failed',
  },
  fa: {
    pageTitle: 'Toggle Input',
    overview: {
      howTitle: 'چطور کار می‌کنه؟',
      howBody: (
        <>
          <code>ToggleInput</code> یک <code>ToggleButtonGroup</code> از MUI را با آیتم‌های{' '}
          <code>ToggleButton</code> wrap می‌کند. گزینه‌ها به صورت{' '}
          <code>{'{ label, value }'}</code> پاس می‌شوند. به صورت پیش‌فرض گروه{' '}
          <strong>exclusive</strong> است (تک‌انتخابی) — برای چندانتخابی{' '}
          <code>exclusive: false</code> بگذار؛ در آن صورت مقدار <code>string[]</code> می‌شود.
        </>
      ),
      noteTitle: 'رفتارهای کلیدی',
      notes: [
        ['exclusive (پیش‌فرض true)',  'حالت تک‌انتخابی — مقدار string | null است. کلیک روی دکمه فعال آن را deselect می‌کند (null) مگر enforceValueSet فعال باشد'],
        ['exclusive: false',          'حالت چندانتخابی — مقدار string[] است. کلیک روی دکمه فعال آن را از آرایه حذف می‌کند'],
        ['enforceValueSet',           'جلوگیری از deselect کردن همه دکمه‌ها — کلیک روی انتخاب فعلی بی‌اثر است و مقدار حفظ می‌شود'],
        ['required',                  'وقتی مقدار null (حالت exclusive) یا آرایه خالی (multi) باشد اعتبارسنجی fail می‌شود. ۳ ثانیه قرمز می‌ماند'],
        ['prop label',                'در types تعریف شده ولی رندر نمی‌شود — برای برچسب از Typography بالای FormBuilder استفاده کن'],
      ],
      exclusiveTitle: 'Props اختصاصی',
      exclusiveProps: [
        ['options',         'اجباری. آرایه‌ای از { label: string | ReactNode, value: any }'],
        ['exclusive',       'true (پیش‌فرض) = تک‌انتخابی، false = چندانتخابی'],
        ['enforceValueSet', 'جلوگیری از deselect کردن همه — مقدار جاری حفظ می‌شود'],
        ['defaultValue',    'مقدار اولیه هنگام mount و بعد از clear()'],
        ['color',           'رنگ MUI برای دکمه فعال (پیش‌فرض: "primary")'],
        ['size',            '"small" | "medium" | "large" — اندازه دکمه'],
        ['orientation',     '"horizontal" (پیش‌فرض) | "vertical"'],
        ['onChangeValue',   'callback با مقدار جدید روی هر تغییر'],
      ],
    },
    demos: {
      basic:        { title: 'پایه' },
      multiSelect:  { title: 'چندانتخابی',           desc: 'با exclusive: false می‌توان چند مقدار انتخاب کرد. getValue() آرایه برمی‌گرداند.' },
      enforceValue: { title: 'اجبار به انتخاب',      desc: 'enforceValueSet: true جلوگیری می‌کند از deselect کردن همه — کاربر باید همیشه یک مقدار فعال داشته باشد.' },
      sizes:        { title: 'اندازه‌ها و جهت',      desc: 'size ارتفاع دکمه را کنترل می‌کند؛ orientation: "vertical" دکمه‌ها را عمودی می‌چیند.' },
      required:     { title: 'اجباری و اعتبارسنجی',  desc: 'required: true وقتی هیچ چیز انتخاب نشده خطا می‌دهد.' },
      api:          { title: 'API — getValues / setValues / clear', desc: 'setValues مقدار دقیق (string برای exclusive، string[] برای multi) انتظار دارد.' },
    },
    submit: 'ارسال',
    validMsg: (v: unknown) => `✓  مقدار = ${JSON.stringify(v)}`,
    invalidMsg: '✗  اعتبارسنجی ناموفق',
  },
}

const ALIGN_OPTIONS = [
  { label: 'Left',   value: 'left'   },
  { label: 'Center', value: 'center' },
  { label: 'Right',  value: 'right'  },
]

const DAY_OPTIONS = [
  { label: 'Mon', value: 'mon' },
  { label: 'Tue', value: 'tue' },
  { label: 'Wed', value: 'wed' },
  { label: 'Thu', value: 'thu' },
  { label: 'Fri', value: 'fri' },
]

const SIZE_OPTIONS = [
  { label: 'Small',  value: 'small'  },
  { label: 'Medium', value: 'medium' },
  { label: 'Large',  value: 'large'  },
]

// ─── Overview ─────────────────────────────────────────────────────────────────

function ToggleInputOverview({ lang }: { lang: 'en' | 'fa' }) {
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
  type: 'toggle',
  selector: 'alignment',
  options: [
    { label: 'Left',   value: 'left'   },
    { label: 'Center', value: 'center' },
    { label: 'Right',  value: 'right'  },
  ],
}]}`

function BasicDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[{ type: 'toggle', selector: 'alignment', options: ALIGN_OPTIONS }]}
    />
  )
}

// ─── Multi-select ─────────────────────────────────────────────────────────────

const multiSelectCode = `inputs={[{
  type: 'toggle',
  selector: 'days',
  exclusive: false,   // multi-select
  options: [
    { label: 'Mon', value: 'mon' },
    { label: 'Tue', value: 'tue' },
    { label: 'Wed', value: 'wed' },
    { label: 'Thu', value: 'thu' },
    { label: 'Fri', value: 'fri' },
  ],
}]}

// getValue() → ['mon', 'wed', 'fri']  (string[])`

function MultiSelectDemo() {
  const { ref, getValues } = useFormBuilder<{ days: string[] | null }>()
  const [output, setOutput] = useState<string | null>(null)
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'toggle', selector: 'days', exclusive: false, options: DAY_OPTIONS }]}
      />
      <Button size="small" variant="outlined" sx={{ alignSelf: 'flex-start' }} onClick={() =>
        setOutput(JSON.stringify(getValues(false).data, null, 2))
      }>
        getValues
      </Button>
      {output && (
        <Box component="pre" sx={{ m: 0, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 1, fontSize: '0.8rem', fontFamily: 'monospace' }}>
          {output}
        </Box>
      )}
    </Stack>
  )
}

// ─── Enforce selection ────────────────────────────────────────────────────────

const enforceValueCode = `inputs={[{
  type: 'toggle',
  selector: 'size',
  enforceValueSet: true,   // can't deselect
  defaultValue: 'medium',  // start with a value
  options: [
    { label: 'Small',  value: 'small'  },
    { label: 'Medium', value: 'medium' },
    { label: 'Large',  value: 'large'  },
  ],
}]}`

function EnforceValueDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[{
        type: 'toggle',
        selector: 'size',
        enforceValueSet: true,
        defaultValue: 'medium',
        options: SIZE_OPTIONS,
      }]}
    />
  )
}

// ─── Sizes & orientation ──────────────────────────────────────────────────────

const sizesCode = `// small
{ type: 'toggle', selector: 'a', size: 'small',  options }
// medium (default)
{ type: 'toggle', selector: 'b', size: 'medium', options }
// large
{ type: 'toggle', selector: 'c', size: 'large',  options }

// vertical
{ type: 'toggle', selector: 'd', orientation: 'vertical', options }`

function SizesDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" useFlexGap>
        <FormBuilder ref={ref} inputs={[{ type: 'toggle', selector: 'a', size: 'small',  options: ALIGN_OPTIONS }]} />
        <FormBuilder ref={ref} inputs={[{ type: 'toggle', selector: 'b', size: 'medium', options: ALIGN_OPTIONS }]} />
        <FormBuilder ref={ref} inputs={[{ type: 'toggle', selector: 'c', size: 'large',  options: ALIGN_OPTIONS }]} />
      </Stack>
      <FormBuilder ref={ref} inputs={[{ type: 'toggle', selector: 'd', orientation: 'vertical', options: ALIGN_OPTIONS }]} />
    </Stack>
  )
}

// ─── Required ─────────────────────────────────────────────────────────────────

const requiredCode = `inputs={[{
  type: 'toggle',
  selector: 'alignment',
  required: true,
  options: [
    { label: 'Left',   value: 'left'   },
    { label: 'Center', value: 'center' },
    { label: 'Right',  value: 'right'  },
  ],
}]}`

function RequiredDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref, getValues } = useFormBuilder<{ alignment: string | null }>()
  const [result, setResult] = useState<string | null>(null)
  const T = t[lang]
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'toggle', selector: 'alignment', required: true, options: ALIGN_OPTIONS }]}
      />
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button variant="contained" size="small" onClick={() => {
          const { data, validation } = getValues()
          setResult(validation.status ? T.validMsg(data.alignment) : T.invalidMsg)
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
  alignment: string | null
}>()

// read current value
const { data } = getValues(false)
console.log(data.alignment)   // 'left' | 'center' | 'right' | null

// set programmatically — must match an option value
await setValues({ alignment: 'center' })

// reset to defaultValue (or null)
await clear()`

function ApiDemo() {
  const { ref, getValues, setValues, clear } = useFormBuilder<{ alignment: string | null }>()
  const [output, setOutput] = useState<string | null>(null)
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'toggle', selector: 'alignment', options: ALIGN_OPTIONS }]}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Button size="small" variant="outlined" onClick={() =>
          setOutput(JSON.stringify(getValues(false).data, null, 2))
        }>getValues</Button>
        <Button size="small" variant="outlined" onClick={async () => {
          await setValues({ alignment: 'center' })
          setOutput(null)
        }}>setValues('center')</Button>
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

function ToggleInputContent({ lang }: { lang: 'en' | 'fa' }) {
  const d = t[lang].demos
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t[lang].pageTitle}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          <Chip label='type: "toggle"' size="small" variant="outlined" />
          <Chip label="value: string | string[] | null" size="small" variant="outlined" />
          <Chip label="options: required" size="small" variant="outlined" color="warning" />
          <Chip label="exclusive: true by default" size="small" variant="outlined" />
        </Stack>
        <ToggleInputOverview lang={lang} />
      </Box>

      <DemoSection title={d.basic.title} code={basicCode}>
        <BasicDemo />
      </DemoSection>

      <DemoSection title={d.multiSelect.title} description={d.multiSelect.desc} code={multiSelectCode}>
        <MultiSelectDemo />
      </DemoSection>

      <DemoSection title={d.enforceValue.title} description={d.enforceValue.desc} code={enforceValueCode}>
        <EnforceValueDemo />
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

export default function ToggleInputPage() {
  const { lang } = useLang()
  return <ToggleInputContent lang={lang} />
}
