import { readFileSync } from 'fs'

import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
// import postcss from 'rollup-plugin-postcss'
// import pkg from './package.json'
import alias from '@rollup/plugin-alias'
import svg from 'rollup-plugin-svg'
import path from 'path'
import esbuild from 'rollup-plugin-esbuild'
import packageJson from "./package.json" assert { type: "json" };

export default [
    {
        input: 'src/index.ts',
        external: Object.keys(packageJson.peerDependencies),
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
                sourcemap: true,
                exports: 'named',
            }
        ],
        plugins: [
            peerDepsExternal(),
            
            resolve({
                // jsnext: true,
                // main: true,
                browser: true,
                // browser: true,
                // preferBuiltins: false,
            }),
            commonjs({
                include: ['node_modules/**', 'general.d.ts', 'src/inputs/mobile/flags'],
                // transformMixedEsModules: true
            }),
            svg(),
            // esbuild()
            // image(),
            // typescript({
            //     sourceMap: true,
            // }),

            // typescript({
            //     tsconfig: './tsconfig.json',
            //     include: ['./general.d.ts']
            // }),
            esbuild()
            // terser()
        ],
    },
    {
        input: './src/index.ts',
        output: [{ file: './dist/index.d.ts', format: 'es' }],
        external: [/\.(css|less|scss)$/],
        plugins: [
            dts({
                tsconfig: './tsconfig.json'
            }),
        ],
    },
]
