import { Types, defineComponent } from 'bitecs'

export default defineComponent({
    // filename of image inside /src/assets folder
    name: [Types.ui8, 32],
    scale: Types.f32,
    flipX: Types.ui8,
})