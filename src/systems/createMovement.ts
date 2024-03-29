import Movement from '@/components/Movement'
import Position from '@/components/Position'
import SpriteSheet from '@/components/SpriteSheet'
import Velocity from '@/components/Velocity'
import { defineQuery, hasComponent } from 'bitecs'

export function createMovement() {
    const query = defineQuery([Position, Velocity, Movement])

    
    return defineGameSystem(world => {
        function update(eid: number) {
            const speed = Movement.speed[eid]

            Velocity.x[eid] = 0
            Velocity.y[eid] = 0            
            
            if (world.keyboard['ArrowUp']) {
                Velocity.y[eid] = speed * -1
                return
            }

            if (world.keyboard['ArrowDown']) {
                Velocity.y[eid] = speed
                return
            }

            if (world.keyboard['ArrowLeft']) {
                Velocity.x[eid] = speed * -1

                if (hasComponent(world, SpriteSheet, eid)) {
                    SpriteSheet.flipX[eid] = 1
                }

                return
            }

            if (world.keyboard['ArrowRight']) {
                Velocity.x[eid] = speed

                if (hasComponent(world, SpriteSheet, eid)) {
                    SpriteSheet.flipX[eid] = 0
                }

                return
            }

            
            
        }

        for (const eid of query(world)) {
            update(eid)
        }

        return world
    })
}