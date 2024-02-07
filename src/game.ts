import { pipe } from 'bitecs'
import { createRenderSystem } from './systems/createRenderSystem'
import { createTimeSystem } from './systems/createTimeSystem'

import { createGameWord } from './composables/createGameWord'
import { createPlayer } from './entities/createPlayer'
import { createKeyboardSystem } from './systems/createKeyboardSystem'
import { createMovementSystem } from './systems/createMovementSystem'
import { createTransformSystem } from './systems/createTransformSystem'

export function createGame(){    
    const world = createGameWord()

    async function start(){

        const systems = await Promise.all([
            createTimeSystem(),
            createKeyboardSystem(),
            createMovementSystem(),
            createTransformSystem(),
            createRenderSystem(),
        ])

        const pipeline = pipe(...systems)

        createPlayer(world)

        setInterval(() => pipeline(world), 16)
    }

    return { start }
}


