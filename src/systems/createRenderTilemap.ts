import Position from '@/components/Position'
import TileMap from '@/components/TileMap'
import { defineQuery, enterQuery } from 'bitecs'
import {  Container, Rectangle, Sprite, Texture } from 'pixi.js'

import { XMLParser } from 'fast-xml-parser'

interface TileSet {
    // image size
    width: number
    height: number

    // tile sizes
    tilewidth: number
    tileheight: number
    tilecount: number

    // line size
    columns: number
}

interface Layer {
    name: string
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

    const files = Object.entries(import.meta.glob('../assets/maps/*.tmx', {
        as: 'raw',
        eager: true,
    }))

    const tileMaps = new Map<string, Map>()

    files.forEach(([url, data]) => {
        const name = url.replace('../assets/maps/', '')

        const content = parser.parse(data)

        const contentLayers = Array.isArray(content.map.layer) ? content.map.layer : [content.map.layer]
        const layers = contentLayers.map((l: any) => ({
            data: l.data['#text'].split(',').map(Number),
            width: l.width,
            name: l.name,
        }))

        tileMaps.set(name, {
            layers,
            tileSet: {
                width: Number(content.map.tileset.image.width),
                height: Number(content.map.tileset.image.height),
                tilewidth: Number(content.map.tileset.tilewidth),
                tileheight: Number(content.map.tileset.tileheight),
                tilecount: Number(content.map.tileset.tilecount),
                columns: Number(content.map.tileset.columns),
            },
        })
    })


    function onEnter(eid: number) {

        const {
            tmx,
            image,
            layerName,
            setIsLoaded,
            setPositions,
        } = useTileMap(eid)

        const map = tileMaps.get(tmx)
        const texture = Texture.from(image)
        const layer = map?.layers.find(l => l.name === layerName)

        if (!map) {
            console.error('tmx file not found', tmx)
            return
        }

        if (!texture) {
            console.error('texture not found', image)
            return
        }
        

        if (!layer) {
            console.error('layerName not found', layerName)
            return
        }

        const tileSet = map.tileSet

        const matrix = unFlatten<number[]>(layer.data, layer.width)
        const mapPositions = [] as number[]

        for (let y = 0; y < matrix.length; y++) {
            const row = matrix[y]

            for (let x = 0; x < row.length; x++) {
                const id = row[x]

                if (id === 0) continue

                const frameLineX = (id % tileSet.columns) - 1
                const frameLineY = Math.floor(id / tileSet.columns)

                const frameX = frameLineX * tileSet.tilewidth
                const frameY = frameLineY * tileSet.tileheight

                const frame = new Rectangle(frameX, frameY, tileSet.tilewidth, tileSet.tileheight)

                const tile = new Texture({
                    source: texture.source,
                    frame,
                })

                const spriteY = y * tileSet.tileheight
                const spriteX = x * tileSet.tilewidth

                const sprite = new Sprite(tile)

                sprite.y = spriteY
                sprite.x = spriteX

                mapPositions.push(spriteX, spriteY, tileSet.tilewidth, tileSet.tileheight)

                stage.addChild(sprite)
            }
        }

        setPositions(mapPositions)

        setIsLoaded(1)

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