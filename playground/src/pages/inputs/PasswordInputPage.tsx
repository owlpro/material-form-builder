import { Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import FormBuilder, { useFormBuilder } from 'material-form-builder'
import { useState } from 'react'
import DemoSection from '../../components/DemoSection'
import { useLang } from '../../contexts/LangContext'

// ─── Translations ────────────────────────────────────────────────────────────

const t = {
  en: {
    pageTitle: 'Password Input',
    overview: {
      howTitle: 'How does it work?',
      howBody: (
        <>
          <code>PasswordInput</code> is a MUI <code>TextField</code> locked to{' '}
          <code>type="password"</code>, with a built-in show/hide toggle button as an{' '}
          <code>endAdornment</code>. It manages its own visibility state internally — no extra
          props needed. Value type is <code>string | null</code>, identical to Text input.
        </>
      ),
      noteTitle: 'Things to know',
      noteBody: 'Behaviors that differ from the Text input:',
      notes: [
        ['Fixed width',    'Has a hardcoded width per variant (207 / 235 / 231 px) unless fullWidth: true is set'],
        ['show/hide toggle', 'Always rendered as a built-in endAdornment — cannot be removed via props'],
        ['no autoDirection', 'Direction detection is not available (passwords are always LTR)'],
        ['formatter',      'Receives string | null — same as Text. Useful for removing spaces or restricting characters'],
      ],
      exclusiveTitle: 'Exclusive props (beyond MUI)',
      exclusiveProps: [
        ['defaultValue',  'Initial password string on mount and after clear()'],
        ['formatter',     'Runs on every keystroke — strip spaces, restrict charset, etc.'],
        ['selector',      'Unique key in getValues output'],
        ['required',      'Marks invalid if value is null or empty string'],
        ['onChangeValue', 'Callback with the current value (string | null) on every keystroke'],
      ],
    },
    demos: {
      basic:        { title: 'Basic' },
      variants:     { title: 'Variants + fullWidth',     desc: 'Without fullWidth, each variant has a fixed pixel width. Add fullWidth: true to stretch to the container.' },
      required:     { title: 'Required & Validation',    desc: 'Empty or null value triggers the 3-second red flash on getValues().' },
      formatter:    { title: 'Formatter — restrict input', desc: 'Use formatter to strip spaces or limit characters. Useful for passwords with strict charset rules.' },
      confirm:      { title: 'Confirm Password pattern', desc: 'A common real-world pattern: two password fields where the second validates against the first using visible and wrapper.' },
      api:          { title: 'API — getValues / setValues / clear', desc: 'getValue returns string | null. setValues works the same as Text.' },
    },
    submit: 'Submit',
    validMsg: '✓  valid',
    invalidMsg: '✗  validation failed',
    matchOk: '✓  passwords match',
    matchFail: '✗  passwords do not match',
    checkMatch: 'Check',
  },
  fa: {
    pageTitle: 'Password Input',
    overview: {
      howTitle: 'چطور کار می‌کنه؟',
      howBody: (
        <>
          <code>PasswordInput</code> یک MUI <code>TextField</code> است که به{' '}
          <code>type="password"</code> قفل شده، با یک دکمه نمایش/مخفی داخلی به‌عنوان{' '}
          <code>endAdornment</code>. state نمایش را خودش مدیریت می‌کند — نیازی به prop
          اضافه نیست. نوع مقدار <code>string | null</code> است، دقیقاً مثل Text input.
        </>
      ),
      noteTitle: 'نکات مهم',
      noteBody: 'تفاوت‌های رفتاری نسبت به Text input:',
      notes: [
        ['عرض ثابت',        'عرض hardcode شده دارد (207 / 235 / 231 پیکسل) مگر fullWidth: true تنظیم شود'],
        ['دکمه نمایش/مخفی', 'همیشه به‌عنوان endAdornment داخلی رندر می‌شود — از طریق props قابل حذف نیست'],
        ['بدون autoDirection', 'تشخیص جهت متن وجود ندارد (پسوردها همیشه LTR هستند)'],
        ['formatter',        'مقدار string | null دریافت می‌کند — مثل Text. برای حذف فاصله یا محدودسازی کاراکترها مفید است'],
      ],
      exclusiveTitle: 'Props اختصاصی (فراتر از MUI)',
      exclusiveProps: [
        ['defaultValue',  'مقدار اولیه هنگام mount و بعد از clear()'],
        ['formatter',     'روی هر keystroke اجرا می‌شود — فاصله‌ها را حذف کن، charset را محدود کن و...'],
        ['selector',      'کلید یکتا در خروجی getValues'],
        ['required',      'اگر مقدار null یا رشته خالی باشد، invalid می‌شود'],
        ['onChangeValue', 'callback با مقدار جاری (string | null) روی هر keystroke'],
      ],
    },
    demos: {
      basic:        { title: 'پایه' },
      variants:     { title: 'Variants + fullWidth',      desc: 'بدون fullWidth هر variant عرض ثابت پیکسلی دارد. fullWidth: true آن را به کل container می‌کشد.' },
      required:     { title: 'اجباری و اعتبارسنجی',     desc: 'مقدار خالی یا null در getValues() باعث قرمز شدن 3 ثانیه‌ای فیلد می‌شود.' },
      formatter:    { title: 'Formatter — محدودسازی ورودی', desc: 'از formatter برای حذف فاصله یا محدودسازی کاراکترها استفاده کن.' },
      confirm:      { title: 'الگوی تایید پسورد',       desc: 'یک الگوی رایج: دو فیلد پسورد که دومی با استفاده از visible و wrapper مقابل اول اعتبارسنجی می‌شود.' },
      api:          { title: 'API — getValues / setValues / clear', desc: 'getValue مقدار string | null برمی‌گرداند.' },
    },
    submit: 'ارسال',
    validMsg: '✓  معتبر',
    invalidMsg: '✗  اعتبارسنجی ناموفق',
    matchOk: '✓  پسوردها یکسان هستند',
    matchFail: '✗  پسوردها یکسان نیستند',
    checkMatch: 'بررسی',
  },
}

// ─── Overview ────────────────────────────────────────────────────────────────

function PasswordInputOverview({ lang }: { lang: 'en' | 'fa' }) {
  const ov = t[lang].overview
  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 4, bgcolor: '#f9fafb', borderColor: '#e0e0e0', borderRadius: 2 }}>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>{ov.howTitle}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{ov.howBody}</Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>{ov.noteTitle}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{ov.noteBody}</Typography>
      <Stack spacing={0.8} sx={{ mb: 2 }}>
        {ov.notes.map(([name, desc]) => (
          <Box key={name} sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: '#fce4ec', color: '#880e4f', px: 0.8, py: 0.2, borderRadius: 0.5, whiteSpace: 'nowrap', flexShrink: 0 }}>
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
    type: 'password',
    selector: 'password',
    label: 'Password',
  }]}
