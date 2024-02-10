import { Container, Texture, Spritesheet as PixiSpriteSheet, AnimatedSprite } from 'pixi.js'
import Position from '@/components/Position'
import SpriteSheet from '@/components/SpriteSheet'
import { defineQuery, enterQuery } from 'bitecs'

export async function createRenderSpriteSheet (stage: Container) {
    const query = defineQuery([Position, SpriteSheet])
    
    const sheets = new Map<number, PixiSpriteSheet>()
    const gameObjects = new Map<number, AnimatedSprite>()

    return defineGameSystem(world => {

        function onEnter(eid: number) {

            const image = decode(SpriteSheet.image[eid])
            const width = SpriteSheet.width[eid]
            const height = SpriteSheet.height[eid]
            const frameSize = SpriteSheet.frameSize[eid]
            const frameCount = SpriteSheet.frameCount[eid]

            const texture = Texture.from(image)

            if (!texture) {
                console.log('texture not found or not loaded', image)
                return
            }

            const x = Position.x[eid]
            const y = Position.y[eid]

            const frameList = Array
                .from({ length: frameCount }, (_, i) => ({
                    frame: {
                        x: i * frameSize,
                        y: 0,
                        w: frameSize,
                        h: frameSize
                    },
                    sourceSize:{
                        w: frameSize,
                        h: frameSize
                    },
                    spriteSourceSize: {
                        x: 0,
                        y: 0,
                        w: frameSize,
                        h: frameSize
                    }
                }))
                .map((i, index) => [index, i])

            const frames = Object.fromEntries(frameList)

            const sheet = new PixiSpriteSheet(texture, {
                frames,
                meta: {
                    size: { w: width, h: height },
                    format: 'RGBA8888',
                    scale: '1'
                },
                animations: {
                    main: Array.from({ length: frameCount }, (_, i) => String(i))
                }
            })

            
            sheet.parse().then(() => {

                const animation = new AnimatedSprite(sheet.animations['main'])
    
                animation.animationSpeed = 0.1
                animation.play()
    
                animation.x = x
                animation.y = y
    
                stage.addChild(animation)
    
                gameObjects.set(eid, animation)
    
                sheets.set(eid, sheet)
            })

            
        }

        function onUpdate(eid: number) {
            const x = Position.x[eid]
            const y = Position.y[eid]
            const flipX = SpriteSheet.flipX[eid]

            const animation = gameObjects.get(eid)

            if (!animation) return

            animation.scale.x = flipX ? -1 : 1
            animation.anchor.x = flipX ? 1 : 0

            animation.x = x
            animation.y = y
        }

        for (const eid of enterQuery(query)(world)) {
            onEnter(eid)
        }

        for (const eid of query(world)) {
            onUpdate(eid)
        }

        return world
    })
}