import TileMap from '@/components/TileMap'
import Position from '@/components/Position'

export const createLevel = defineGameEntity(({ id, addComponent }) => {
    addComponent(TileMap)
    addComponent(Position)

    TileMap.tmx[id] = encode('levels/level-01.tmx')
    TileMap.image[id] = encode('tileMaps/tiles.png')

})