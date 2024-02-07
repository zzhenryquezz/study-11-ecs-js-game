// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        AutoImport({
            eslintrc: { enabled: true, },
            dts: true,
            dirs: [
                './src/composables'
            ]
        }),
    ],
})