/>`

function BasicDemo() {
  const { ref } = useFormBuilder()
  return <FormBuilder ref={ref} inputs={[{ type: 'password', selector: 'password', label: 'Password' }]} />
}

// ─── Variants + fullWidth ────────────────────────────────────────────────────

const variantsCode = `// Without fullWidth → fixed pixel width per variant
inputs={[
  { type: 'password', selector: 'a', label: 'Standard  (207px)' },
  { type: 'password', selector: 'b', label: 'Outlined (235px)', variant: 'outlined' },
  { type: 'password', selector: 'c', label: 'Filled   (231px)', variant: 'filled'   },
]}

// With fullWidth → stretches to container
{ type: 'password', selector: 'd', label: 'fullWidth', variant: 'outlined', fullWidth: true }`

function VariantsDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <FormBuilder
          ref={ref}
          inputs={[
            { type: 'password', selector: 'a', label: 'Standard (207px)' },
            { type: 'password', selector: 'b', label: 'Outlined (235px)', variant: 'outlined' },
            { type: 'password', selector: 'c', label: 'Filled (231px)', variant: 'filled' },
          ]}
        />
      </Stack>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'password', selector: 'd', label: 'fullWidth: true', variant: 'outlined', fullWidth: true }]}
      />
    </Stack>
  )
}

// ─── Required ────────────────────────────────────────────────────────────────

const requiredCode = `inputs={[{
  type: 'password',
  selector: 'password',
  label: 'Password',
  required: true,
  variant: 'outlined',
  fullWidth: true,
}]}`

function RequiredDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref, getValues } = useFormBuilder()
  const [result, setResult] = useState<string | null>(null)
  const T = t[lang]

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'password', selector: 'password', label: 'Password', required: true, variant: 'outlined', fullWidth: true }]}
      />
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button variant="contained" size="small" onClick={() => {
          const { validation } = getValues()
          setResult(validation.status ? T.validMsg : T.invalidMsg)
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

// ─── Formatter ───────────────────────────────────────────────────────────────

const formatterCode = `// Strip spaces — passwords should never have spaces
{ type: 'password', selector: 'a', label: 'No spaces', variant: 'outlined', fullWidth: true,
  formatter: (value) => value?.replace(/ /g, '') ?? null,
}

