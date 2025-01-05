import { ObjectLiteral } from "../types/helper.types"

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

export const stringify = (obj: ObjectLiteral): string => {
    let cache: any = []
    let str = JSON.stringify(obj, function (_, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return
            }
            // Store value in our collection
            cache.push(value)
        }
        return value
    })
    cache = null // reset the cache
    return str
}