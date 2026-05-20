import { Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import FormBuilder, { useFormBuilder } from 'material-form-builder'
import { useState } from 'react'
import DemoSection from '../../components/DemoSection'
import { useLang } from '../../contexts/LangContext'

// ─── Translations ────────────────────────────────────────────────────────────

const t = {
  en: {
    pageTitle: 'Select Input',
    overview: {
      howTitle: 'How does it work?',
      howBody: (
        <>
          <code>SelectInput</code> wraps MUI <code>FormControl</code> +{' '}
          <code>InputLabel</code> + <code>Select</code>. Options are passed as a plain array of{' '}
          <code>{'{ label, value }'}</code> objects. The label can be a string or any JSX element.
          Value type is <code>any</code> — whatever you put in <code>option.value</code> comes
          back from <code>getValue()</code>.
        </>
      ),
      noteTitle: 'Key behaviors',
      notes: [
        ['options change',   'When the options array changes (different values), the current value is automatically cleared to null — ideal for dependent dropdowns'],
        ['loading',          'loading: true disables the select and replaces the dropdown icon with a CircularProgress spinner'],
        ['empty options',    'Shows "Items Not Found" (or listSubheaderText) when options is an empty array'],
        ['multiple',         'multiple: true switches value to an array — initial empty value becomes [] instead of null'],
        ['fixed width',      'Same fixed-width behavior as Password: 207/235/231px unless fullWidth: true'],
        ['value type',       'Value is any — use strings, numbers, or objects as option values'],
      ],
      exclusiveTitle: 'Exclusive props',
      exclusiveProps: [
        ['options',          'Required. Array of { label: string | ReactNode, value: any }'],
        ['loading',          'Shows spinner and disables the select during async data fetching'],
        ['listSubheaderText','Custom text shown when options array is empty'],
        ['defaultValue',     'Initial selected value on mount and after clear()'],
        ['selector',         'Unique key in getValues output'],
        ['required',         'Marks invalid when value is null — triggers 3s red flash'],
        ['onChangeValue',    'Callback with the selected value on every change'],
      ],
    },
    demos: {
      basic:       { title: 'Basic' },
      variants:    { title: 'Variants + fullWidth',       desc: 'Same fixed-width behavior as other inputs. Use fullWidth: true to stretch.' },
      jsxLabel:    { title: 'JSX option labels',          desc: 'The label field of each option accepts any ReactNode — add icons, colors, or custom layouts.' },
      loading:     { title: 'Loading state',              desc: 'Set loading: true while fetching options from an API. The select is disabled and shows a spinner.' },
      empty:       { title: 'Empty options',              desc: 'When options is [], a subheader is shown. Customize it with listSubheaderText.' },
      multiple:    { title: 'Multiple selection',         desc: 'Pass multiple: true to allow selecting multiple values. getValue() returns an array.' },
      dependent:   { title: 'Dependent dropdowns',        desc: 'When options changes, value is automatically cleared. Use visible + updateListener to build cascading selects.' },
      required:    { title: 'Required & Validation',      desc: 'required: true fails when nothing is selected (value is null).' },
      api:         { title: 'API — getValues / setValues / clear', desc: 'getValue returns the raw value from the selected option.' },
    },
    submit: 'Submit',
    validMsg: (v: unknown) => `✓  value = ${JSON.stringify(v)}`,
    invalidMsg: '✗  validation failed',
    fetchBtn: 'Simulate fetch',
    fetching: 'Fetching…',
  },
  fa: {
    pageTitle: 'Select Input',
    overview: {
      howTitle: 'چطور کار می‌کنه؟',
      howBody: (
        <>
          <code>SelectInput</code> یک MUI <code>FormControl</code> +{' '}
          <code>InputLabel</code> + <code>Select</code> را wrap می‌کند. گزینه‌ها به صورت آرایه‌ای از{' '}
          <code>{'{ label, value }'}</code> پاس می‌شوند. label می‌تواند string یا هر JSX باشد.
          نوع مقدار <code>any</code> است — هر چیزی که در <code>option.value</code> بگذاری از{' '}
          <code>getValue()</code> برمی‌گردد.
        </>
      ),
      noteTitle: 'رفتارهای کلیدی',
      notes: [
        ['تغییر options',   'وقتی آرایه options تغییر کند (مقادیر متفاوت)، مقدار جاری به null ریست می‌شود — ایده‌آل برای dropdown های وابسته'],
        ['loading',         'loading: true سلکت را غیرفعال می‌کند و آیکون dropdown را با CircularProgress جایگزین می‌کند'],
        ['options خالی',    'وقتی options آرایه خالی باشد، "Items Not Found" یا listSubheaderText نمایش داده می‌شود'],
        ['multiple',        'multiple: true مقدار را به آرایه تبدیل می‌کند — مقدار اولیه خالی [] است نه null'],
        ['عرض ثابت',        'مثل Password همان عرض ثابت: 207/235/231px مگر fullWidth: true باشد'],
        ['نوع مقدار',       'مقدار از نوع any است — می‌توانی string، number یا object به عنوان value گزینه استفاده کنی'],
      ],
      exclusiveTitle: 'Props اختصاصی',
      exclusiveProps: [
        ['options',          'اجباری. آرایه‌ای از { label: string | ReactNode, value: any }'],
        ['loading',          'اسپینر نمایش می‌دهد و سلکت را هنگام واکشی async غیرفعال می‌کند'],
        ['listSubheaderText','متن سفارشی وقتی آرایه options خالی است'],
        ['defaultValue',     'مقدار اولیه انتخاب‌شده هنگام mount و بعد از clear()'],
        ['selector',         'کلید یکتا در خروجی getValues'],
        ['required',         'وقتی چیزی انتخاب نشده (null) invalid می‌شود — 3 ثانیه قرمز می‌ماند'],
        ['onChangeValue',    'callback با مقدار انتخاب‌شده روی هر تغییر'],
      ],
    },
    demos: {
      basic:       { title: 'پایه' },
      variants:    { title: 'Variants + fullWidth',        desc: 'همان رفتار عرض ثابت سایر input‌ها. برای کشیدن به کل container از fullWidth: true استفاده کن.' },
      jsxLabel:    { title: 'برچسب JSX برای گزینه‌ها',   desc: 'فیلد label هر گزینه هر ReactNode را می‌پذیرد — آیکون، رنگ، یا layout سفارشی اضافه کن.' },
      loading:     { title: 'حالت loading',               desc: 'هنگام واکشی گزینه‌ها از API مقدار loading: true را ست کن. سلکت غیرفعال و اسپینر نمایش داده می‌شود.' },
      empty:       { title: 'options خالی',               desc: 'وقتی options برابر [] باشد، یک subheader نمایش داده می‌شود. با listSubheaderText سفارشی‌سازی کن.' },
      multiple:    { title: 'انتخاب چندتایی',             desc: 'با multiple: true می‌توان چند مقدار انتخاب کرد. getValue() یک آرایه برمی‌گرداند.' },
      dependent:   { title: 'Dropdown های وابسته',        desc: 'وقتی options تغییر می‌کند، مقدار خودکار پاک می‌شود. از visible + updateListener برای ساخت سلکت‌های cascade استفاده کن.' },
      required:    { title: 'اجباری و اعتبارسنجی',       desc: 'required: true وقتی هیچ گزینه‌ای انتخاب نشده (null) خطا می‌دهد.' },
      api:         { title: 'API — getValues / setValues / clear', desc: 'getValue مقدار خام گزینه انتخاب‌شده را برمی‌گرداند.' },
    },
    submit: 'ارسال',
    validMsg: (v: unknown) => `✓  مقدار = ${JSON.stringify(v)}`,
    invalidMsg: '✗  اعتبارسنجی ناموفق',
    fetchBtn: 'شبیه‌سازی واکشی',
    fetching: 'در حال واکشی…',
  },
}

const COLORS = [
  { label: 'Red',   value: 'red'   },
  { label: 'Green', value: 'green' },
  { label: 'Blue',  value: 'blue'  },
  { label: 'Black', value: 'black' },
]

const COUNTRIES = [
  { label: 'Iran',          value: 'ir' },
  { label: 'United States', value: 'us' },
  { label: 'Germany',       value: 'de' },
  { label: 'Japan',         value: 'jp' },
]

// ─── Overview ─────────────────────────────────────────────────────────────────

function SelectInputOverview({ lang }: { lang: 'en' | 'fa' }) {
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
  type: 'select',
  selector: 'color',
  label: 'Color',
  options: [
    { label: 'Red',   value: 'red'   },
    { label: 'Green', value: 'green' },
    { label: 'Blue',  value: 'blue'  },
  ],
}]}`

function BasicDemo() {
  const { ref } = useFormBuilder()
  return <FormBuilder ref={ref} inputs={[{ type: 'select', selector: 'color', label: 'Color', options: COLORS }]} />
}

// ─── Variants + fullWidth ─────────────────────────────────────────────────────

const variantsCode = `inputs={[
  { type: 'select', selector: 'a', label: 'Standard  (207px)', options },
  { type: 'select', selector: 'b', label: 'Outlined (235px)',  options, variant: 'outlined' },
  { type: 'select', selector: 'c', label: 'Filled   (231px)',  options, variant: 'filled'   },
  { type: 'select', selector: 'd', label: 'fullWidth',         options, variant: 'outlined', fullWidth: true },
]}`

function VariantsDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <FormBuilder
          ref={ref}
          inputs={[
            { type: 'select', selector: 'a', label: 'Standard (207px)',  options: COLORS },
            { type: 'select', selector: 'b', label: 'Outlined (235px)',  options: COLORS, variant: 'outlined' },
            { type: 'select', selector: 'c', label: 'Filled (231px)',    options: COLORS, variant: 'filled' },
          ]}
        />
      </Stack>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'select', selector: 'd', label: 'fullWidth: true', options: COLORS, variant: 'outlined', fullWidth: true }]}
      />
    </Stack>
  )
}

// ─── JSX labels ───────────────────────────────────────────────────────────────

const jsxLabelCode = `options={[
  { value: 'red',   label: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'red' }} />Red</Box> },
  { value: 'green', label: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'green' }} />Green</Box> },
  { value: 'blue',  label: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'blue' }} />Blue</Box> },
]}`

const COLOR_OPTIONS_JSX = COLORS.map(c => ({
  value: c.value,
  label: (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: c.value, flexShrink: 0 }} />
      {c.label}
    </Box>
  ),
}))

function JsxLabelDemo() {
  const { ref } = useFormBuilder()
  return (
    <FormBuilder
      ref={ref}
      inputs={[{ type: 'select', selector: 'color', label: 'Color', options: COLOR_OPTIONS_JSX, variant: 'outlined' }]}
    />
  )
}

// ─── Loading ──────────────────────────────────────────────────────────────────

const loadingCode = `const [options, setOptions] = useState([])
const [loading, setLoading] = useState(false)

