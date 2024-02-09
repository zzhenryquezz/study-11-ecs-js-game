import { createSprite } from './createSprite'

export const createLevel = defineGameEntity(({ world }) => {
    const sprite = createSprite(world)

    sprite.setSprite('levels/01.png')   

})