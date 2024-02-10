export function unFlatten<T = any>(array: any[], size: number) {
    const flat = array.slice()

    const result = [] as T[]

    while (flat.length > 0) {
        result.push(flat.splice(0, size) as T)
    }

    return result
}