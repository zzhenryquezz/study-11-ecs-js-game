import Velocity from '@/components/Velocity'
import Position from '../components/Position'
import SpriteSheet from '../components/SpriteSheet'
import Movement from '@/components/Movement'
import Camera from '@/components/Camera'
import Collision from '@/components/Collision'

export const createPlayer = defineGameEntity(({ id, addManyComponents }) => {

    addManyComponents(
        Position,
        SpriteSheet,
        Velocity,
        Movement,
        Camera,
        Collision
    )

    Movement.speed[id] = 5
    
    Camera.size[id] = 400
    Camera.stroke[id] = 1
    Camera.active[id] = 1

    Collision.width[id] = 32
    Collision.height[id] = 32

    const player = usePlayer(id)

    player.move(32, 32)  

    SpriteSheet.image[id] = encode('player/idle-sheet.png')
    SpriteSheet.width[id] = 128
    SpriteSheet.height[id] = 32
    SpriteSheet.frameSize[id] = 32
    SpriteSheet.frameCount[id] = 4

    return player
})