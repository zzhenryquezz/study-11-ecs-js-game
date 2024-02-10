import { createTileMap } from './createTileMap'

export const createLevel = defineGameEntity(({ world }) => {
    // const background = createTileMap(world)
    const collisions = createTileMap(world)

    // background
    //     .setTmx('levels/level-01.tmx')
    //     .setImage('tileMaps/tiles.png')
    //     .setLayerName('background')
    //     .setEnableCollision(0)
    
    collisions
        .setTmx('levels/level-01.tmx')
        .setImage('tileMaps/tiles.png')
        .setLayerName('collisions')
        .setEnableCollision(1)

})