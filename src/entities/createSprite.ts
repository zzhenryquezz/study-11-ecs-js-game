import Position from '../components/Position'
import Sprite from '@/components/Sprite'

export const createSprite = defineGameEntity(({ id, addComponent }) => {
    addComponent(Position)
    addComponent(Sprite)    

    return useSprite(id)
})