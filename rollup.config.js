import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import svg from 'rollup-plugin-svg'
import esbuild from 'rollup-plugin-esbuild'
import packageJson from './package.json' assert { type: 'json' }
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import nodeExternals from 'rollup-plugin-node-externals'
import typescript from '@rollup/plugin-typescript'
// import nodeResolve f-rom '@rollup/plugin-node-resolve'
import sourcemaps from 'rollup-plugin-sourcemaps'

export default [
    {
        input: './src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                exports: 'named',
                name: packageJson.name,
                // preserveModules: true,
            },
            {
                file: packageJson.module,
                format: 'es',
                exports: 'named',
                // preserveModules: true,
            },
        ],
        plugins: [
            nodeExternals({
                devDeps: false,
                deps: false,
            }),
            resolve(),
            commonjs(),
            typescript(),
            svg(),
            terser(),
        ],
        external: [Object.keys(packageJson.peerDependencies)],
    },
    {
        input: './src/index.ts',
        output: [{ file: './dist/index.d.ts', format: 'esm' }],
        external: [/\.(css|less|scss)$/, /node_modules/],
        plugins: [
            dts({
                tsconfig: './tsconfig.json',
            }),
        ],
    },
]
