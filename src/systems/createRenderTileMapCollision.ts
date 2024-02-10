import TileMap from '@/components/TileMap'
import { defineQuery } from 'bitecs'
import { Container, Graphics } from 'pixi.js'


export function createRenderTileMapCollision(stage: Container) {
    const query = defineQuery([TileMap])
    
    const gameObjects = new Map<string, Graphics>()
    const rendered = new Set<number>()

    function onUpdate(eid: number) {
        const map = useTileMap(eid)

        if (map.enableCollision === 0) return

        if (!map.isLoaded) return

        if (rendered.has(eid)) return

        
        for (let i = 0; i < map.positions.length; i++) {
            const [x, y, width, height] = map.positions[i]
            
            const id = `${eid}-${i}`
        
            if (gameObjects.has(id)) continue

            const graphics = new Graphics()

            graphics.rect(x, y, width, height).fill('rgba(255, 0, 0, 0.2)')

            stage.addChild(graphics)

            gameObjects.set(id, graphics)
        }

        rendered.add(eid)
    }

    return defineGameSystem(world => {
        for (const eid of query(world)) {
            onUpdate(eid)
        }

        return world
    })
}