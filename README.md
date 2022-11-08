<!-- markdownlint-disable-next-line -->
<p align="center">
  <a href="https://mui.com/" rel="noopener" target="_blank">
  <img width="150" src="https://raw.githubusercontent.com/mui/material-ui/master/docs/public/static/logo.svg" alt="MUI logo"></a>
</p>

<h2 align="center" style="font-weight: 800; letter-spacing: 1px;font-size: 32px;">material form builder (MFB)</h2>

## Quick Access

-   [Component Props](#component-props) | [getValues](#get-values-prop) | [setValues](#set-values-prop) | [clear](#clear-prop)
-   [Type Of Inputs](#type-of-inputs)

# **introduction**

<p>In react, we are always involved in implementing a structure to receive information from the user
The implementation of these structures may take us a lot of time
My goal is to minimize this time
You can create a branch of inputs with different structures with a few lines of code.</p>

# Installation

## Dependencies

Material UI (^5.x.x) is available as an [npm package](https://www.npmjs.com/package/@mui/material).

```sh
npm install @mui/material @mui/x-date-pickers @mui/icons-material @emotion/react @emotion/styled dayjs
```

## material-form-builder

**npm:**

```sh
npm install material-form-builder
```

**yarn:**

```sh
yarn add material-form-builder
```

**basic usage:**

```js
import React, { useRef } from 'react'
import { FormBuilder } from 'material-form-builder'

const App = () => {
    const builderRef = useRef(null)
    const getValues = () => {
        const values = builderRef.current?.getValues()
    }
    const clear = () => {
        builderRef.current?.clear()
    }
    return (
        <Fragment>
            <Box>
                <FormBuilder
                    inputs={[
                        {
                            type: 'text',
                            selector: 'person_name',
                            label: 'Name',
                        },
                        {
                            type: 'text',
                            selector: 'person_family',
                            label: 'Family',
                        },
                    ]}
                    ref={builderRef}
                />
            </Box>
            <Box mt={1}>
                <Button color="success" onClick={getValues}>
                    Get
                </Button>
                <Button color="secondary" onClick={setValues}>
                    Set
                </Button>
                <Button color="primary" onClick={clear}>
                    clear
                </Button>
            </Box>
        </Fragment>
    )
}
```

<p align="center" background="silver" style="background-color: #fff;">
    <img src="docs/images/1.png">
</p>
<hr>

## Component Props:

| key    | description | link                     |
| ------ | ----------- | ------------------------ |
| inputs | inputs data | [usage](#type-of-inputs) |
| ref    | react ref   | -                        |

## Ref Avilable Methods:

| key       | description                      | usage                     |
| --------- | -------------------------------- | ------------------------- |
| getValues | get value data from form builder | [usage](#get-values-prop) |
| setValues | set your data into inputs        | [usage](#set-values-prop) |
| clear     | clear all inputs data            | [usage](#clear-prop)      |

<hr>

## Get Values Prop

`builderRef.current?.getValues()` usage:

```js
{
    data: {
        person_name: 'ENTERED VALUE'
        person_family: 'ENTERED VALUE'
    },
    validation: {
        status: boolean,
        inputs: []
    }
}
```

<hr>

## Set Values Prop

`builderRef.current?.setValues()` usage:

```js
builderRef.current
    ?.setValues({
        tid: 1,
        person_name: 'john',
        person_family: 'doe',
    })
    .then(() => {
        console.log('all promises were fulfilled !')
    })
```

### The data entered in the inputs will be set and if additional values are received, they will be returned

<p align="center" background="silver" style="background-color: #fff;">
    <img src="docs/images/3.gif">
</p>
<hr>

## Clear Prop

`builderRef.current?.clear()` usage:

```js
builderRef.current?.clear().then(() => {
    console.log('all promises were fulfilled !')
})
```

# Type Of Inputs

| type         | description        | usage                                                   |
| ------------ | ------------------ | ------------------------------------------------------- |
| text         | text input         | [text input usage](docs/inputs/text.md)                 |
| number       | number input       | [number input usage](docs/inputs/number.md)             |
| checkbox     | checkbox input     | [checkbox input usage](docs/inputs/checkbox.md)         |
| password     | password input     | [password input usage](docs/inputs/password.md)         |
| autocomplete | autocomplete input | [autocomplete input usage](docs/inputs/autocomplete.md) |
| mobile       | mobile input       | [mobile input usage](docs/inputs/mobile.md)             |
| otp          | otp input          | [otp input usage](docs/inputs/otp.md)                   |
| mask         | mask input         | [mask input usage](docs/inputs/mask.md)                 |
| date         | date input         | [date input usage](docs/inputs/date.md)                 |
| time         | time input         | [time input usage](docs/inputs/time.md)                 |
| datetime     | datetime input     | [datetime input usage](docs/inputs/datetime.md)         |
| file         | file input         | [file input usage](docs/inputs/file.md)                 |
| items        | items input        | [items input usage](docs/inputs/items.md)               |
| custom       | custom input       | [custom input usage](docs/inputs/custom.md)             |

<br>

# Basic Input Props

| key           | type             | description | sample |
| ------------- | ---------------- | ----------- | ------ |
| selector      | string           | -           | -      |
| defaultValue  | Input Value Type | -           | -      |
| required      | boolean          | -           | -      |
| visible       | boolean          | -           | -      |
| wrapper       | function         | -           | -      |
| onChangeValue | function         | -           | -      |
| getMutator    | function         | -           | -      |
| setMutator    | function         | -           | -      |

# License

This project is licensed under the terms of the [MIT license.]()

# Sponsoring services

[mentasystem.net](https://mentasystem.net/)

<a href="#quick-access">back to top</a>
