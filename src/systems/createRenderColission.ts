import Collision from '@/components/Collision'
import Position from '@/components/Position'
import { defineQuery, enterQuery } from 'bitecs'
import { Container, Graphics } from 'pixi.js'


export function createRenderCollision(stage: Container) {
    const query = defineQuery([Collision, Position])
    
    const gameObjects = new Map<string, Graphics>()

    function onEnter(eid: number) {
        const { height, width, y, x } = useCollision(eid)

        const id = `${eid}`

        const graphics = new Graphics()

        graphics.rect(x, y, width, height).fill('rgba(255, 0, 0, 0.2)')

        stage.addChild(graphics)

        gameObjects.set(id, graphics)
    }
    
    function onUpdate(eid: number) {
        const { height, width, y, x, isColliding } = useCollision(eid)

        const id = `${eid}`

        const graphics = gameObjects.get(id)

        if (!graphics) return

        const color = isColliding ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 0, 0, 0.2)'

        graphics.clear()

        graphics.rect(x, y, width, height).fill(color)
        
    }

    return defineGameSystem(world => {

        for (const eid of enterQuery(query)(world)) {
            onEnter(eid)
        }

        for (const eid of query(world)) {
            onUpdate(eid)
        }

        return world
    })
}