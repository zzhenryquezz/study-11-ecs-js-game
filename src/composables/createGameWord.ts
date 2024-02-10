import { createWorld } from 'bitecs'

export function createGameWord(){
    const width = 1600
    const height = 1200

    const originalScale = width / height
    const targetScale = window.innerWidth / window.innerHeight

    let screenWidth = width
    let screenHeight = height

    // decrease width or height
    if (window.innerWidth <= width || window.innerHeight <= height) {
        if (targetScale < originalScale) {
            screenWidth = window.innerWidth
            screenHeight = screenWidth / originalScale
        } else {
            screenHeight = window.innerHeight
            screenWidth = screenHeight * originalScale
        }
    }

    return createWorld({
        keyboard: {} as Record<KeyboardEvent['code'], boolean>,
        tiles: {
            size: 32,
        },
        screen: {
            width: screenWidth,
            height: screenHeight
        },
        time: {
            delta: 0,
            elapsed: 0,
            then: performance.now()
        },
    })
}

export type GameWord = ReturnType<typeof createGameWord>