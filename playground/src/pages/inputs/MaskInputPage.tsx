import { Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import FormBuilder, { useFormBuilder } from 'material-form-builder'
import { useState } from 'react'
import DemoSection from '../../components/DemoSection'
import { useLang } from '../../contexts/LangContext'

// ─── Translations ────────────────────────────────────────────────────────────

const t = {
  en: {
    pageTitle: 'Mask Input',
    overview: {
      howTitle: 'How does it work?',
      howBody: (
        <>
          <code>MaskInput</code> is a MUI <code>TextField</code> that applies a fixed pattern to
          the user's input. On every keystroke it strips all non-digit characters, then rebuilds
          the display string by filling the pattern's <code>.</code> slots with digits. The cursor
          is repositioned after the last entered digit automatically.
        </>
      ),
      patternTitle: 'Pattern syntax',
      patternBody: 'The pattern string has two types of characters:',
      patternRules: [
        ['.', 'A digit slot — one numeric character (0-9) is placed here'],
        ['any other char', 'A literal separator — always shown as-is (e.g. / : - space ( ))'],
      ],
      noteTitle: 'Key behaviors',
      notes: [
        ['digits only',   'Non-digit keystrokes are silently discarded — only 0-9 accepted'],
        ['getValue()',    'Returns the full masked string (e.g. "12/06/1400"), not raw digits'],
        ['setValues()',   'Expects the already-masked string — pass "12/06/1400", not "12061400"'],
        ['char',         'Placeholder character for empty slots — default is "_"'],
        ['getMutator',   'Use getMutator to strip separators before sending to API'],
      ],
      exclusiveTitle: 'Exclusive props',
      exclusiveProps: [
        ['pattern',      'Required. Mask pattern string — use . for digit slots, any other char as separator'],
        ['char',         'Placeholder shown in empty digit slots. Default: "_"'],
        ['defaultValue', 'Initial masked string on mount and after clear()'],
        ['selector',     'Unique key in getValues output'],
        ['required',     'Marks invalid when value is null (all slots empty)'],
      ],
    },
    demos: {
      basic:       { title: 'Basic — Date mask' },
      patterns:    { title: 'Common patterns',        desc: 'Ready-to-use patterns for the most common use cases.' },
      char:        { title: 'Custom placeholder char', desc: 'Replace the default _ with any character using the char prop.' },
      getMutator:  { title: 'getMutator — strip separators for API', desc: 'getValue() returns the full masked string. Use getMutator to return only the raw digits to your API.' },
      required:    { title: 'Required & Validation',  desc: 'required: true fails when no digits have been entered (value is null).' },
      setValues:   { title: 'setValues — pass the masked string', desc: 'When setting a value programmatically, pass the already-masked string that matches the pattern.' },
    },
    submit: 'Submit',
    validMsg: (v: string | null) => `✓  "${v}"`,
    invalidMsg: '✗  validation failed',
    setDate: 'Set 25/12/2024',
  },
  fa: {
    pageTitle: 'Mask Input',
    overview: {
      howTitle: 'چطور کار می‌کنه؟',
      howBody: (
        <>
          <code>MaskInput</code> یک MUI <code>TextField</code> است که الگوی ثابتی به ورودی
          کاربر اعمال می‌کند. روی هر keystroke، تمام کاراکترهای غیر رقمی حذف می‌شوند، سپس
          رشته نمایشی با قرار دادن ارقام در slot‌های <code>.</code> الگو بازسازی می‌شود.
          cursor به‌طور خودکار بعد از آخرین رقم وارد شده قرار می‌گیرد.
        </>
      ),
      patternTitle: 'سینتکس pattern',
      patternBody: 'رشته pattern دو نوع کاراکتر دارد:',
      patternRules: [
        ['.', 'یک slot رقمی — یک کاراکتر عددی (0-9) اینجا قرار می‌گیرد'],
        ['هر کاراکتر دیگر', 'یک separator ثابت — همیشه همان‌طور نمایش داده می‌شود (مثلاً / : - فاصله ( ))'],
      ],
      noteTitle: 'رفتارهای کلیدی',
      notes: [
        ['فقط رقم',      'کاراکترهای غیر رقمی بی‌صدا حذف می‌شوند — فقط 0-9 پذیرفته می‌شود'],
        ['getValue()',   'کل رشته mask‌شده را برمی‌گرداند (مثلاً "1400/06/12")، نه ارقام خام'],
        ['setValues()', 'رشته mask‌شده آماده انتظار دارد — "1400/06/12" بده، نه "14000612"'],
        ['char',        'کاراکتر placeholder برای slot‌های خالی — پیش‌فرض "_"'],
        ['getMutator',  'از getMutator استفاده کن تا separator‌ها را قبل از ارسال به API حذف کنی'],
      ],
      exclusiveTitle: 'Props اختصاصی',
      exclusiveProps: [
        ['pattern',      'اجباری. رشته الگو — از . برای slot رقمی و هر کاراکتر دیگر به‌عنوان separator استفاده کن'],
        ['char',         'کاراکتر نمایش داده شده در slot‌های خالی. پیش‌فرض: "_"'],
        ['defaultValue', 'رشته mask‌شده اولیه هنگام mount و بعد از clear()'],
        ['selector',     'کلید یکتا در خروجی getValues'],
        ['required',     'وقتی هیچ رقمی وارد نشده باشد (مقدار null) invalid می‌شود'],
      ],
    },
    demos: {
      basic:       { title: 'پایه — Date mask' },
      patterns:    { title: 'الگوهای رایج',               desc: 'الگوهای آماده برای متداول‌ترین کاربردها.' },
      char:        { title: 'کاراکتر placeholder سفارشی', desc: 'با prop char، کاراکتر پیش‌فرض _ را جایگزین کن.' },
      getMutator:  { title: 'getMutator — حذف separator برای API', desc: 'getValue() کل رشته mask‌شده را برمی‌گرداند. از getMutator استفاده کن تا فقط ارقام خام به API برسد.' },
      required:    { title: 'اجباری و اعتبارسنجی',        desc: 'required: true وقتی هیچ رقمی وارد نشده (مقدار null) خطا می‌دهد.' },
      setValues:   { title: 'setValues — رشته mask‌شده بده', desc: 'برای تنظیم مقدار از طریق کد، رشته mask‌شده‌ای بده که با الگو مطابقت داشته باشد.' },
    },
    submit: 'ارسال',
    validMsg: (v: string | null) => `✓  "${v}"`,
    invalidMsg: '✗  اعتبارسنجی ناموفق',
    setDate: 'ست کردن 25/12/2024',
  },
}

// ─── Overview ─────────────────────────────────────────────────────────────────

function MaskInputOverview({ lang }: { lang: 'en' | 'fa' }) {
  const ov = t[lang].overview
  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 4, bgcolor: '#f9fafb', borderColor: '#e0e0e0', borderRadius: 2 }}>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>{ov.howTitle}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{ov.howBody}</Typography>
      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle2" fontWeight={700} gutterBottom>{ov.patternTitle}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{ov.patternBody}</Typography>
      <Stack spacing={0.8} sx={{ mb: 2 }}>
        {ov.patternRules.map(([name, desc]) => (
          <Box key={name} sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: '#e3f2fd', color: '#1565c0', px: 0.8, py: 0.2, borderRadius: 0.5, whiteSpace: 'nowrap', flexShrink: 0, minWidth: 110, textAlign: 'center' }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">{desc}</Typography>
          </Box>
        ))}
      </Stack>

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