const fetch = async () => {
  setLoading(true)
  await delay(1500)           // simulate API
  setOptions([...])
  setLoading(false)
}

inputs={[{
  type: 'select',
  selector: 'country',
  label: 'Country',
  options,
  loading,               // disables + shows spinner
  variant: 'outlined',
  fullWidth: true,
}]}`

function LoadingDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref } = useFormBuilder()
  const [options, setOptions] = useState<typeof COUNTRIES>([])
  const [loading, setLoading] = useState(false)
  const T = t[lang]

  const handleFetch = async () => {
    setOptions([])
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setOptions(COUNTRIES)
    setLoading(false)
  }

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'select', selector: 'country', label: 'Country',
          options, loading, variant: 'outlined', fullWidth: true,
        }]}
      />
      <Button size="small" variant="outlined" onClick={handleFetch} disabled={loading} sx={{ alignSelf: 'flex-start' }}>
        {loading ? T.fetching : T.fetchBtn}
      </Button>
    </Stack>
  )
}

// ─── Empty options ────────────────────────────────────────────────────────────

const emptyCode = `// default empty message
{ type: 'select', selector: 'a', label: 'Default message', options: [] }

// custom message
{ type: 'select', selector: 'b', label: 'Custom message',  options: [],
  listSubheaderText: 'No results found for your search' }`

function EmptyDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack spacing={3}>
      <FormBuilder
        ref={ref}
        inputs={[
          { type: 'select', selector: 'a', label: 'Default empty message', options: [], variant: 'outlined' },
          { type: 'select', selector: 'b', label: 'Custom empty message',  options: [], variant: 'outlined', listSubheaderText: 'No results found for your search' },
        ]}
      />
    </Stack>
  )
}

// ─── Multiple ─────────────────────────────────────────────────────────────────

const multipleCode = `inputs={[{
  type: 'select',
  selector: 'colors',
  label: 'Colors',
  options: [...],
  multiple: true,        // value becomes an array
  variant: 'outlined',
  fullWidth: true,
}]}