// Only allow ASCII printable chars (no accented letters, no emojis)
{ type: 'password', selector: 'b', label: 'ASCII only', variant: 'outlined', fullWidth: true,
  formatter: (value) => value?.replace(/[^ -~]/g, '') ?? null,
}`

function FormatterDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[
          {
            type: 'password', selector: 'a', label: 'No spaces — try typing a space',
            variant: 'outlined', fullWidth: true,
            formatter: (value: string | null) => value?.replace(/ /g, '') ?? null,
          },
          {
            type: 'password', selector: 'b', label: 'ASCII printable only — try pasting an emoji',
            variant: 'outlined', fullWidth: true,
            // eslint-disable-next-line no-control-regex
            formatter: (value: string | null) => value?.replace(/[^ -~]/g, '') ?? null,
          },
        ]}
      />
    </Stack>
  )
}

// ─── Confirm Password ────────────────────────────────────────────────────────

const confirmCode = `const { ref, getValues } = useFormBuilder<{
  password: string | null
  confirm: string | null
}>()

inputs={[
  {
    type: 'password',
    selector: 'password',
    label: 'Password',
    required: true,
    variant: 'outlined',
    fullWidth: true,
  },
  {
    type: 'password',
    selector: 'confirm',
    label: 'Confirm Password',
    required: true,
    variant: 'outlined',
    fullWidth: true,
    // only show confirm field once password has a value
    visible: (data) => !!data?.password,
  },
]}

// On submit:
const { data, validation } = getValues()
const matches = data.password === data.confirm`

function ConfirmDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref, getValues } = useFormBuilder<{ password: string | null; confirm: string | null }>()
  const [result, setResult] = useState<string | null>(null)
  const T = t[lang]

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[
          { type: 'password', selector: 'password', label: 'Password', required: true, variant: 'outlined', fullWidth: true },
          {
            type: 'password', selector: 'confirm', label: 'Confirm Password',
            required: true, variant: 'outlined', fullWidth: true,
            visible: (data: { password?: string | null }) => !!data?.password,
          },
        ]}
      />
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button variant="contained" size="small" onClick={() => {
          const { data, validation } = getValues()
          if (!validation.status) { setResult(T.invalidMsg); return }
          setResult(data.password === data.confirm ? T.matchOk : T.matchFail)
        }}>
          {T.checkMatch}
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

// ─── API ─────────────────────────────────────────────────────────────────────

const apiCode = `const { ref, getValues, setValues, clear } = useFormBuilder<{
  password: string | null
}>()

const { data } = getValues(false)
console.log(data.password)   // string | null

await setValues({ password: 'secret123' })
await clear()                // resets to defaultValue (null)`

function ApiDemo() {
  const { ref, getValues, setValues, clear } = useFormBuilder<{ password: string | null }>()
  const [output, setOutput] = useState<string | null>(null)

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'password', selector: 'password', label: 'Password', variant: 'outlined', fullWidth: true }]}
      />
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" onClick={() => {
          setOutput(JSON.stringify(getValues(false).data, null, 2))
        }}>getValues</Button>
        <Button size="small" variant="outlined" onClick={async () => {
          await setValues({ password: 'secret123' })
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

// ─── Page content ─────────────────────────────────────────────────────────────

function PasswordInputContent({ lang }: { lang: 'en' | 'fa' }) {
  const d = t[lang].demos
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t[lang].pageTitle}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          <Chip label='type: "password"' size="small" variant="outlined" />
          <Chip label="value: string | null" size="small" variant="outlined" />
          <Chip label="show/hide built-in" size="small" variant="outlined" color="secondary" />
        </Stack>
        <PasswordInputOverview lang={lang} />
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

      <DemoSection title={d.formatter.title} description={d.formatter.desc} code={formatterCode}>
        <FormatterDemo />
      </DemoSection>

      <DemoSection title={d.confirm.title} description={d.confirm.desc} code={confirmCode}>
        <ConfirmDemo lang={lang} />
      </DemoSection>

      <DemoSection title={d.api.title} description={d.api.desc} code={apiCode}>
        <ApiDemo />
      </DemoSection>
    </Box>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function PasswordInputPage() {
  const { lang } = useLang()
  return <PasswordInputContent lang={lang} />
}
