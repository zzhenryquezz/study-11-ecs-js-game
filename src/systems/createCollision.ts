import Collision from '@/components/Collision'
import Position from '@/components/Position'
import TileMap from '@/components/TileMap'
import Velocity from '@/components/Velocity'
import { GameWord } from '@/composables/createGameWord'
import { IIntersectItem } from '@/composables/intersect'
import { defineQuery, hasComponent } from 'bitecs'

export function createCollision() {
    const collisionQuery = defineQuery([Collision, Position])
    const tileMapQuery = defineQuery([TileMap])

    const tileMapPositions = new Map<number, IIntersectItem[]>()

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

    function findEntityCollision(eid: number, world: GameWord){
        const a = useCollision(eid)

        for (const eid of collisionQuery(world)) {
            if (eid === a.eid) continue

            const b = useCollision(eid)

            if (intersect(a, b)) {
                return {
                    eid,
                    collision: b
                }
            }
        }

        return null
    }


    function updateVelocity(eid: number, a: ICollision, b: ICollision){

        // came from the left
        if (Velocity.x[eid] < 0) {
            Position.x[eid] = b.x + b.width
        }

        // came from the right
        if (Velocity.x[eid] > 0) {
            Position.x[eid] = b.x - a.width
        }

        // came from the top
        if (Velocity.y[eid] < 0) {
            Position.y[eid] = b.y + b.height
        }

        // came from the bottom
        if (Velocity.y[eid] > 0) {
            Position.y[eid] = b.y - a.height 
        }
    }

    function checkTileMapCollision(eid: number, world: GameWord){
        const collision = findTileMapCollision(eid)

        Collision.isColliding[eid] = collision ? 1 : 0

        // only update velocity if is colliding with a tile map
        if (collision && hasComponent(world, Velocity, eid)) {            
            updateVelocity(eid, useCollision(eid), collision.collision)            
        }

        return !!collision
    }

    function checkEntityCollision(eid: number, world: GameWord){
        const collision = findEntityCollision(eid, world)

        Collision.isColliding[eid] = collision ? 1 : 0
        Collision.collidedEntity[eid] = collision ? collision.eid : 0

        return !!collision
    }

    
    function onUpdate(word: GameWord, eid: number) {
        Collision.isColliding[eid] = 0
        Collision.collidedEntity[eid] = 0

        if (checkTileMapCollision(eid, word)) return

        checkEntityCollision(eid, word)
    }

    return defineGameSystem(world => {

        for (const eid of collisionQuery(world)) {
            onUpdate(world, eid)
        }

        for (const eid of tileMapQuery(world)) {
            onUpdateTileMap(eid)
        }

        return world
    })
}