// getValue() → ['red', 'blue']  (array)`

function MultipleDemo() {
  const { ref, getValues } = useFormBuilder()
  const [output, setOutput] = useState<string | null>(null)
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'select', selector: 'colors', label: 'Colors (pick multiple)',
          options: COLORS, multiple: true, variant: 'outlined', fullWidth: true,
        }]}
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

// ─── Dependent dropdowns ──────────────────────────────────────────────────────

const dependentCode = `const CITIES: Record<string, { label: string; value: string }[]> = {
  ir: [{ label: 'Tehran', value: 'thr' }, { label: 'Isfahan', value: 'isp' }],
  us: [{ label: 'New York', value: 'nyc' }, { label: 'Los Angeles', value: 'lax' }],
}

inputs={[
  {
    type: 'select',
    selector: 'country',
    label: 'Country',
    options: COUNTRIES,
    variant: 'outlined',
    fullWidth: true,
  },
  {
    type: 'select',
    selector: 'city',
    label: 'City',
    variant: 'outlined',
    fullWidth: true,
    // city options depend on selected country
    options: CITIES[data?.country] ?? [],
    // re-render when country changes
    updateListener: [data?.country],
    // hide until country is selected
    visible: (data) => !!data?.country,
  },
]}`

const CITIES: Record<string, { label: string; value: string }[]> = {
  ir: [{ label: 'Tehran', value: 'thr' }, { label: 'Isfahan', value: 'isp' }, { label: 'Shiraz', value: 'shr' }],
  us: [{ label: 'New York', value: 'nyc' }, { label: 'Los Angeles', value: 'lax' }, { label: 'Chicago', value: 'chi' }],
  de: [{ label: 'Berlin', value: 'ber' }, { label: 'Munich', value: 'muc' }],
  jp: [{ label: 'Tokyo', value: 'tky' }, { label: 'Osaka', value: 'osk' }],
}

