import Collectable from '@/components/Collectable'
import Collision from '@/components/Collision'
import Inventory from '@/components/Inventory'
import { GameWord } from '@/composables/createGameWord'
import { defineQuery, hasComponent, removeEntity } from 'bitecs'
export function createCollectable() {
    const inventoryQuery = defineQuery([Collision, Inventory])
    
    function onInventoryUpdate(eid: number, word: GameWord,) {
        const { isColliding, collidedEntity } = useCollision(eid)

        if (!isColliding) return

        if (!hasComponent(word, Collectable, collidedEntity)) return

        if (!hasComponent(word, Inventory, eid)) return

        Inventory.coins[eid] += 1

        removeEntity(word, collidedEntity)
    }

    return defineGameSystem(world => {

        for (const eid of inventoryQuery(world)) {
            onInventoryUpdate(eid, world)
        }

        return world
    })
}