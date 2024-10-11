import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import nodeExternals from 'rollup-plugin-node-externals'
import svg from 'rollup-plugin-svg'
import packageJson from './package.json' assert { type: 'json' }

export default [
    {
        input: './src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                exports: 'named',
                name: packageJson.name,
                // sourcemap: true
                // preserveModules: true,
            },
            {
                file: packageJson.module,
                format: 'es',
                exports: 'named',
                name: packageJson.name,
                // sourcemap: true
                // preserveModules: true,
            },
        ],
        plugins: [nodeExternals(), resolve(), commonjs(), typescript(), svg(), terser()],
        external: [...Object.keys(packageJson.peerDependencies)],
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
