
<div align="center">

# ECS Game

This is a simple game using Entity Component System (ECS) in JavaScript.

[Check demo online](https://zzhenryquezz.github.io/study-11-ecs-js-game/)

</div>



## Game goal

Collect all the coins in the game world, and return to the starting point.

## Dependencies & Tools

- [vite](https://vitejs.dev/)
- [pixi.js](https://pixijs.com/)
- [bitECS](https://github.com/NateTheGreatt/bitECS)
- [assets pack](https://anokolisa.itch.io/dungeon-crawler-pixel-art-asset-pack)
- [tiled](https://www.mapeditor.org/)

## References

- [Entity Component System in TypeScript with Phaser 3 and bitECS](https://www.youtube.com/watch?v=BVIiAO5-2-Y)
- [Coding Challenge #145: 2D Raycasting](https://www.youtube.com/watch?v=TOEi6T2mtHo)
- [Entity Component System FAQ](https://github.com/SanderMertens/ecs-faq#how-to-create-a-hierarchy-in-ecs)
- [TMX Map Format](https://doc.mapeditor.org/en/stable/reference/tmx-map-format/)

## Systems

- [x] Render
- [x] SpriteSheet animation
- [x] Input
- [x] Movement
- [x] Camera
- [x] Tiled integration (tmx files)
- [ ] Collision
- [ ] Collectable
- [ ] Inventory
- [ ] Room Transition

## Setup

Install dependencies
```bash
npm install
```

Run the game
```bash
npm run dev
```


