import { pipe } from 'bitecs'
import { createRender } from './systems/createRender'
import { createTime } from './systems/createTime'

import { createGameWord } from './composables/createGameWord'
import { createPlayer } from './entities/createPlayer'
import { createKeyboard } from './systems/createKeyboard'
import { createMovement } from './systems/createMovement'
import { createTransform } from './systems/createTransform'
import { createLevel } from './entities/createLevel'

export function createGame(){    
    const world = createGameWord()


    async function start(){

        const systems = [
            createTime(),
            createKeyboard(),
            createMovement(),
            createTransform(),
            await createRender(world),
        ]

        const pipeline = pipe(...systems)

        createPlayer(world).move(100, 100)  
        createLevel(world)

        setInterval(() => pipeline(world), 16)
    }

    return { start }
}


