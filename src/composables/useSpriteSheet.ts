import SpriteSheet from '@/components/SpriteSheet'

export function useSpriteSheet(eid: number) {

    const position = usePosition(eid)

    const image = SpriteSheet.image[eid]
    const width = SpriteSheet.width[eid]
    const height = SpriteSheet.height[eid]
    const frameSize = SpriteSheet.frameSize[eid]
    const frameCount = SpriteSheet.frameCount[eid]


    function setImage(value: string){
        SpriteSheet.image[eid] = encode(value) 
        return useSpriteSheet(eid)
    }

    function setWidth(value: number){
        SpriteSheet.width[eid] = value
        return useSpriteSheet(eid)
    }

    function setHeight(value: number){
        SpriteSheet.height[eid] = value
        return useSpriteSheet(eid)
    }

    function setFrameSize(value: number){
        SpriteSheet.frameSize[eid] = value
        return useSpriteSheet(eid)
    }

    function setFrameCount(value: number){
        SpriteSheet.frameCount[eid] = value
        return useSpriteSheet(eid)
    }

    return  {
        eid,
        
        // position
        x: position.x,
        y: position.y,
        setPosition: position.setPosition,

        // sprite sheet
        image,
        width,
        height,
        frameSize,
        frameCount,
        
        setImage,
        setWidth,
        setHeight,
        setFrameSize,
        setFrameCount
    }

}