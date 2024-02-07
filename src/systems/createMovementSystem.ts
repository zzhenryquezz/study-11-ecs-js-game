import Movement from '@/components/Movement'
import Position from '@/components/Position'
import Velocity from '@/components/Velocity'
import { defineQuery } from 'bitecs'

export function createMovementSystem() {
    const query = defineQuery([Position, Velocity, Movement])

    
    return defineGameSystem(world => {
        function update(eid: number) {
            const speed = Movement.speed[eid]

            Velocity.x[eid] = 0
            Velocity.y[eid] = 0
            
            if (world.keyboard['ArrowUp']) {
                Velocity.y[eid] = speed * -1
            }

            if (world.keyboard['ArrowDown']) {
                Velocity.y[eid] = speed
            }

            if (world.keyboard['ArrowLeft']) {
                Velocity.x[eid] = speed * -1
            }

            if (world.keyboard['ArrowRight']) {
                Velocity.x[eid] = speed
            }
            
        }

        for (const eid of query(world)) {
            update(eid)
        }

        return world
    })
}