
const encoder = new TextEncoder()
const decoder = new TextDecoder()

export function encode(text: string) {
    return encoder.encode(text)
}

export function decode(buffer: Uint8Array) {
    return decoder.decode(buffer)
}