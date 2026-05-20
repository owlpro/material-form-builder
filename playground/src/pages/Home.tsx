import { Box, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'

const INPUT_GROUPS = [
  {
    group: { en: 'Text-based', fa: 'متنی' },
    color: '#e8f5e9',
    textColor: '#2e7d32',
    items: [
      { type: 'text',     en: 'MUI TextField — with formatter and autoDirection',             fa: 'MUI TextField — با formatter و autoDirection' },
      { type: 'number',   en: 'MUI TextField — numeric only, value is number | null',         fa: 'MUI TextField — فقط عدد، مقدار از نوع number | null' },
      { type: 'password', en: 'TextField with show/hide toggle',                              fa: 'TextField با دکمه نمایش / مخفی' },
      { type: 'mask',     en: 'Fixed-pattern input (e.g. date, national ID)',                 fa: 'ورودی با الگوی ثابت (مثلاً تاریخ یا کدملی)' },
    ],
  },
  {
    group: { en: 'Selection', fa: 'انتخابی' },
    color: '#e3f2fd',
    textColor: '#1565c0',
    items: [
      { type: 'select',       en: 'MUI Select with options and loading state',                fa: 'MUI Select با options و loading state' },
      { type: 'autocomplete', en: 'MUI Autocomplete — multi-select and async options',        fa: 'MUI Autocomplete — multi-select و async options' },
      { type: 'toggle',       en: 'MUI ToggleButtonGroup with options array',                 fa: 'MUI ToggleButtonGroup با آرایه options' },
      { type: 'checkbox',     en: 'MUI Checkbox',                                             fa: 'MUI Checkbox' },
      { type: 'switch',       en: 'MUI Switch — value is boolean',                            fa: 'MUI Switch — مقدار از نوع boolean' },
    ],
  },
  {
    group: { en: 'Date & Time', fa: 'تاریخ و زمان' },
    color: '#fce4ec',
    textColor: '#880e4f',
    items: [
      { type: 'date',     en: 'MUI DatePicker (dayjs)',     fa: 'MUI DatePicker (dayjs)' },
      { type: 'time',     en: 'MUI TimePicker (dayjs)',     fa: 'MUI TimePicker (dayjs)' },
      { type: 'datetime', en: 'MUI DateTimePicker (dayjs)', fa: 'MUI DateTimePicker (dayjs)' },
    ],
  },
  {
    group: { en: 'Special', fa: 'خاص' },
    color: '#fff8e1',
    textColor: '#e65100',
    items: [
      { type: 'mobile', en: 'Phone number with country code selector and auto mask', fa: 'شماره موبایل با کد کشور و mask خودکار' },
      { type: 'otp',    en: 'One-time password input with auto-focus between cells', fa: 'ورودی OTP با focus خودکار بین خانه‌ها' },
      { type: 'file',   en: 'File upload with drag & drop',                          fa: 'آپلود فایل با drag & drop' },
    ],
  },
  {
    group: { en: 'Layout', fa: 'ساختاری' },
    color: '#f3e5f5',
    textColor: '#6a1b9a',
    items: [
      { type: 'items',  en: 'Repeatable rows of inputs — add / remove / copy each row', fa: 'ردیف‌های تکرارپذیر — افزودن / حذف / کپی هر ردیف' },
      { type: 'group',  en: 'Nested input group with object output',                     fa: 'گروه‌بندی تودرتو با خروجی آبجکت' },
      { type: 'custom', en: 'Bring-your-own component — expose setValue / getValue / clear', fa: 'کامپوننت دلخواه — فقط setValue / getValue / clear را export کن' },
    ],
  },
]

const SHARED_PROPS = [
  { name: 'selector',        en: 'Unique key in output — supports dot notation (e.g. "address.city")',                        fa: 'کلید یکتا در خروجی — از dot notation پشتیبانی می‌کند (مثلاً "address.city")' },
  { name: 'required',        en: 'Validation — getValues(true) marks it invalid if empty, field flashes red for 3s',         fa: 'اعتبارسنجی — اگر خالی باشد getValues(true) آن را invalid می‌کند، field 3 ثانیه قرمز می‌شود' },
  { name: 'visible',         en: 'Show/hide dynamically — can be a function that receives current form data',                 fa: 'نمایش/مخفی داینامیک — می‌تواند تابعی باشد که داده‌های فرم دریافت می‌کند' },
  { name: 'wrapper',         en: 'Custom layout wrapper around the input — receives actions (setValue, getValue, …)',         fa: 'wrapper سفارشی دور input — با دسترسی به actions (setValue, getValue, …)' },
  { name: 'defaultValue',    en: 'Initial value on mount and after clear()',                                                  fa: 'مقدار اولیه هنگام mount و بعد از clear()' },
  { name: 'onChangeValue',   en: 'Callback with the new value — no event object needed',                                      fa: 'callback با مقدار جدید — بدون نیاز به event object' },
  { name: 'getMutator',      en: 'Transforms the value before it is returned by getValues()',                                 fa: 'مقدار را قبل از بازگشت توسط getValues() تبدیل می‌کند' },
  { name: 'setMutator',      en: 'Transforms the value before it is applied by setValues()',                                  fa: 'مقدار را قبل از اعمال توسط setValues() تبدیل می‌کند' },
  { name: 'updateListener',  en: 'Re-renders the input whenever a dependency in the array changes',                           fa: 'هر بار که یکی از dependency‌های آرایه تغییر کند input را re-render می‌کند' },
  { name: 'reactKey',        en: 'Override the React key used for the input — useful when selector changes',                  fa: 'کلید React برای input را override می‌کند — مفید وقتی selector تغییر می‌کند' },
]

const t = {
  en: {
    title: 'material-form-builder',
    subtitle: 'A dynamic, composable, and type-safe React form builder built on top of MUI. Every input is a real MUI component connected to the FormBuilder — no hidden wrappers, no magic behavior.',
    inputTypes: 'Input types',
    sharedProps: 'Shared props (BaseInput)',
    sharedPropsDesc: 'Every input extends BaseInput. These props work on all 18 types:',
    start: '→ Start with Text Input',
    sidebarHint: 'Pick an input from the sidebar to see live demos and code.',
  },
  fa: {
    title: 'material-form-builder',
    subtitle: 'یک form builder داینامیک، قابل ترکیب و type-safe روی MUI. هر input یک کامپوننت واقعی MUI است که به FormBuilder متصل شده — بدون wrapper مخفی، بدون رفتار جادویی.',
    inputTypes: 'انواع input',
    sharedProps: 'Props مشترک (BaseInput)',
    sharedPropsDesc: 'تمام input‌ها از BaseInput ارث می‌برند. این props روی هر ۱۸ نوع کار می‌کنند:',
    start: 'شروع با Text Input ←',
    sidebarHint: 'از sidebar یک input انتخاب کن تا demo و کد کامل آن را ببینی.',
  },
}

function HomeContent() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const T = t[lang]

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {T.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: 620 }}>
        {T.subtitle}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 5 }}>
        <Chip label="MUI v6" size="small" variant="outlined" />
        <Chip label="TypeScript" size="small" variant="outlined" />
        <Chip label="React ≥17" size="small" variant="outlined" />
        <Chip label="18 input types" size="small" variant="outlined" />
      </Stack>

      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        {T.inputTypes}
      </Typography>
      <Stack spacing={2} sx={{ mb: 5 }}>
        {INPUT_GROUPS.map((group) => (
          <Paper key={group.group.en} variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: group.textColor,
                display: 'block',
                mb: 1.5,
              }}
            >
              {group.group[lang]}
            </Typography>
            <Stack spacing={0.8}>
              {group.items.map((item) => (
                <Box key={item.type} sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: 'monospace',
                      bgcolor: group.color,
                      color: group.textColor,
                      px: 0.8,
                      py: 0.2,
                      borderRadius: 0.5,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      minWidth: 90,
                      textAlign: 'center',
                    }}
                  >
                    {item.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item[lang]}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
        {T.sharedProps}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {T.sharedPropsDesc}
      </Typography>
      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, mb: 5 }}>
        <Stack spacing={0.8}>
          {SHARED_PROPS.map((p) => (
            <Box key={p.name} sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'monospace',
                  bgcolor: '#f5f5f5',
                  color: '#333',
                  px: 0.8,
                  py: 0.2,
                  borderRadius: 0.5,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  minWidth: 110,
                  textAlign: 'center',
                }}
              >
                {p.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {p[lang]}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>

      <Divider sx={{ mb: 3 }} />
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {T.sidebarHint}
      </Typography>
      <Chip
        label={T.start}
        color="primary"
        clickable
        onClick={() => navigate('/inputs/text')}
        sx={{ mt: 1 }}
      />
    </Box>
  )
}

export default function Home() {
  return <HomeContent />
}
