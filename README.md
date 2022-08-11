<!-- markdownlint-disable-next-line -->
<p align="center">
  <a href="https://mui.com/" rel="noopener" target="_blank">
  <img width="150" src="https://raw.githubusercontent.com/mui/material-ui/master/docs/public/static/logo.svg" alt="MUI logo"></a>
</p>
<h1 align="center">Pishdeh</h1>

**pishdeh-form-builder** is easy form builder Based on material ui 5 (**MUI**)

## Installation

### Material UI

Material UI is available as an [npm package](https://www.npmjs.com/package/@mui/material).

### Pishdeh Form Builder

**npm:**

```sh
npm install @owlpro/pishdeh-form-builder
```

**yarn:**

```sh
yarn add @owlpro/pishdeh-form-builder
```

**basic usage:**

```ts
import React, { useRef } from 'react'
import { FormBuilder } from '@owlpro/pishdeh-form-builder'

const App = () => {
    const builderRef = useRef(null);
    const getValues = () => {
        const values = builderRef.getValues();
        console.log(values)
        /**
         * output 
         * {
         *     data: {
         *         person_name: 'ENTERED VALUE'
         *         person_family: 'ENTERED VALUE'
         *     },
         *     validation: {
         *         status: boolean,
         *         inputs: []
         *      }
         * }
         */
    }

    const clear = () => {
        builderRef.clear().then(() => {
            console.log('end clear process')
        })
    }

    return (
        <>
            <button onClick={getValues}>Get Values</button>
            <button>Clear</button>

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
        </>
    )
}
```
