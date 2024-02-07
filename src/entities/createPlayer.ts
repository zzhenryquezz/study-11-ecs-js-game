import Position from '../components/Position'
import SpriteSheet from '../components/SpriteSheet'

export function usePlayer(eid: number){
    function move(x: number, y: number){
        Position.x[eid] = x
        Position.y[eid] = y
    }

    return { eid, move }
}

export const createPlayer = defineGameEntity(({ id, addComponent }) => {
    addComponent(Position)
    addComponent(SpriteSheet)
    // addComponent(Sprite)

    const player = usePlayer(id)

    // Sprite.name[id] = encode('player.png')
    SpriteSheet.image[id] = encode('player/idle-sheet.png')
    SpriteSheet.width[id] = 128
    SpriteSheet.height[id] = 32
    SpriteSheet.frameSize[id] = 32
    SpriteSheet.frameCount[id] = 4

    return player
})