const basicCode = `// pattern: each '.' = one digit slot
// '/' characters are literal separators
inputs={[{
  type: 'mask',
  selector: 'date',
  label: 'Date (DD/MM/YYYY)',
  pattern: '../../....',
  variant: 'outlined',
}]}`

function BasicDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[{
        type: 'mask', selector: 'date', label: 'Date (DD/MM/YYYY)',
        pattern: '../../....', variant: 'outlined',
      }]}
    />
  )
}

// ─── Common patterns ──────────────────────────────────────────────────────────

const patternsCode = `// Date  DD/MM/YYYY
{ type: 'mask', selector: 'date',    pattern: '../../....', label: 'Date (DD/MM/YYYY)' }

// Time  HH:MM
{ type: 'mask', selector: 'time',    pattern: '..:..', label: 'Time (HH:MM)' }

// Iranian national ID (10 digits)
{ type: 'mask', selector: 'nid',     pattern: '..........', label: 'National ID' }

// Iranian phone  0912-345-6789
{ type: 'mask', selector: 'phone',   pattern: '....-...-....', label: 'Mobile' }

// Credit card  1234 5678 9012 3456
{ type: 'mask', selector: 'card',    pattern: '.... .... .... ....', label: 'Card Number' }

// Postal code  12345-67890
{ type: 'mask', selector: 'postal',  pattern: '.....-....', label: 'Postal Code' }`

function PatternsDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[
          { type: 'mask', selector: 'date',   pattern: '../../....', label: 'Date (DD/MM/YYYY)', variant: 'outlined' },
          { type: 'mask', selector: 'time',   pattern: '..:..',      label: 'Time (HH:MM)',       variant: 'outlined' },
          { type: 'mask', selector: 'nid',    pattern: '..........', label: 'National ID (10 digits)', variant: 'outlined' },
          { type: 'mask', selector: 'phone',  pattern: '....-...-....', label: 'Mobile (0912-345-6789)', variant: 'outlined' },
          { type: 'mask', selector: 'card',   pattern: '.... .... .... ....', label: 'Card Number', variant: 'outlined' },
          { type: 'mask', selector: 'postal', pattern: '.....-....', label: 'Postal Code', variant: 'outlined' },
        ]}
      />
    </Stack>
  )
}

// ─── Custom char ──────────────────────────────────────────────────────────────

const charCode = `// default char is '_'
{ type: 'mask', selector: 'a', pattern: '../../....', char: '_', label: 'char: "_" (default)' }

// use a space instead
{ type: 'mask', selector: 'b', pattern: '../../....', char: ' ', label: 'char: " " (space)' }

// use '0' as placeholder
{ type: 'mask', selector: 'c', pattern: '../../....', char: '0', label: 'char: "0"' }`

function CharDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[
          { type: 'mask', selector: 'a', pattern: '../../....', label: 'char: "_" (default)', variant: 'outlined' },
          { type: 'mask', selector: 'b', pattern: '../../....', char: ' ', label: 'char: " " (space)', variant: 'outlined' },
          { type: 'mask', selector: 'c', pattern: '../../....', char: '0', label: 'char: "0"', variant: 'outlined' },
        ]}
      />
    </Stack>
  )
}

// ─── getMutator ───────────────────────────────────────────────────────────────

const getMutatorCode = `// getValue()         → "25/12/2024"  (masked — for display)
// getValues().data   → { date: "25122024" }  (raw digits — for API)

inputs={[{
  type: 'mask',
  selector: 'date',
  label: 'Date (DD/MM/YYYY)',
  pattern: '../../....',
  variant: 'outlined',
  getMutator: (value) => value?.replace(/\\D/g, '') ?? null,
}]}`

function GetMutatorDemo() {
  const { ref, getValues } = useFormBuilder()
  const [output, setOutput] = useState<string | null>(null)

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'mask', selector: 'date', label: 'Date (DD/MM/YYYY)',
          pattern: '../../....', variant: 'outlined',
          getMutator: (value: string | null) => value?.replace(/\D/g, '') ?? null,
        }]}
      />
      <Button size="small" variant="outlined" sx={{ alignSelf: 'flex-start' }} onClick={() => {
        setOutput(JSON.stringify(getValues(false).data, null, 2))
      }}>
        getValues (after getMutator)
      </Button>
      {output && (
        <Box component="pre" sx={{ m: 0, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 1, fontSize: '0.8rem', fontFamily: 'monospace' }}>
          {output}
        </Box>
      )}
    </Stack>
  )
}

// ─── Required ─────────────────────────────────────────────────────────────────

const requiredCode = `inputs={[{
  type: 'mask',
  selector: 'nid',
  label: 'National ID',
  pattern: '..........',
  required: true,
  variant: 'outlined',
}]}`

function RequiredDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref, getValues } = useFormBuilder<{ nid: string | null }>()
  const [result, setResult] = useState<string | null>(null)
  const T = t[lang]

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'mask', selector: 'nid', label: 'National ID (10 digits)',
          pattern: '..........', required: true, variant: 'outlined',
        }]}
      />
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button variant="contained" size="small" onClick={() => {
          const { data, validation } = getValues()
          setResult(validation.status ? T.validMsg(data.nid) : T.invalidMsg)
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

// ─── setValues ────────────────────────────────────────────────────────────────

const setValuesCode = `// ✅ pass the masked string that matches the pattern
await setValues({ date: '25/12/2024' })

// ❌ raw digits don't work — the mask won't be applied on setValue
await setValues({ date: '25122024' })  // renders as "25/12/202_"`

function SetValuesDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref, setValues, clear } = useFormBuilder<{ date: string | null }>()
  const T = t[lang]

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'mask', selector: 'date', label: 'Date (DD/MM/YYYY)',
          pattern: '../../....', variant: 'outlined',
        }]}
      />
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" onClick={() => setValues({ date: '25/12/2024' })}>
          {T.setDate}
        </Button>
        <Button size="small" variant="outlined" color="error" onClick={() => clear()}>
          clear
        </Button>
      </Stack>
    </Stack>
  )
}

// ─── Page content ─────────────────────────────────────────────────────────────

function MaskInputContent({ lang }: { lang: 'en' | 'fa' }) {
  const d = t[lang].demos
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t[lang].pageTitle}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          <Chip label='type: "mask"' size="small" variant="outlined" />
          <Chip label="value: string | null" size="small" variant="outlined" />
          <Chip label='pattern: required' size="small" variant="outlined" color="warning" />
          <Chip label="digits only" size="small" variant="outlined" />
        </Stack>
        <MaskInputOverview lang={lang} />
      </Box>

      <DemoSection title={d.basic.title} code={basicCode}>
        <BasicDemo />
      </DemoSection>

      <DemoSection title={d.patterns.title} description={d.patterns.desc} code={patternsCode}>
        <PatternsDemo />
      </DemoSection>

      <DemoSection title={d.char.title} description={d.char.desc} code={charCode}>
        <CharDemo />
      </DemoSection>

      <DemoSection title={d.getMutator.title} description={d.getMutator.desc} code={getMutatorCode}>
        <GetMutatorDemo />
      </DemoSection>

      <DemoSection title={d.required.title} description={d.required.desc} code={requiredCode}>
        <RequiredDemo lang={lang} />
      </DemoSection>

      <DemoSection title={d.setValues.title} description={d.setValues.desc} code={setValuesCode}>
        <SetValuesDemo lang={lang} />
      </DemoSection>
    </Box>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function MaskInputPage() {
  const { lang } = useLang()
  return <MaskInputContent lang={lang} />
}
