import { Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import FormBuilder, { useFormBuilder } from 'material-form-builder'
import { useState } from 'react'
import DemoSection from '../../components/DemoSection'
import { useLang } from '../../contexts/LangContext'

// ─── Translations ────────────────────────────────────────────────────────────

const t = {
  en: {
    pageTitle: 'Autocomplete Input',
    overview: {
      howTitle: 'How does it work?',
      howBody: (
        <>
          <code>AutocompleteInput</code> wraps MUI <code>Autocomplete</code> +{' '}
          <code>TextField</code>. Options are <code>{'{ label, value }'}</code> objects where{' '}
          <code>value</code> is a string. <code>getValue()</code> returns the selected value
          string, a <code>string[]</code> for <code>multiple</code>, or <code>null</code>.
          With <code>freeSolo</code> the user may type any text — on blur the typed string is
          committed as the value.
        </>
      ),
      noteTitle: 'Key behaviors',
      notes: [
        ['options change',              'When the options array changes (different values), the current value is auto-cleared — same as SelectInput. Disable with disableClearOnChangeOptions: true'],
        ['disableClearable',            'Defaults to true — no clear (×) button shown. Set to false to expose the clear button'],
        ['multiple',                    'multiple: true switches value to a string array. Empty initial value is [] not null'],
        ['freeSolo',                    'Allows typing any string not in the list. On blur the typed text is committed. Combine with multiple for a tag-style input'],
        ['loading',                     'loading: true disables the field and replaces the popup icon with a CircularProgress spinner'],
        ['fixed width',                 '207/235/231px by variant unless fullWidth: true'],
      ],
      connectionTitle: 'Internal connections',
      connections: [
        ['options ↔ value',             'On options change, if the stored value no longer matches any option it is auto-cleared (unless disableClearOnChangeOptions: true)'],
        ['freeSolo + onBlur',           'For single freeSolo, the TextField\'s onBlur commits the typed text so value stays in sync even without selecting from the dropdown'],
      ],
      exclusiveTitle: 'Exclusive props',
      exclusiveProps: [
        ['options',                     'Required. Array of { label: string, value: string }'],
        ['multiple',                    'true → multi-select; value becomes string[]'],
        ['freeSolo',                    'Allows arbitrary text; value is the typed string'],
        ['disableClearable',            'Default true. Set false to show the × clear button'],
        ['disableClearOnChangeOptions', 'Prevents auto-clearing value when the options array changes'],
        ['loading',                     'Disables and shows spinner while fetching options'],
        ['defaultValue',                'Initial value on mount and after clear()'],
        ['InputProps',                  'Extra TextFieldProps forwarded to the inner TextField'],
        ['renderInput',                 'Custom render function for the TextField (receives TextFieldProps)'],
      ],
    },
    demos: {
      basic:     { title: 'Basic' },
      variants:  { title: 'Variants + fullWidth',              desc: 'Same fixed-width behavior as other inputs. Use fullWidth: true to stretch.' },
      multiple:  { title: 'Multiple selection',                desc: 'multiple: true allows picking several options. getValue() returns a string array.' },
      freeSolo:  { title: 'freeSolo',                          desc: 'freeSolo: true lets users type any value. Combine with multiple for a tags-style input.' },
      loading:   { title: 'Loading state',                     desc: 'Set loading: true while fetching options. The field is disabled and shows a spinner.' },
      clearable: { title: 'disableClearable: false',           desc: 'By default no clear button is shown. Pass disableClearable: false to expose it.' },
      required:  { title: 'Required & Validation',             desc: 'required: true fails when value is null (or empty array for multiple).' },
      api:       { title: 'API — getValues / setValues / clear', desc: 'getValue returns the selected string value or null.' },
    },
    submit:       'Submit',
    validMsg:     (v: unknown) => `✓  value = ${JSON.stringify(v)}`,
    invalidMsg:   '✗  validation failed',
    fetchBtn:     'Simulate fetch',
    fetching:     'Fetching…',
  },
  fa: {
    pageTitle: 'Autocomplete Input',
    overview: {
      howTitle: 'چطور کار می‌کنه؟',
      howBody: (
        <>
          <code>AutocompleteInput</code> یک MUI <code>Autocomplete</code> +{' '}
          <code>TextField</code> را wrap می‌کند. گزینه‌ها آرایه‌ای از{' '}
          <code>{'{ label, value }'}</code> هستند که <code>value</code> آن‌ها string است.{' '}
          <code>getValue()</code> مقدار انتخاب‌شده، آرایه برای <code>multiple</code>، یا{' '}
          <code>null</code> برمی‌گرداند. با <code>freeSolo</code> کاربر می‌تواند هر متنی تایپ کند.
        </>
      ),
      noteTitle: 'رفتارهای کلیدی',
      notes: [
        ['تغییر options',               'وقتی آرایه options تغییر کند، مقدار جاری خودکار پاک می‌شود — مثل SelectInput. با disableClearOnChangeOptions: true می‌توان غیرفعال کرد'],
        ['disableClearable',            'پیش‌فرض true است — دکمه پاک‌کن (×) نمایش داده نمی‌شود. برای نمایش آن false بگذار'],
        ['multiple',                    'multiple: true مقدار را به آرایه تبدیل می‌کند. مقدار اولیه خالی [] است نه null'],
        ['freeSolo',                    'امکان تایپ هر رشته‌ای را می‌دهد. با onBlur مقدار ثبت می‌شود. با multiple برای ورودی tag-style مناسب است'],
        ['loading',                     'loading: true فیلد را غیرفعال کرده و آیکون popup را با CircularProgress جایگزین می‌کند'],
        ['عرض ثابت',                    '207/235/231px بر اساس variant مگر fullWidth: true باشد'],
      ],
      connectionTitle: 'ارتباطات داخلی',
      connections: [
        ['options ↔ مقدار',             'با تغییر options، اگر مقدار ذخیره‌شده با هیچ گزینه‌ای تطابق نداشته باشد پاک می‌شود (مگر disableClearOnChangeOptions: true)'],
        ['freeSolo + onBlur',           'برای freeSolo تکی، onBlur متن جاری را commit می‌کند — حتی بدون انتخاب از لیست'],
      ],
      exclusiveTitle: 'Props اختصاصی',
      exclusiveProps: [
        ['options',                     'اجباری. آرایه‌ای از { label: string, value: string }'],
        ['multiple',                    'true → چندانتخابی؛ مقدار string[] می‌شود'],
        ['freeSolo',                    'امکان ورودی متن دلخواه؛ مقدار همان رشته تایپ‌شده است'],
        ['disableClearable',            'پیش‌فرض true. برای نمایش دکمه × مقدار false بگذار'],
        ['disableClearOnChangeOptions', 'از پاک شدن خودکار مقدار هنگام تغییر options جلوگیری می‌کند'],
        ['loading',                     'هنگام واکشی options غیرفعال و اسپینر نمایش می‌دهد'],
        ['defaultValue',                'مقدار اولیه هنگام mount و بعد از clear()'],
        ['InputProps',                  'TextFieldProps اضافه که به TextField داخلی پاس می‌شود'],
        ['renderInput',                 'تابع رندر سفارشی برای TextField'],
      ],
    },
    demos: {
      basic:     { title: 'پایه' },
      variants:  { title: 'Variants + fullWidth',              desc: 'همان رفتار عرض ثابت سایر input‌ها. از fullWidth: true برای کشیدن استفاده کن.' },
      multiple:  { title: 'انتخاب چندگانه',                   desc: 'multiple: true انتخاب چند گزینه را ممکن می‌کند. getValue() آرایه‌ای از string برمی‌گرداند.' },
      freeSolo:  { title: 'freeSolo',                          desc: 'freeSolo: true به کاربر اجازه تایپ هر مقداری را می‌دهد. با multiple برای ورودی tag استفاده کن.' },
      loading:   { title: 'حالت loading',                      desc: 'در حین واکشی options مقدار loading: true را ست کن. فیلد غیرفعال و اسپینر نمایش می‌دهد.' },
      clearable: { title: 'disableClearable: false',           desc: 'به صورت پیش‌فرض دکمه پاک‌کن وجود ندارد. با disableClearable: false آن را فعال کن.' },
      required:  { title: 'اجباری و اعتبارسنجی',              desc: 'required: true وقتی مقدار null باشد (یا آرایه خالی برای multiple) خطا می‌دهد.' },
      api:       { title: 'API — getValues / setValues / clear', desc: 'getValue مقدار string انتخاب‌شده یا null را برمی‌گرداند.' },
    },
    submit:       'ارسال',
    validMsg:     (v: unknown) => `✓  مقدار = ${JSON.stringify(v)}`,
    invalidMsg:   '✗  اعتبارسنجی ناموفق',
    fetchBtn:     'شبیه‌سازی واکشی',
    fetching:     'در حال واکشی…',
  },
}

const FRUITS = [
  { label: 'Apple',  value: 'apple'  },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grape',  value: 'grape'  },
  { label: 'Orange', value: 'orange' },
]

const COUNTRIES = [
  { label: 'Iran',          value: 'ir' },
  { label: 'United States', value: 'us' },
  { label: 'Germany',       value: 'de' },
  { label: 'Japan',         value: 'jp' },
]

// ─── Overview ─────────────────────────────────────────────────────────────────

function AutocompleteInputOverview({ lang }: { lang: 'en' | 'fa' }) {
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
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>{ov.connectionTitle}</Typography>
      <Stack spacing={0.8} sx={{ mb: 2 }}>
        {ov.connections.map(([name, desc]) => (
          <Box key={name} sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: '#ede7f6', color: '#512da8', px: 0.8, py: 0.2, borderRadius: 0.5, whiteSpace: 'nowrap', flexShrink: 0 }}>
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
  type: 'autocomplete',
  selector: 'fruit',
  label: 'Fruit',
  options: [
    { label: 'Apple',  value: 'apple'  },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ],
}]}`

function BasicDemo() {
  const { ref } = useFormBuilder()
  return <FormBuilder ref={ref} inputs={[{ type: 'autocomplete', selector: 'fruit', label: 'Fruit', options: FRUITS }]} />
}

// ─── Variants + fullWidth ─────────────────────────────────────────────────────

const variantsCode = `inputs={[
  { type: 'autocomplete', selector: 'a', label: 'Standard  (207px)', options },
  { type: 'autocomplete', selector: 'b', label: 'Outlined (235px)',  options, variant: 'outlined' },
  { type: 'autocomplete', selector: 'c', label: 'Filled   (231px)',  options, variant: 'filled'   },
  { type: 'autocomplete', selector: 'd', label: 'fullWidth',         options, variant: 'outlined', fullWidth: true },
]}`

function VariantsDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <FormBuilder
          ref={ref}
          inputs={[
            { type: 'autocomplete', selector: 'a', label: 'Standard (207px)',  options: FRUITS },
            { type: 'autocomplete', selector: 'b', label: 'Outlined (235px)',  options: FRUITS, variant: 'outlined' },
            { type: 'autocomplete', selector: 'c', label: 'Filled (231px)',    options: FRUITS, variant: 'filled' },
          ]}
        />
      </Stack>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'autocomplete', selector: 'd', label: 'fullWidth: true', options: FRUITS, variant: 'outlined', fullWidth: true }]}
      />
    </Stack>
  )
}

// ─── Multiple selection ───────────────────────────────────────────────────────

const multipleCode = `inputs={[{
  type: 'autocomplete',
  selector: 'fruits',
  label: 'Fruits',
  options: [...],
  multiple: true,       // value becomes string[]
  variant: 'outlined',
  fullWidth: true,
}]}

