export function useItem(eid: number) {
    const position = usePosition(eid)

    const sheet = useSpriteSheet(eid)

    return  {
        eid,
        position,
        sheet,
    }

}