---
name: doc-input
description: Generate a complete playground page for a material-form-builder input type (autocomplete, toggle, switch, etc.). Use when adding a new input documentation page to the playground.
argument-hint: "[input-type]"
---

# doc-input

Generate a complete playground documentation page for a `material-form-builder` input type.

## Usage

```
/doc-input <type>
```

Where `<type>` is one of: `autocomplete`, `toggle`, `switch`, `checkbox`, `date`, `time`, `datetime`, `mobile`, `otp`, `file`, `items`, `group`, `custom`

## What this skill does

1. Reads the input's source files to understand its implementation
2. Reads the existing markdown doc if available
3. Generates a full `<Type>InputPage.tsx` in `playground/src/pages/inputs/`
4. Updates `playground/src/App.tsx` to add the import + route
5. Updates `playground/src/components/Layout.tsx` to set `available: true`

---

## Instructions

You are generating a playground documentation page for input type: **$ARGUMENTS**

### Step 1 — Read source files

Read these files in parallel:
- `src/inputs/$ARGUMENTS/index.tsx`
- `src/inputs/$ARGUMENTS/types.d.ts`
- `docs/inputs/$ARGUMENTS.md` (if it exists — ok if missing)

Also read one existing page as a reference pattern (pick one you haven't recently generated):
- `playground/src/pages/inputs/SelectInputPage.tsx`

### Step 2 — Understand the input

From the source files, identify:
- What MUI component(s) it wraps
- The value type (what `getValue()` returns)
- All exclusive props (beyond base `BaseInput`)
- Key behaviors (side effects, edge cases, gotchas)
- Which demos would best illustrate its features

### Step 3 — Generate `playground/src/pages/inputs/<PascalType>InputPage.tsx`

Follow **exactly** the same structure as the reference pages. Rules:

**File structure:**
```
imports
translations object (t)  ← bilingual en + fa
Overview component
Demo functions + code strings (one pair per demo)
<Type>InputContent component
export default <Type>InputPage
```

**Translations object `t`:**
- Must have both `en` and `fa` keys
- `overview` section: `howTitle`, `howBody` (JSX), then input-specific sections (diffs/notes/connections as appropriate), `exclusiveTitle`, `exclusiveProps`
- `demos` object: one entry per demo with `title` and optional `desc`
- Common strings: `submit`, `validMsg`, `invalidMsg`, `currentValue` (add only what demos actually need)
- Persian translations must be fluent and complete — no placeholder text

**Overview component:**
- Named `<PascalType>InputOverview`
- `Paper variant="outlined"` with `bgcolor: '#f9fafb'`
- Follow the color scheme: purple `#ede7f6 / #512da8` for internal connections, orange `#fff3e0 / #e65100` for diffs/notes, green `#e8f5e9 / #2e7d32` for exclusive props

**Demos to include (adapt based on the input type):**
- `Basic` — minimal working example
- `Variants + fullWidth` — if the input supports MUI variants
- Type-specific feature demos (2–5 demos showing key props/behaviors)
- `Required & Validation` — show `required: true` + button that calls `getValues()`
- `API — getValues / setValues / clear` — full programmatic control

**Each demo pair:**
- `const <name>Code` string — clean, copy-pasteable code snippet
- `function <Name>Demo` — live React component using `useFormBuilder`

**Page component:**
- Named `<PascalType>InputContent({ lang })`
- Header with `Typography variant="h5"`, type chip + value-type chip + notable-behavior chips
- Call `<PascalType>InputOverview lang={lang} />`
- One `<DemoSection ... />` per demo

**Export:**
```tsx
export default function <PascalType>InputPage() {
  const { lang } = useLang()
  return <<PascalType>InputContent lang={lang} />
}
```

**Code quality rules:**
- All imports from `'material-form-builder'` and `'../../components/DemoSection'` and `'../../contexts/LangContext'`
- No comments unless behavior is non-obvious
- Demos must actually work — no placeholder logic
- `useFormBuilder<T>()` with typed generics where the value type is known

### Step 4 — Update `playground/src/App.tsx`

Add:
```tsx
import <PascalType>InputPage from './pages/inputs/<PascalType>InputPage'
// in Routes:
<Route path="/inputs/$ARGUMENTS" element={<<PascalType>InputPage />} />
```

### Step 5 — Update `playground/src/components/Layout.tsx`

Find the item for this input type and change `available: false` → `available: true`.

### Step 6 — Confirm

After writing all three files, output a one-line summary:
```
✓ <Type>InputPage.tsx created — route /inputs/<type> is now live
```
