import { Types, defineComponent } from 'bitecs'

export default defineComponent({
    width: Types.f32,
    height: Types.f32,

    isColliding: Types.ui8,
})