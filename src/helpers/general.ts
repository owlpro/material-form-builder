export const randomString = (length: number) => {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

export const mask = (value: string, pattern: string, placeholder = '') => {
    let i = 0,
        v = value.toString()
    return pattern.replace(/\./g, (_) => v[i++] || placeholder)
}

export const isArray = (data: any): boolean => {
    return Array.isArray(data)
}

export const isNull = (data: any): boolean => {
    return data === null
}

export const checkValue = (value: any): boolean => {
    if(value === null) return false;
    if(value === undefined) return false;
    return true;
}

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const selectFromObject = (selector: string, data: any) => {
    const regex = new RegExp('.*[.*=.*]')
    let splitSelector = selector.split('.')
    let workingObject = data
    splitSelector.forEach((selectorItem): void => {
        if (!workingObject) workingObject = {}
        if (regex.test(selectorItem)) {
            const objectBeforeQuery = selectorItem.replace(/\[.*\]/g, '')
            if (objectBeforeQuery) {
                workingObject = workingObject[objectBeforeQuery]
            }
            if(!Array.isArray(workingObject)) return;
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
