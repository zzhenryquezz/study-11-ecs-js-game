import Position from '@/components/Position'

export function usePlayer(eid: number){
    function move(x: number, y: number){
        Position.x[eid] = x
        Position.y[eid] = y
    }

    return { eid, move }
}
