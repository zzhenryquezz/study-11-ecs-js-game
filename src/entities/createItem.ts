import Position from '@/components/Position'
import SpriteSheet from '@/components/SpriteSheet'

export const createItem = defineGameEntity(({ id, addManyComponents }) => {
    addManyComponents(Position, SpriteSheet)

    return useItem(id)
})