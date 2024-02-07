// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

export default defineConfig({
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        ]
    
    },
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