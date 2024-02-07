import { createWorld } from 'bitecs'

export function createGameWord(){
    return createWorld({
        tileSize: 32,
        time: {
            delta: 0,
            elapsed: 0,
            then: performance.now()
        }
    })
}

export type GameWord = ReturnType<typeof createGameWord>