function DependentDemo() {
  const { ref, getValues } = useFormBuilder<{ country: string | null; city: string | null }>()
  const [data, setData] = useState<{ country?: string | null }>({})

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        onChange={(v: { data: { country?: string | null } }) => setData(v.data)}
        inputs={[
          {
            type: 'select', selector: 'country', label: 'Country',
            options: COUNTRIES, variant: 'outlined', fullWidth: true,
          },
          {
            type: 'select', selector: 'city', label: 'City',
            options: CITIES[data?.country ?? ''] ?? [],
            updateListener: [data?.country],
            visible: (d: { country?: string | null }) => !!d?.country,
            variant: 'outlined', fullWidth: true,
          },
        ]}
      />
      <Button size="small" variant="outlined" sx={{ alignSelf: 'flex-start' }} onClick={() =>
        console.log(getValues(false).data)
      }>
        log getValues
      </Button>
    </Stack>
  )
}

// ─── Required ─────────────────────────────────────────────────────────────────

const requiredCode = `inputs={[{
  type: 'select',
  selector: 'role',
  label: 'Role',
  options: [...],
  required: true,
  variant: 'outlined',
  fullWidth: true,
}]}`

function RequiredDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref, getValues } = useFormBuilder<{ role: string | null }>()
  const [result, setResult] = useState<string | null>(null)
  const T = t[lang]

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'select', selector: 'role', label: 'Role', required: true,
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'Viewer', value: 'viewer' },
          ],
          variant: 'outlined', fullWidth: true,
        }]}
      />
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button variant="contained" size="small" onClick={() => {
          const { data, validation } = getValues()
          setResult(validation.status ? T.validMsg(data.role) : T.invalidMsg)
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
  color: string | null
}>()

const { data } = getValues(false)
console.log(data.color)   // 'red' | 'green' | 'blue' | null

await setValues({ color: 'blue' })   // must match an option value
await clear()                         // resets to defaultValue`

function ApiDemo() {
  const { ref, getValues, setValues, clear } = useFormBuilder<{ color: string | null }>()
  const [output, setOutput] = useState<string | null>(null)

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'select', selector: 'color', label: 'Color', options: COLORS, variant: 'outlined', fullWidth: true }]}
      />
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" onClick={() =>
          setOutput(JSON.stringify(getValues(false).data, null, 2))
        }>getValues</Button>
        <Button size="small" variant="outlined" onClick={async () => {
          await setValues({ color: 'blue' })
          setOutput(null)
        }}>setValues('blue')</Button>
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

function SelectInputContent({ lang }: { lang: 'en' | 'fa' }) {
  const d = t[lang].demos
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t[lang].pageTitle}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          <Chip label='type: "select"' size="small" variant="outlined" />
          <Chip label="value: any" size="small" variant="outlined" />
          <Chip label="options: required" size="small" variant="outlined" color="warning" />
          <Chip label="options change → clear" size="small" variant="outlined" />
        </Stack>
        <SelectInputOverview lang={lang} />
      </Box>

      <DemoSection title={d.basic.title} code={basicCode}>
        <BasicDemo />
      </DemoSection>

      <DemoSection title={d.variants.title} description={d.variants.desc} code={variantsCode}>
        <VariantsDemo />
      </DemoSection>

      <DemoSection title={d.jsxLabel.title} description={d.jsxLabel.desc} code={jsxLabelCode}>
        <JsxLabelDemo />
      </DemoSection>

      <DemoSection title={d.loading.title} description={d.loading.desc} code={loadingCode}>
        <LoadingDemo lang={lang} />
      </DemoSection>

      <DemoSection title={d.empty.title} description={d.empty.desc} code={emptyCode}>
        <EmptyDemo />
      </DemoSection>

      <DemoSection title={d.multiple.title} description={d.multiple.desc} code={multipleCode}>
        <MultipleDemo />
      </DemoSection>

      <DemoSection title={d.dependent.title} description={d.dependent.desc} code={dependentCode}>
        <DependentDemo />
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

export default function SelectInputPage() {
  const { lang } = useLang()
  return <SelectInputContent lang={lang} />
}
