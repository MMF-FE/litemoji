import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    // target: 'es5',
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: true,
    format: ['cjs', 'esm'],
    legacyOutput: true,
    external: ['iconv-lite']
})