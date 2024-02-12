import { Assets, autoDetectRenderer, Container } from 'pixi.js'
import { defineGameSystem } from '@/composables/defineGameSystem'
import { pipe } from 'bitecs'
import { createRenderSpriteSheet } from './createRenderSpriteSheet'
import { createRenderGrid } from './createRenderGrid'
import { createRenderDebug } from './createRenderDebug'
import { createRenderTile } from './createRenderTile'
import { createRenderSprite } from './createRenderSprite'
import { createRenderCamera } from './createRenderCamera'
import { GameWord } from '@/composables/createGameWord'
import { createRenderTileMap } from './createRenderTilemap'
import { createRenderTileMapCollision } from './createRenderTileMapCollision'
import { createRenderCollision } from './createRenderColission'
import { createRenderInventory } from './createRenderInventory'


export async function createRender (world: GameWord) {
    const { screen, tiles } = world
    // renderer & stage
    const stage = new Container()

    const width = screen.width - 200
    const height = screen.height - 200

    const fixedWidth = Math.round(width / tiles.size) * tiles.size
    const fixedHeight = Math.round(height / tiles.size) * tiles.size

    const renderer = await autoDetectRenderer({
        width: fixedWidth,
        height: fixedHeight,
        backgroundColor: 'black',
        antialias: false,
        roundPixels: false,
    })

    const canvas = renderer.view.canvas as HTMLCanvasElement
    
    canvas.setAttribute('style', [
        'position: absolute',
        'top: 50%',
        'left: 50%',
        'transform: translate(-50%, -50%)',
        'border: 1px solid white',
        'image-rendering: pixelated',
        'overflow: hidden',
        'border-radius: 5px',
    ].join('; '))

    document.body.appendChild(canvas)

    addEventListener('resize', () => {
        const width = window.innerWidth - 100
        const height = window.innerHeight - 100

        const fixedWidth = Math.round(width / tiles.size) * tiles.size
        const fixedHeight = Math.round(height / tiles.size) * tiles.size

        renderer.resize(fixedWidth, fixedHeight)
    })
        
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
    }
    
    // sprite sheets
    const subsystems = await Promise.all([
        createRenderSpriteSheet(stage),
        createRenderGrid(stage),
        createRenderDebug(stage, renderer),
        createRenderTile(stage),
        createRenderSprite(stage),
        createRenderCamera(stage,renderer),        
        createRenderTileMap(stage),
        createRenderInventory(stage),
        
        // debug
        createRenderTileMapCollision(stage),
        createRenderCollision(stage),
    ])

    const pipeline = pipe(...subsystems)

    return defineGameSystem((world) => {

        stage.scale.x = screen.scale
        stage.scale.y = screen.scale

        pipeline(world)

        renderer.render(stage)
        
        return world
    })
}