import Position from '@/components/Position'
import Tile from '@/components/Tile'
import { defineQuery, enterQuery } from 'bitecs'
import { Container, Rectangle, Sprite, Texture } from 'pixi.js'

export function createRenderSystemTile(stage: Container) {
    const query = defineQuery([Position, Tile])

    
    return defineGameSystem(world => {
        function onEnter(eid: number) {
            const x = Position.x[eid]
            const y = Position.y[eid]
            
            const image = decode(Tile.image[eid])
            const size = Tile.size[eid]
            const frameX = Tile.frameX[eid]
            const frameY = Tile.frameY[eid]
            const scale = Tile.scale[eid]

            const frame = new Rectangle(frameX, frameY, size, size)

            const texture = new Texture({
                source: Texture.from(image).source,
                frame,
            })

            if (!texture) {
                console.error('texture not found', image)
                return
            }

            const sprite = new Sprite({
                texture,
            })

            sprite.x = x
            sprite.y = y

            if (scale) {
                sprite.scale.x = scale
                sprite.scale.y = scale
            }

            stage.addChild(sprite)
        }

        for (const eid of enterQuery(query)(world)) {
            onEnter(eid)
        }

        // function update(eid: number) {}

        // for (const eid of query(world)) {
        //     update(eid)
        // }

        return world
    })
}