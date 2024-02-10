import { addComponent as baseAddComponent, addEntity, Component } from 'bitecs'
import { GameWord } from './createGameWord'

interface GameEntity {
    id: number
    addComponent: (component: Component) => void
    addManyComponents: (...components: Component[]) => void
    world: GameWord
}

export function defineGameEntity<T>(fn: (world: GameEntity) => T){    
    return function(world: GameWord){
        const id = addEntity(world)
    
        const addComponent: GameEntity['addComponent'] = (component: Component) => {
            baseAddComponent(world, component, id)
        }

        const addManyComponents: GameEntity['addManyComponents'] = (...components: Component[]) => {
            components.forEach(addComponent)
        }



        return fn({ id, addComponent, addManyComponents, world })
    }
}