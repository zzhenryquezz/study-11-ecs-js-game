
export interface IIntersectItem {
    x: number
    y: number
    width: number
    height: number
}

export function intersect(a: IIntersectItem, b: IIntersectItem){
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
}