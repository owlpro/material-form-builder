export const selectFromObject = (selector: string, data: any) => {
    const regex = new RegExp('.*[.*=.*]')
    let splitSelector = selector.split('.')
    let workingObject = data
    splitSelector.forEach((selectorItem) => {
        if (!workingObject) workingObject = {}
        if (regex.test(selectorItem)) {
            const objectBeforeQuery = selectorItem.replace(/\[.*\]/g, '')
            if (objectBeforeQuery) {
                workingObject = workingObject[objectBeforeQuery]
            }
            if(!Array.isArray(workingObject)) return false;
            const splitQuery = selectorItem.replace(/.*\[|\]/g, '').split('=')
            const queryKey = splitQuery[0].trim()
            const queryValue = isNaN(parseInt(splitQuery[1])) ? splitQuery[1] : parseInt(splitQuery[1])
            workingObject = workingObject.find((ob: any) => ob[queryKey] === queryValue)
        } else {
            workingObject = workingObject[selectorItem]
        }
    })
    return workingObject
}

export const setToObject = (selector: string, value: any, object: any) => {
    // value = typeof value !== 'boolean' && !Array.isArray(value) && value && !isNaN(value) ? parseInt(value, 10) : value
    const regex = new RegExp('.*[.*=.*]')
    let splitSelector = selector.split('.')
    if (splitSelector.length > 1) {
        let workingObject = object
        splitSelector.forEach((selectorItem, index) => {
            const isLast = splitSelector.length === index + 1
            if (regex.test(selectorItem)) {
                const replacedSelectorItem = selectorItem.replace(/\[.*\]/, '')
                if (!workingObject.hasOwnProperty(replacedSelectorItem)) workingObject[replacedSelectorItem] = []
                const splitQuery = selectorItem.replace(/.*\[|\]/g, '').split('=')
                const queryKey = splitQuery[0].trim()
                const queryValue = isNaN(parseInt(splitQuery[1])) ? splitQuery[1] : parseInt(splitQuery[1])
                const exists = workingObject[replacedSelectorItem].find((item: any) => item[queryKey] === queryValue)
                if (exists) {
                    workingObject = exists
                } else {
                    const newObject = { [queryKey]: queryValue }
                    workingObject[replacedSelectorItem].push(newObject)
                    workingObject = newObject
                }
            } else {
                if (isLast) {
                    workingObject[selectorItem] = value
                } else {
                    if (!workingObject.hasOwnProperty(selectorItem)) workingObject[selectorItem] = {}
                    workingObject = workingObject[selectorItem]
                }
            }
        })
    } else {
        object[selector] = value
    }
    return object
}
