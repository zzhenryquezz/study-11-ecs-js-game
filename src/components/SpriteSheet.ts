import { Types, defineComponent } from 'bitecs'

export default defineComponent({
    // filename relative to /src/assets folder
    name: [Types.ui8, 32],

    // filename relative to /assets folder
    image: [Types.ui8, 32],

    width: Types.ui8,
    height: Types.ui8,
    frameSize: Types.ui8,
    frameCount: Types.ui8,
    flipX: Types.ui8,
})