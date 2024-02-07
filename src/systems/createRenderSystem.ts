import { Assets, autoDetectRenderer, Container } from 'pixi.js'
import { defineGameSystem } from '@/composables/defineGameSystem'
import { pipe } from 'bitecs'
import { createRenderSystemSpriteSheet } from './createRenderSystemSpriteSheet'
import { createRenderSystemGrid } from './createRenderSystemGrid'
import { createRenderSystemFPS } from './createRenderSystemFPS'


export async function createRenderSystem (tileSize: number = 32) {
    // renderer & stage
    const stage = new Container()

    const width = 800
    const height = 600

    const fixedWidth = Math.round(width / tileSize) * tileSize
    const fixedHeight = Math.round(height / tileSize) * tileSize

    const renderer = await autoDetectRenderer({
        width: fixedWidth,
        height: fixedHeight,
        backgroundColor: 'black',
        antialias: false,
    })

    const canvas = renderer.view.canvas as HTMLCanvasElement
    
    canvas.setAttribute('style', 'position: absolute; transform: translate(-50%, -50%); top: 50%; left: 50%;')

    document.body.appendChild(canvas)
        
    // assets & sprites
    const files = Object.entries(import.meta.glob('../assets/**/*.png', {
        as: 'url',
        eager: true,
    }))

    // this will automatically load all images in assets folder
    for await (const file of files) {
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
    const subsystems = await Promise.all([
        createRenderSystemSpriteSheet(stage),
        createRenderSystemGrid(stage),
        createRenderSystemFPS(stage, renderer),
    ])

    const pipeline = pipe(...subsystems)

    return defineGameSystem((world) => {

        pipeline(world)

        renderer.render(stage)
        
        return world
    })
}