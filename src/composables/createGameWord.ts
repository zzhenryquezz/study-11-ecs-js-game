import { createWorld } from 'bitecs'

export function createGameWord(){

    const tiles = {
        size: 32,
    }

    const screen = {
        width: 1600,
        height: 1200,
        scale: .5
    }

    const time = {
        delta: 0,
        elapsed: 0,
        then: performance.now()
    }

    const originalScale = screen.width / screen.height
    const targetScale = window.innerWidth / window.innerHeight

    // decrease width or height
    if (window.innerWidth <= screen.width || window.innerHeight <= screen.height) {
        if (targetScale < originalScale) {
            screen.width = window.innerWidth
            screen.height = screen.width / originalScale
        } else {
            screen.height = window.innerHeight
            screen.width = screen.height * originalScale
        }
    }

    return createWorld({
        keyboard: {} as Record<KeyboardEvent['code'], boolean>,
        tiles,
        screen,
        time,
    })
}

export type GameWord = ReturnType<typeof createGameWord>