// getValue() → ['apple', 'cherry']  (string array)`

function MultipleDemo() {
  const { ref, getValues } = useFormBuilder()
  const [output, setOutput] = useState<string | null>(null)
  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'autocomplete', selector: 'fruits', label: 'Fruits (pick multiple)',
          options: FRUITS, multiple: true, variant: 'outlined', fullWidth: true,
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

// ─── freeSolo ─────────────────────────────────────────────────────────────────

const freeSoloCode = `// Single freeSolo — type any text, committed on blur
{ type: 'autocomplete', selector: 'tag', label: 'Tag (freeSolo)',
  options: [...], freeSolo: true, variant: 'outlined' }

// Multiple freeSolo — tag-style input
{ type: 'autocomplete', selector: 'tags', label: 'Tags',
  options: [...], freeSolo: true, multiple: true,
  variant: 'outlined', fullWidth: true }`

function FreeSoloDemo() {
  const { ref: ref1 } = useFormBuilder()
  const { ref: ref2 } = useFormBuilder()
  return (
    <Stack spacing={3}>
      <FormBuilder
        ref={ref1}
        inputs={[{
          type: 'autocomplete', selector: 'tag', label: 'Single freeSolo (type any text)',
          options: FRUITS, freeSolo: true, variant: 'outlined',
        }]}
      />
      <FormBuilder
        ref={ref2}
        inputs={[{
          type: 'autocomplete', selector: 'tags', label: 'Multiple freeSolo (tags)',
          options: FRUITS, freeSolo: true, multiple: true, variant: 'outlined', fullWidth: true,
        }]}
      />
    </Stack>
  )
}

// ─── Loading ──────────────────────────────────────────────────────────────────

const loadingCode = `const [options, setOptions] = useState([])
const [loading, setLoading] = useState(false)

const fetch = async () => {
  setLoading(true)
  await delay(1500)         // simulate API call
  setOptions([...])
  setLoading(false)
}

inputs={[{
  type: 'autocomplete',
  selector: 'country',
  label: 'Country',
  options,
  loading,              // disables + shows spinner
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
          type: 'autocomplete', selector: 'country', label: 'Country',
          options, loading, variant: 'outlined', fullWidth: true,
        }]}
      />
      <Button size="small" variant="outlined" onClick={handleFetch} disabled={loading} sx={{ alignSelf: 'flex-start' }}>
        {loading ? T.fetching : T.fetchBtn}
      </Button>
    </Stack>
  )
}

// ─── disableClearable ─────────────────────────────────────────────────────────

const clearableCode = `// default: disableClearable is true — no × button
{ type: 'autocomplete', selector: 'a', label: 'No clear (default)', options }

// disableClearable: false — shows the × button when a value is selected
{ type: 'autocomplete', selector: 'b', label: 'With clear button',
  options, disableClearable: false, variant: 'outlined' }`

function ClearableDemo() {
  const { ref } = useFormBuilder()
  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <FormBuilder
        ref={ref}
        inputs={[
          { type: 'autocomplete', selector: 'a', label: 'No clear (default)',  options: FRUITS },
          { type: 'autocomplete', selector: 'b', label: 'With clear button',   options: FRUITS, disableClearable: false, variant: 'outlined' },
        ]}
      />
    </Stack>
  )
}

// ─── Required ─────────────────────────────────────────────────────────────────

const requiredCode = `inputs={[{
  type: 'autocomplete',
  selector: 'fruit',
  label: 'Fruit',
  options: [...],
  required: true,
  variant: 'outlined',
  fullWidth: true,
}]}`

function RequiredDemo({ lang }: { lang: 'en' | 'fa' }) {
  const { ref, getValues } = useFormBuilder<{ fruit: string | null }>()
  const [result, setResult] = useState<string | null>(null)
  const T = t[lang]

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{
          type: 'autocomplete', selector: 'fruit', label: 'Fruit', required: true,
          options: FRUITS, variant: 'outlined', fullWidth: true,
        }]}
      />
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button variant="contained" size="small" onClick={() => {
          const { data, validation } = getValues()
          setResult(validation.status ? T.validMsg(data.fruit) : T.invalidMsg)
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
  fruit: string | null
}>()

const { data } = getValues(false)
console.log(data.fruit)   // 'apple' | 'banana' | ... | null

await setValues({ fruit: 'cherry' })   // must match an option value
await clear()                           // resets to defaultValue or null`

function ApiDemo() {
  const { ref, getValues, setValues, clear } = useFormBuilder<{ fruit: string | null }>()
  const [output, setOutput] = useState<string | null>(null)

  return (
    <Stack spacing={2}>
      <FormBuilder
        ref={ref}
        inputs={[{ type: 'autocomplete', selector: 'fruit', label: 'Fruit', options: FRUITS, variant: 'outlined', fullWidth: true }]}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Button size="small" variant="outlined" onClick={() =>
          setOutput(JSON.stringify(getValues(false).data, null, 2))
        }>getValues</Button>
        <Button size="small" variant="outlined" onClick={async () => {
          await setValues({ fruit: 'cherry' })
          setOutput(null)
        }}>setValues('cherry')</Button>
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

function AutocompleteInputContent({ lang }: { lang: 'en' | 'fa' }) {
  const d = t[lang].demos
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t[lang].pageTitle}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          <Chip label='type: "autocomplete"' size="small" variant="outlined" />
          <Chip label="value: string | string[] | null" size="small" variant="outlined" />
          <Chip label="options: required" size="small" variant="outlined" color="warning" />
          <Chip label="options change → clear" size="small" variant="outlined" />
          <Chip label="freeSolo" size="small" variant="outlined" />
        </Stack>
        <AutocompleteInputOverview lang={lang} />
      </Box>

      <DemoSection title={d.basic.title} code={basicCode}>
        <BasicDemo />
      </DemoSection>

      <DemoSection title={d.variants.title} description={d.variants.desc} code={variantsCode}>
        <VariantsDemo />
      </DemoSection>

      <DemoSection title={d.multiple.title} description={d.multiple.desc} code={multipleCode}>
        <MultipleDemo />
      </DemoSection>

      <DemoSection title={d.freeSolo.title} description={d.freeSolo.desc} code={freeSoloCode}>
        <FreeSoloDemo />
      </DemoSection>

      <DemoSection title={d.loading.title} description={d.loading.desc} code={loadingCode}>
        <LoadingDemo lang={lang} />
      </DemoSection>

      <DemoSection title={d.clearable.title} description={d.clearable.desc} code={clearableCode}>
        <ClearableDemo />
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

export default function AutocompleteInputPage() {
  const { lang } = useLang()
  return <AutocompleteInputContent lang={lang} />
}
