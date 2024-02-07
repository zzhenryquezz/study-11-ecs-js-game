import { pipe } from 'bitecs'
import { createRenderSystem } from './systems/createRenderSystem'
import { createTimeSystem } from './systems/createTimeSystem'

import { createGameWord } from './composables/createGameWord'
import { createPlayer } from './entities/createPlayer'

export function createGame(){    
    const world = createGameWord()

    async function start(){

        const systems = await Promise.all([
            createRenderSystem(),
            createTimeSystem(),
        ])

        const pipeline = pipe(...systems)

        createPlayer(world)

        setInterval(() => pipeline(world), 16)
    }

    return { start }
}


