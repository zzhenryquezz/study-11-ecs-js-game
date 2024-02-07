import { defineSystem } from 'bitecs'
import { GameWord } from './createGameWord'

export function defineGameSystem(fn: (w: GameWord) => GameWord) {
    return defineSystem(fn)
}