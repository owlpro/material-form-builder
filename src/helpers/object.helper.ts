
export const setToObject = (selector: string, value: any, object: any) => {
    value = isNaN(value) ? value : parseInt(value, 10)
    const regex = new RegExp('.*[.*=.*]')
    let splitSelector = selector.split('.')
    if (splitSelector.length > 1) {
        let workingObject = object
        splitSelector.forEach((selectorItem, index) => {
            const isLast = splitSelector.length === index + 1;
            if(regex.test(selectorItem)){
                const replacedSelectorItem = selectorItem.replace(/\[.*\]/, '');
                if(!workingObject.hasOwnProperty(replacedSelectorItem)) workingObject[replacedSelectorItem] = []
                const splitQuery = selectorItem.replace(/.*\[|\]/g, '').split('=')
                const queryKey = splitQuery[0].trim()
                const queryValue = isNaN(parseInt(splitQuery[1])) ? splitQuery[1] : parseInt(splitQuery[1])
                const exists = workingObject[replacedSelectorItem].find((item: any) => item[queryKey] === queryValue);
                if(exists) {
                    workingObject = exists;
                } else {
                    const newObject = { [queryKey]: queryValue  }
                    workingObject[replacedSelectorItem].push(newObject)
                    workingObject = newObject;
                }
            } else {
                if(isLast) {
                    workingObject[selectorItem] = value;
                } else {
                    if(!workingObject.hasOwnProperty(selectorItem)) workingObject[selectorItem] = {}
                    workingObject = workingObject[selectorItem]
                }
            }
        })
    } else {
        object[selector] = value
    }
    return object
}


const data = {};


// setToObject('normal', 'normal-data', data)
// setToObject('normal-number', '12121212', data)

// setToObject('profile.name', 'mmd', data)
// setToObject('profile.family', 'solpaleh', data)
// setToObject('profile.foo.naming', 'solpaleh', data)
// setToObject('profile.foo.bar.1', 'solpaleh', data)
// setToObject('profile.foo.bar.2', 'solpaleh', data)
// setToObject('profile.foo.bar.3', 'solpaleh', data)
// setToObject('profile.foo.bar.baz.baq.ban', 'solpaleh', data)



// setToObject('foo.settings[id=1].value[id=2].foo', 'value-array', data)
// setToObject('foo.settings[id=1].pivot.id[id=2].foo', 'pivot_id', data)
// setToObject('settings[id=1].title', 'title', data)
// setToObject('settings[id=1].subtitle', 'subtitle', data)

setToObject('profile.settings[id=2].value', '10000', data)
setToObject('profile.settings[id=2].title', 'title', data)
setToObject('profile.settings[id=2].subtitle', 'subtitle', data)
setToObject('profile.settings[id=2].extra.key1', 'extra1', data)
setToObject('profile.settings[id=2].extra.key2', 'extra2', data)
setToObject('profile.settings[id=2].extra2[id=1].foo', 'extra3', data)
// setToObject('profile.settings[id=2].extra.key2.items[id=1].value', 'test item', data)

console.log("output: ", data)
