import Velocity from '@/components/Velocity'
import Position from '../components/Position'
import SpriteSheet from '../components/SpriteSheet'
import Movement from '@/components/Movement'
import Camera from '@/components/Camera'
import Collision from '@/components/Collision'
import Inventory from '@/components/Inventory'

export const createPlayer = defineGameEntity(({ id, addManyComponents }) => {

    addManyComponents(
        Position,
        SpriteSheet,
        Velocity,
        Movement,
        Camera,
        Collision,
        Inventory
    )

    Movement.speed[id] = .2
    
    Camera.size[id] = 400
    Camera.stroke[id] = 1
    Camera.active[id] = 1

    Collision.width[id] = 32
    Collision.height[id] = 32

    const { position, sheet } = usePlayer(id)

    position.setPosition(200, 200)
    
    sheet
        .setImage('player/idle-sheet.png')
        .setWidth(128)
        .setHeight(32)
        .setFrameSize(32)
        .setFrameCount(4)

    return usePlayer(id)
})