import { Types, defineComponent } from 'bitecs'

export default defineComponent({
    // filename relative to /src/assets/tileMaps folder
    tmx: [Types.ui8, 32],
    // filename relative to /src/assets/tileMaps folder
    image: [Types.ui8, 32],
    // layer name in the tmx file
    layerName: [Types.ui8, 32],
    // make all tiles in this layer solid
    enableCollision: Types.ui8,

    // tile-map is loaded and positions are set
    loaded: Types.ui8,

    // flat array with [x, y, width, height, x, y, width, height, ...]
    positions: [Types.ui8, 32],
})