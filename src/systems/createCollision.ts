import Collision from '@/components/Collision'
import Movement from '@/components/Movement'
import Position from '@/components/Position'
import SpriteSheet from '@/components/SpriteSheet'
import TileMap from '@/components/TileMap'
import Velocity from '@/components/Velocity'
import { defineQuery, enterQuery, hasComponent } from 'bitecs'

interface ICollision {
    x: number
    y: number
    width: number
    height: number
}

export function createCollision() {
    const collisionQuery = defineQuery([Collision, Position])
    const tileMapQuery = defineQuery([TileMap])

    const tileMapPositions = new Map<number, ICollision[]>()

    function onUpdateTileMap(eid: number) {
        const map = useTileMap(eid)

        if (map.enableCollision === 0) return

        if (tileMapPositions.has(eid)) return

        if (!map.isLoaded) return

        const collisions = map.positions.map(position => ({
            x: position[0],
            y: position[1],
            width: position[2],
            height: position[3]
        }))

        tileMapPositions.set(eid, collisions)
    }

    function intersect(a: ICollision, b: ICollision){
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
    }
    
    function findTileMapCollision(eid: number){
        const a = useCollision(eid)

        for (const [eid, collisions] of tileMapPositions) {
            for (const b of collisions) {
                if (intersect(a, b)) {
                    return {
                        eid,
                        collision: b
                    }
                }
            }
        }

        return null
    }

    
    function onUpdate(eid: number) {
        Collision.isColliding[eid] = 0

        const collision = findTileMapCollision(eid)

        if (collision) {
            Collision.isColliding[eid] = 1
        }
    }

    return defineGameSystem(world => {

        for (const eid of collisionQuery(world)) {
            onUpdate(eid)
        }

        for (const eid of tileMapQuery(world)) {
            onUpdateTileMap(eid)
        }

        return world
    })
}