import { defineConfig } from 'rollup'

import { readFileSync } from 'fs'

import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import external from 'rollup-plugin-peer-deps-external'
// import postcss from 'rollup-plugin-postcss'
import typescriptEngine from 'typescript'
// import pkg from './package.json'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'
import svg from 'rollup-plugin-svg'

const packageJson = JSON.parse(readFileSync('./package.json'))

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
                exports: 'named',
                name: packageJson.name,
            },
            {
                file: packageJson.module,
                format: 'es',
                exports: 'named',
                sourcemap: true,
            },
        ],
        plugins: [
            external({
                includeDependencies: true,
            }),
            resolve({
                jsnext: true,
                main: true,
                browser: true,
                // browser: true,
                // preferBuiltins: false,
            }),
            commonjs({
                include: ['node_modules/**', 'general.d.ts', 'src/inputs/mobile/flags'],
                // namedExports: {
                //     'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
                //     'node_modules/react-dom/index.js': ['render'],
                // },
            }),
            svg(),
            // image(),
            typescript({
                sourceMap: true,
            }),
            // terser()
        ],
    },
    {
        input: './src/types.d.ts',
        output: [{ file: './dist/index.d.ts', format: 'es' }],
        plugins: [dts()],
    },
]
