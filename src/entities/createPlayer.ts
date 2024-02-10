import Velocity from '@/components/Velocity'
import Position from '../components/Position'
import SpriteSheet from '../components/SpriteSheet'
import Movement from '@/components/Movement'
import Camera from '@/components/Camera'

export const createPlayer = defineGameEntity(({ id, addComponent }) => {
    addComponent(Position)
    addComponent(SpriteSheet)
    addComponent(Velocity)
    addComponent(Movement)
    addComponent(Camera)

    Movement.speed[id] = 5
    
    Camera.size[id] = 500
    Camera.stroke[id] = 1
    Camera.active[id] = 1

    const player = usePlayer(id)

    SpriteSheet.image[id] = encode('player/idle-sheet.png')
    SpriteSheet.width[id] = 128
    SpriteSheet.height[id] = 32
    SpriteSheet.frameSize[id] = 32
    SpriteSheet.frameCount[id] = 4

    return player
})