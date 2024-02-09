import Position from '@/components/Position'

export function usePosition(eid: number){
    let x = Position.x[eid]
    let y = Position.y[eid]

    function setPosition(newX: number, newY: number){
        Position.x[eid] = newX
        Position.y[eid] = newY

        return usePosition(eid)
    }

    function refresh(){
        x = Position.x[eid]
        y = Position.y[eid]
    }

    return {
        eid,
        x,
        y,

        setPosition,
        refresh,
    }
}