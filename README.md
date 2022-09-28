<!-- markdownlint-disable-next-line -->
<p align="center">
  <a href="https://mui.com/" rel="noopener" target="_blank">
  <img width="150" src="https://raw.githubusercontent.com/mui/material-ui/master/docs/public/static/logo.svg" alt="MUI logo"></a>
</p>

<h2 align="center" style="font-weight: 800; letter-spacing: 1px;font-size: 32px;">material form builder (MFB)</h2>


<a href="#quick-access" style="position: fixed;right:0;bottom:0">move to up</a>

## quick access

- [Component Props](#component-props)
    - [getValues](#get-values-prop)
    - [setValues](#set-values-prop)
    - [clear](#clear-prop)

# **introduction**

<p>In react, we are always involved in implementing a structure to receive information from the user
The implementation of these structures may take us a lot of time
My goal is to minimize this time
You can create a branch of inputs with different structures with a few lines of code.</p>

# Installation

## dependencies

Material UI (^5.x.x) is available as an [npm package](https://www.npmjs.com/package/@mui/material).

```sh
npm install @mui/material @mui/x-date-pickers @mui/icons-material @emotion/styled dayjs
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
| key  | description | usage |
| --- | --- | --- |
| getValues  | get value data from form builder | [usage](#get-values-prop) |
| setValues  | set your data into inputs | [usage](#set-values-prop) |
| clear  | clear all inputs data  | [usage](#clear-prop) |

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
        id: 1,
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
builderRef.current
    ?.clear().then(() => {
        console.log('all promises were fulfilled !')
    })
```

<br>

# License
This project is licensed under the terms of the [MIT license.](LICENCE)

# Sponsoring services
[mentasystem.net](https://mentasystem.net/)

