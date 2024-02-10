import Position from '@/components/Position'
import TileMap from '@/components/TileMap'
import { defineQuery, enterQuery } from 'bitecs'
import {  Container, Rectangle, Sprite, Texture } from 'pixi.js'

import { XMLParser } from 'fast-xml-parser'

interface TileSet {
    width: number
    height: number
    count: number
    columns: number
}

interface Layer {
    data: number[]
    width: number
}

interface Map {
    tileSet: TileSet
    layers: Layer[]
}

export function createRenderTileMap(stage: Container) {
    const query = defineQuery([Position, TileMap])

    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
    })

    const files = Object.entries(import.meta.glob('../assets/tileMaps/**/*.tmx', {
        as: 'raw',
        eager: true,
    }))

    const tileMaps = new Map<string, Map>()

    files.forEach(([url, data]) => {
        const name = url.replace('../assets/tileMaps/', '')

        const content = parser.parse(data)

        const contentLayers = Array.isArray(content.map.layer) ? content.map.layer : [content.map.layer]
        const layers = contentLayers.map((l: any) => ({
            data: l.data['#text'].split(',').map(Number),
            width: l.width,
        }))

        tileMaps.set(name, {
            layers,
            tileSet: {
                width: Number(content.map.tileset.tilewidth),
                height: Number(content.map.tileset.tileheight),
                count: Number(content.map.tileset.tilecount),
                columns: Number(content.map.tileset.columns),
            },
        })
    })

    function renderLayer(layer: Layer, tileSet: TileSet, texture: Texture) {
        const data = layer.data

        const layerWidth = layer.width
        
        const tileSetWidth = texture.width

        const coordinates = new Map<number, number[]>()

        const total = tileSet.count

        let count = 1
        let x = 0
        let y = 0

        for (let i = 0; i < total; i++) {            
            const value = [x, y]
            
            coordinates.set(count, value)
            
            x += 16
            count++

            // if is the last tile in the row reset x and increase y
            if (x === tileSetWidth) {
                x = 0
                y += 16
            }
        }

        for (let i = 0; i < data.length; i++) {

            const id = Number(data[i])

            if (id === 0) continue

            const [frameX, frameY] = coordinates.get(id) || [0, 0]
            const frame = new Rectangle(frameX, frameY, 16, 16)

            const tile = new Texture({
                source: texture.source,
                frame,
            })

            const spriteX = i % layerWidth * 16
            const spriteY = Math.floor(i / layerWidth) * 16
    
            const sprite = new Sprite(tile)
    
            sprite.y = spriteY
            sprite.x = spriteX
    
            stage.addChild(sprite)
        }

    }

    function onEnter(eid: number) {
        const tmx = decode(TileMap.tmx[eid])
        const image = decode(TileMap.image[eid])

        const map = tileMaps.get(tmx)
        const texture = Texture.from(image)

        if (!map) {
            console.error('tmx file not found', tmx)
            return
        }

        if (!texture) {
            console.error('texture not found', image)
            return
        }

        map.layers.forEach(l => renderLayer(l, map.tileSet, texture))
    }

    
    return defineGameSystem(world => {

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