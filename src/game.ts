import { pipe } from 'bitecs'
import { createRender } from './systems/createRender'
import { createTime } from './systems/createTime'

import { createGameWord } from './composables/createGameWord'
import { createPlayer } from './entities/createPlayer'
import { createKeyboard } from './systems/createKeyboard'
import { createMovement } from './systems/createMovement'
import { createTransform } from './systems/createTransform'
import { createLevel } from './entities/createLevel'
import { createCollision } from './systems/createCollision'

export function createGame(){    
    const world = createGameWord()


    async function start(){

        const systems = [

            createTime(),
            createKeyboard(),

            
            
            createTransform(),
            
            createCollision(),
            
            createMovement(),
            

            await createRender(world),
        ]

        const pipeline = pipe(...systems)

        createPlayer(world)
        createLevel(world)

        setInterval(() => pipeline(world), 16)
    }

    return { start }
}


