import { createWorld } from 'bitecs'

export function createGameWord(){

    const radio = window.innerWidth / window.innerHeight

    const screenWidth = Math.min(1600, window.innerWidth)
    const screenHeight = Math.min(1200, window.innerHeight)

    const cameraHeight = screenHeight * 0.4
    const cameraWidth = cameraHeight * radio

    return createWorld({
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
        keyboard: {} as Record<KeyboardEvent['code'], boolean>,
        camera: {
            x: 50,
            y: 50,
            width: cameraWidth,
            height: cameraHeight,
        }
    })
}

export type GameWord = ReturnType<typeof createGameWord>