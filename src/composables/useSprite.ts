import Position from '@/components/Position'
import Sprite from '@/components/Sprite'

export function useSprite(eid: number){
    let x = Position.x[eid]
    let y = Position.y[eid]
    let scale = Sprite.scale[eid]

    let image = decode(Sprite.name[eid])

    function setSprite(name: string){
        Sprite.name[eid] = encode(name)
        
        return useSprite(eid)
    }

    function setScale(s: number){
        Sprite.scale[eid] = s
        scale = s

        return useSprite(eid)
    }

    function refresh(){
        x = Position.x[eid]
        y = Position.y[eid]
        scale = Sprite.scale[eid]
        image = decode(Sprite.name[eid])
    }

    return {
        eid,
        x,
        y,
        scale,
        image,
        
        setSprite,
        setScale,
        refresh
    }
}