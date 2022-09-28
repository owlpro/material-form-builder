# Text Input

text input based on material ui [Text Field](https://mui.com/material-ui/react-text-field/) v5

## usage:

```js
{
    type: 'text',
    selector: 'selector-key',
    label: 'input selector',
}
```

<p align="center" background="silver" style="background-color: #fff;">
    <img src="../images/text.gif">
</p>

## Exclusive Props

| key       | type     | description              | sample                                                         |
| --------- | -------- | ------------------------ | -------------------------------------------------------------- |
| formatter | function | format user entry        | [sample](#formatter-prop-sample)                               |
| mui props | any      | all mui text input props | [mui props](https://mui.com/material-ui/api/text-field/#props) |

# formatter prop sample

```js
{
    type: 'text',
    selector: 'selector-key',
    label: 'input selector',
    formatter: (value) => {
        return value.replace(/[^a-zA-Z ]/g, '')
    }
}
```
