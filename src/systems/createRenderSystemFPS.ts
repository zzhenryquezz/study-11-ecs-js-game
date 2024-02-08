import { Container, Graphics, Renderer, Text } from 'pixi.js'
import { defineGameSystem } from '@/composables/defineGameSystem'
import { getAllEntities } from 'bitecs'

export async function createRenderSystemFPS (stage: Container, renderer: Renderer) {

    const gameObjects = new Map<string, Text>()

    const background = new Graphics()

    const backgroundSize = 200

    background.rect(renderer.width - backgroundSize - 32, 32, backgroundSize, 100).fill('red')

    background.alpha = 0.5

    stage.addChild(background)
    
    const update = (fps: number, entityLength: number) => {        

        let fpsText = gameObjects.get('fps')
        let entityLengthText = gameObjects.get('entityLength')

        if (fpsText) {
            fpsText.text = `FPS: ${fps}`
            return
        }

        if (entityLengthText) {
            entityLengthText.text = `Entities: ${entityLength}`
            return
        }

        const bgBounds = background.getBounds()

        fpsText = new Text({
            text: `FPS: ${fps}`,
            style: {
                fontFamily: 'Arial',
                fontSize: 12,
                fill: 'white',
                align: 'center',
            }
        })       


        fpsText.x = bgBounds.x + 10
        fpsText.y = bgBounds.y + 10

        gameObjects.set('fps', fpsText)

        stage.addChild(fpsText)

        entityLengthText = new Text({
            text: `Entities: ${entityLength}`,
            style: {
                fontFamily: 'Arial',
                fontSize: 12,
                fill: 'white',
                align: 'center',
            }
        })

        entityLengthText.x = bgBounds.x + 10
        entityLengthText.y = bgBounds.y + 20 + 10

        gameObjects.set('entityLength', entityLengthText)

        stage.addChild(entityLengthText)
        
    }

    return defineGameSystem((world) => {

        const { delta } = world.time

        const entityLength = getAllEntities(world).length

        const fps = Math.round(1000 / delta)        

        update(fps, entityLength)

        return world
    })
}