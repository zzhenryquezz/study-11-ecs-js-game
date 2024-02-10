import TileMap from '@/components/TileMap'


export function useTileMap(eid: number) {
    let tmx = decode(TileMap.tmx[eid])
    let image = decode(TileMap.image[eid])
    let layerName = decode(TileMap.layerName[eid])
    let enableCollision = TileMap.enableCollision[eid]
    let positions = unFlatten<[number, number, number, number]>(decode(TileMap.positions[eid]).split(',').map(Number), 4)
    let isLoaded = TileMap.loaded[eid] === 1

    function refresh() {
        tmx = decode(TileMap.tmx[eid])
        image = decode(TileMap.image[eid])
        layerName = decode(TileMap.layerName[eid])
        enableCollision = TileMap.enableCollision[eid]
        positions = unFlatten(Array.from(TileMap.positions[eid]), 4)
        isLoaded = TileMap.loaded[eid] === 1
    }

    function setTmx(newTmx: string) {
        TileMap.tmx[eid] = encode(newTmx)
        
        return useTileMap(eid)
    }

    function setImage(newImage: string) {
        TileMap.image[eid] = encode(newImage)
        
        return useTileMap(eid)
    }

    function setLayerName(newLayerName: string) {
        TileMap.layerName[eid] = encode(newLayerName)
        
        return useTileMap(eid)
    }

    function setEnableCollision(newEnableCollision: number) {
        TileMap.enableCollision[eid] = newEnableCollision
        
        return useTileMap(eid)
    }

    function setPositions(newPositions: number[]) {
        TileMap.positions[eid] = encode(newPositions.join(','))
        
        return useTileMap(eid)
    }

    function setIsLoaded(newIsLoaded: number) {
        TileMap.loaded[eid] = newIsLoaded
        
        return useTileMap(eid)
    }

    return {
        tmx,
        image,
        layerName,
        enableCollision,
        positions,
        isLoaded,

        refresh,
        setTmx,
        setImage,
        setLayerName,
        setEnableCollision,
        setIsLoaded,
        setPositions,
    }
}