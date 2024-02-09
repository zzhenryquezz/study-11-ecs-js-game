export function createKeyboard() {

    const keys = {} as Record<KeyboardEvent['code'], boolean>


    addEventListener('keydown', (e) => {
        keys[e.key] = true
    })

    addEventListener('keyup', (e) => {
        keys[e.key] = false
    })

    return defineGameSystem(world => {
        
        world.keyboard = keys

        return world
    })
}