import Position from '@/components/Position'
import Velocity from '@/components/Velocity'
import { defineQuery } from 'bitecs'

export function createTransform() {
    const query = defineQuery([Position, Velocity])

    return defineGameSystem(world => {

        const { time } = world

        for (const eid of query(world)) {
            Position.x[eid] += Velocity.x[eid] * time.delta
            Position.y[eid] += Velocity.y[eid] * time.delta
        }

        return world
    })
}