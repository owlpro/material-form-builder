import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import svg from 'rollup-plugin-svg'
import esbuild from 'rollup-plugin-esbuild'
import packageJson from "./package.json" assert { type: "json" };
import terser from '@rollup/plugin-terser';

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
            resolve(),
            commonjs({
                include: ['node_modules/**', 'general.d.ts', 'src/inputs/mobile/flags'],
            }),
            svg(),
            esbuild({
                exclude: ['/node_modules/', '/dist']
            }),
            terser()
        ],
    },
    {
        input: './src/index.ts',
        output: [{ file: './dist/index.d.ts', format: 'esm' }],
        external: [/\.(css|less|scss)$/],
        plugins: [
            dts({
                tsconfig: './tsconfig.json'
            }),
        ],
    },
]
