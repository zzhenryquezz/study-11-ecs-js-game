import { Container, Graphics } from 'pixi.js'
import { defineGameSystem } from '@/composables/defineGameSystem'


export async function createRenderSystemGrid (stage: Container) {

    const gameObjects = new Map<string, Graphics>()

    
    return defineGameSystem((world) => {

        const { tileSize } = world

        const xLength = Math.floor(window.innerWidth / tileSize) + 1
        const yLength = Math.floor(window.innerHeight / tileSize) + 1
        
        function update(index: number, y = 0) {

            const id = `${index}-${y}`

            const x = index * tileSize

            let gameObject = gameObjects.get(id)

            if (gameObject) {
                return
            }

            gameObject = new Graphics()

            gameObject.zIndex = -1

            gameObject.alpha = 0.1
            
            gameObject.rect(x, y, tileSize, tileSize).stroke('red')

            gameObjects.set(id, gameObject)

            stage.addChild(gameObject)
        }

        for (let index = 0; index < xLength; index++) {

            for (let y = 0; y < yLength; y++) {
                update(index, y * tileSize)
            }            
        }

        return world
        
    })
}