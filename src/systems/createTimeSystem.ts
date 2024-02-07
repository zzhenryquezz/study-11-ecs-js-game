import { defineGameSystem } from '../composables/defineGameSystem'

export function createTimeSystem() {
    return defineGameSystem((world) => {
        const { time } = world
        
        const now = performance.now()
        const delta = now - time.then
        
        time.delta = delta
        time.elapsed += delta
        time.then = now
        
        return world
    })
}