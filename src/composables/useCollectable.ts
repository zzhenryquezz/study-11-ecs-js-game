export function useCollectable(eid: number) {
    const position = usePosition(eid)
    const sheet = useSpriteSheet(eid)
    const collision = useCollision(eid)

    return  {
        eid,
        position,
        sheet,
        collision
    }

}