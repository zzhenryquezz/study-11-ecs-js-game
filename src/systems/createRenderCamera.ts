import { Container, Graphics, Renderer } from 'pixi.js'
import { GameWord } from '@/composables/createGameWord'
import Camera from '@/components/Camera'
import { defineQuery } from 'bitecs'
import Position from '@/components/Position'

export async function createRenderCamera (stage: Container, renderer: Renderer) {
    const query = defineQuery([Camera, Position])

    const cameraGraphics = new Map<number, Graphics>()
    function setCamera(eid: number, screen: GameWord['screen']) {
        const size = Camera.size[eid]        
        const x = Position.x[eid]
        const y = Position.y[eid]
        const stroke = Camera.stroke[eid]
        const active = Camera.active[eid]
        
        const radio = screen.width / screen.height
        
        const width = size
        const height = size / radio        
        const scaleX = renderer.width / width
        const scaleY = renderer.height / height
        
        const xCenter = x - width / 2
        const yCenter = y - height / 2


        if (active) {
            const stageX = Math.min(0, -xCenter * scaleX)
            const stageY = Math.min(0, -yCenter * scaleY)
            const maxStageX = -(renderer.width - width) * scaleX
            const maxStageY = -(renderer.height - height) * scaleY

            stage.scale.x = scaleX
            stage.scale.y = scaleY

            stage.x = Math.max(stageX, maxStageX)
            stage.y = Math.max(stageY, maxStageY)
        }


        if (!stroke) return

        let graphic = cameraGraphics.get(eid)

        if (!graphic) {
            graphic = new Graphics()

            graphic.zIndex = 1000

            cameraGraphics.set(eid, graphic)

            stage.addChild(graphic)
        }

        graphic.clear()

        const graphicX = Math.max(0, xCenter)
        const graphicY = Math.max(0, yCenter)
        const maxGraphicX = renderer.width - width
        const maxGraphicY = renderer.height - height

        graphic.rect(Math.min(graphicX, maxGraphicX), Math.min(graphicY, maxGraphicY) , width, height).stroke('yellow')
        
    }

    return defineGameSystem(world => {
        for (const eid of query(world)) {
            setCamera(eid, world.camera)
        }
        
        return world
    })
}