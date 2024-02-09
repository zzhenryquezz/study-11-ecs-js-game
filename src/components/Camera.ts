import { Types, defineComponent } from 'bitecs'

export default defineComponent({
    // size is relative to the screen size
    size: Types.f32,
    // show a debug rectangle
    stroke: Types.ui8,
    // only show the camera no zoom
    active: Types.f32,
})