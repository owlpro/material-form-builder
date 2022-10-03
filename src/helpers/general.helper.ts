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
