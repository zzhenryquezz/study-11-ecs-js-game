import Position from '@/components/Position'
import Tile from '@/components/Tile'

function useTile(eid: number){
    function move(x: number, y: number){
        Position.x[eid] = x
        Position.y[eid] = y
    }

    function setTile(xNum: number, yNum = 0){
        Tile.frameX[eid] = xNum * Tile.size[eid]
        Tile.frameY[eid] = yNum
    }

    return { eid, move, setTile }
}

export const createTile = defineGameEntity(({ id, addComponent }) => {
    addComponent(Position)
    addComponent(Tile)

    Tile.image[id] = encode('environments/tiles.png')

    Tile.size[id] = 16
    Tile.scale[id] = 2

    return useTile(id)
})