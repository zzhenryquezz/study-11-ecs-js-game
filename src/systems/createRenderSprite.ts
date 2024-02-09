import { Container, Texture, Sprite as SpritePixi } from 'pixi.js'
import Position from '@/components/Position'
import { defineQuery, enterQuery } from 'bitecs'
import Sprite from '@/components/Sprite'

export async function createRenderSprite (stage: Container) {
    const query = defineQuery([Position, Sprite])

    const sprites = new Map<number, SpritePixi>()

    function onEnter(eid: number) {
        const { x, y, scale, image } = useSprite(eid)
        
        const texture = Texture.from(image)

        if (!texture) {
            console.error('texture not found', image)
            return
        }

        const sprite = new SpritePixi(texture)

        if (scale !== 0) {
            sprite.scale.x = scale
            sprite.scale.y   = scale
        }

        sprite.x = x
        sprite.y = y

        stage.addChild(sprite)

        sprites.set(eid, sprite)
        
    }

    function onUpdate(eid: number) {

    }

    return defineGameSystem(world => {


        for (const eid of enterQuery(query)(world)) {
            onEnter(eid)
        }

        for (const eid of query(world)) {
            onUpdate(eid)
        }

        return world
    })
}