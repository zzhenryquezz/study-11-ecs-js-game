import Collectable from '@/components/Collectable'
import Collision from '@/components/Collision'
import Position from '@/components/Position'
import SpriteSheet from '@/components/SpriteSheet'

export const createCollectable = defineGameEntity(({ id, addManyComponents }) => {
    addManyComponents(Position, SpriteSheet, Collectable, Collision)

    return useCollectable(id)
})