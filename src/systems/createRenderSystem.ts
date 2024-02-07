import { Assets, autoDetectRenderer, Container } from 'pixi.js'
import { defineGameSystem } from '@/composables/defineGameSystem'
import { pipe } from 'bitecs'
import { createRenderSystemSpriteSheet } from './createRenderSystemSpriteSheet'
import { createRenderSystemGrid } from './createRenderSystemGrid'
import { createRenderSystemFPS } from './createRenderSystemFPS'


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
        createRenderSystemFPS(stage),
    ])

    const pipeline = pipe(...subsystems)

    return defineGameSystem((world) => {

        pipeline(world)

        renderer.render(stage)
        
        return world
    })
}