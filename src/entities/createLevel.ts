import { createItem } from './createItem'
import { createTileMap } from './createTileMap'

export const createLevel = defineGameEntity(({ world }) => {
    const background = createTileMap(world)
    const collisions = createTileMap(world)

    background
        .setTmx('level-01.tmx')
        .setImage('maps/tiles.png')
        .setLayerName('background')
        .setEnableCollision(0)
    
    collisions
        .setTmx('level-01.tmx')
        .setImage('maps/tiles.png')
        .setLayerName('collisions')
        .setEnableCollision(1)


    const itemsPositions = [[100, 100]]

    for (const [x, y] of itemsPositions){        
        const { position, sheet  } = createItem(world)

        position.setPosition(x, y)

        sheet
            .setImage('items/coin.png')
            .setWidth(240)
            .setHeight(16)
            .setFrameSize(16)
            .setFrameCount(15)
    }

})