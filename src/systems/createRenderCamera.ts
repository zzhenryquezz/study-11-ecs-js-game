import { Container, Graphics, Renderer, v8_0_0 } from 'pixi.js'
import { GameWord } from '@/composables/createGameWord'
import CameraFocus from '@/components/CameraFocus'
import { defineQuery } from 'bitecs'
import Position from '@/components/Position'

export async function createRenderCamera (stage: Container, renderer: Renderer) {
    const query = defineQuery([CameraFocus, Position])

    const camera = new Graphics()

    stage.addChild(camera)

    camera.zIndex = 1000

    const first = false

    function move(x: number, y: number, width: number, height: number){
        camera.clear()

        camera.rect(x, y, width, height).stroke('yellow')

        const xScale = renderer.width / width
        const yScale = renderer.height / height

        stage.scale.x = xScale
        stage.scale.y = yScale

        stage.x = Math.min(0, -x * xScale)
        stage.y = Math.min(0, -y * yScale)

        console.log('move', x)
    }

    function onFocus(eid: number, camera: GameWord['camera']) {
        const { x, y } = usePosition(eid)

        move(x - camera.width / 2, y - camera.height / 2, camera.width, camera.height)
    }

    return defineGameSystem(world => {

        const camera = world.camera

        // if (!first) {
        //     first = true
        //     move(0, 0, camera.width, camera.height)
        // }
        
        for (const eid of query(world)) {
            onFocus(eid, world.camera)
        }
        
        return world
    })
}