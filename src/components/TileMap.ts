import { Types, defineComponent } from 'bitecs'

export default defineComponent({
    // filename relative to /src/assets/tileMaps folder
    tmx: [Types.ui8, 32],
    image: [Types.ui8, 32],
})