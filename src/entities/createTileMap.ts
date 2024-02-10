import TileMap from '@/components/TileMap'
import Position from '@/components/Position'

export const createTileMap = defineGameEntity(({ id, addComponent }) => {    
    addComponent(TileMap)
    addComponent(Position)


    return useTileMap(id)
})