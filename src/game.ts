import { pipe } from 'bitecs'
import { createRenderSystem } from './systems/createRenderSystem'
import { createTimeSystem } from './systems/createTimeSystem'

import { createGameWord } from './composables/createGameWord'
import { createPlayer } from './entities/createPlayer'
import { createKeyboardSystem } from './systems/createKeyboardSystem'
import { createMovementSystem } from './systems/createMovementSystem'
import { createTransformSystem } from './systems/createTransformSystem'
import { createTile } from './entities/createTile'

export function createGame(){    
    const world = createGameWord()

    function renderBackground(){

        const tiles = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
            [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
            [0, 1, 2, 3, 4, 4, 3, 2, 1, 0],
            [0, 1, 2, 3, 4, 4, 3, 2, 1, 0],
            [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
            [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        
        for (let y = 0; y < tiles.length; y++) {
            for (let x = 0; x < tiles[y].length; x++) {
                const tile = createTile(world)
                tile.move(x * 32, y * 32)
                tile.setTile(tiles[y][x])
            }
        }

    }

    async function start(){

        renderBackground()

        const systems = [
            createTimeSystem(),
            createKeyboardSystem(),
            createMovementSystem(),
            createTransformSystem(),
            await createRenderSystem(),
        ]

        const pipeline = pipe(...systems)

        createPlayer(world)

        setInterval(() => pipeline(world), 16)
    }

    return { start }
}


