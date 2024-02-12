import Collision from '@/components/Collision'
import Position from '@/components/Position'

export function useCollision(eid: number){
    let width = Collision.width[eid]
    let height = Collision.height[eid]
    let isColliding = Collision.isColliding[eid] === 1
    let collidedEntity = Collision.collidedEntity[eid]
    
    let x = Position.x[eid]
    let y = Position.y[eid]


    function refresh(){
        width = Collision.width[eid]
        height = Collision.height[eid]
        x = Position.x[eid]
        y = Position.y[eid]
        isColliding = Collision.isColliding[eid] === 1
        collidedEntity = Collision.collidedEntity[eid]
    }

    function setSize(newWidth: number, newHeight: number){
        Collision.width[eid] = newWidth
        Collision.height[eid] = newHeight

        return useCollision(eid)
    }


    return {
        eid,
        width,
        height,
        isColliding,
        collidedEntity,

        x,
        y,

        refresh,
        setSize,
    }
}