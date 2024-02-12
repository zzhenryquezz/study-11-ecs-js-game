import { Container, Text } from 'pixi.js'
import Camera from '@/components/Camera'
import { defineQuery } from 'bitecs'
import Position from '@/components/Position'
import Inventory from '@/components/Inventory'

export async function createRenderInventory (stage: Container) {
    const query = defineQuery([Camera, Position, Inventory])

    const gameObjects = new Map<number, Text>()

    function onUpdate(eid: number) {
        const x = Camera.currentX[eid]
        const y = Camera.currentY[eid]
        const width = Camera.currentWidth[eid]

        let text = gameObjects.get(eid)

        if (!text) {
            text = new Text({
                style: { 
                    fill: 'white',
                    fontSize: 20
                }
            })

            stage.addChild(text)

            gameObjects.set(eid, text)
        }


        text.text = `Coins: ${Inventory.coins[eid]}`
        text.x = x + width - text.width - 10
        text.y = y + 10
    }

    return defineGameSystem(world => {
        for (const eid of query(world)) {
            onUpdate(eid)
        }
        
        return world
    })
}