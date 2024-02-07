import { Assets, autoDetectRenderer, Container, Texture, Sprite as SpritePixi, Spritesheet as SpritesheetPixi, AnimatedSprite } from 'pixi.js'
import { defineGameSystem } from '../composables/defineGameSystem'
import { defineQuery, enterQuery } from 'bitecs'

import Sprite from '../components/Sprite'
import Position from '../components/Position'
import SpriteSheet from '../components/SpriteSheet'


export async function createRenderSystem () {
    // renderer & stage
    const stage = new Container()
    const renderer = await autoDetectRenderer({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 'black',
        antialias: false,
    })

    const canvas = renderer.view.canvas as HTMLCanvasElement
    
    canvas.setAttribute('style', 'position: absolute; top: 0; left: 0; z-index: 0')

    // make stage be at center
    stage.position.set(window.innerWidth / 2, window.innerHeight / 2)

    document.body.appendChild(canvas)
        
    // assets & sprites
    const spritePixiList = new Map<number, SpritePixi>()
    const spriteQuery = defineQuery([Sprite, Position])
    const spriteEnterQuery = enterQuery(spriteQuery)

    const assetsList = Object.entries(import.meta.glob('../assets/**/*.png', {
        as: 'url',
        eager: true,
    }))

    // this will automatically load all images in assets folder
    for await (const file of assetsList) {
        const [filename, url] = file

        // convert /src/assets/player.png > /player/player.png
        const name = filename.replace('../assets/', '')

        await Assets.load({
            alias: name,
            url: url,
            src: url
        })

        console.log('loaded asset', name)
    }
    
    // sprite sheets
    const sheets = new Map<string, SpritesheetPixi>()
    const spriteSheetQuery = defineQuery([Position, SpriteSheet])
    const spriteSheetEnterQuery = enterQuery(spriteSheetQuery)

    const sheetFiles = Object.entries<any>(import.meta.glob('../assets/**/*.json', {
        eager: true,
    }))


    for await (const file of sheetFiles) {

        const [filename, moduleObject] = file

        const name = filename.replace('../assets/', '')
        const json = moduleObject.default

        const spriteSheet = new SpritesheetPixi(
            Texture.from(json.meta.image),
            json
        )

        await spriteSheet.parse()

        sheets.set(name, spriteSheet)

        console.log('loaded sprite sheet', name)
    }


    return defineGameSystem((world) => {

        // sprites
        function onSpriteEnter(eid: number) {
            const x = Position.x[eid]
            const y = Position.y[eid]
            const nameUi8 = Sprite.name[eid]
            const name = decode(nameUi8)

            const texture = Texture.from(name)

            if (!texture) return

            const sprite = new SpritePixi({
                texture,
                x,
                y
            })

            stage.addChild(sprite)

            spritePixiList.set(eid, sprite)
        }

        for (const eid of spriteEnterQuery(world)) {
            onSpriteEnter(eid)
        }

        // sprite sheets
        async function onSpriteSheetEnter(eid: number) {
            const x = Position.x[eid]
            const y = Position.y[eid]
            const name = decode(SpriteSheet.name[eid])

            const sheet = sheets.get(name)

            if (!sheet) return

            const animation = new AnimatedSprite(sheet.animations['main'])

            // set the animation speed
            animation.animationSpeed = 0.1
            // play the animation on a loop
            animation.play()

            animation.x = x
            animation.y = y
            // add it to the stage to render
            stage.addChild(animation)
        }

        for (const eid of spriteSheetEnterQuery(world)) {
            onSpriteSheetEnter(eid)
        }

        

        renderer.render(stage)
        
        return world
    })
}