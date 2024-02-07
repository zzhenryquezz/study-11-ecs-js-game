import Position from '@/components/Position'
import Velocity from '@/components/Velocity'
import { defineQuery } from 'bitecs'

export function createTransformSystem() {
    const query = defineQuery([Position, Velocity])

    return defineGameSystem(world => {

        for (const eid of query(world)) {
            Position.x[eid] += Velocity.x[eid]
            Position.y[eid] += Velocity.y[eid]
        }

        return world
    })
}