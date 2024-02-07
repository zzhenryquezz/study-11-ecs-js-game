import { createWorld } from 'bitecs'

export function createGameWord(){
    return createWorld({
        time: {
            delta: 0,
            elapsed: 0,
            then: performance.now()
        }
    })
}

export type GameWord = ReturnType<typeof createGameWord>