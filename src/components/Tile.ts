import { Types, defineComponent } from 'bitecs'

export default defineComponent({
    // image name relative to /src/assets folder
    image: [Types.ui8, 32],
    size: Types.ui8,
    frameX: Types.ui8,
    frameY: Types.ui8,
    scale: Types.ui8,
})