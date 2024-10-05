import { defineConfig } from 'rollup'

import image from '@rollup/plugin-image'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import typescriptEngine from 'typescript'
import pkg from './package.json'

export default defineConfig(
    {
        input: 'src/index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: false,
                exports: 'named',
                name: pkg.name,
            },
            {
                file: pkg.module,
                format: 'es',
                exports: 'named',
                sourcemap: false,
            },
        ],
        plugins: [
            postcss({
                plugins: [],
                minimize: true,
            }),
            external({
                includeDependencies: true,
            }),
            resolve(),
            commonjs({
                include: ['node_modules/**', 'src/types/svg.d.ts', 'src/inputs/mobile/flags'],
                // namedExports: {
                //     'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
                //     'node_modules/react-dom/index.js': ['render'],
                // },
            }),
            // svg(),
            image(),
            typescript({
                tsconfig: './tsconfig.json',
                typescript: typescriptEngine,
                sourceMap: false,
                exclude: [
                    'coverage',
                    '.storybook',
                    'storybook-static',
                    'config',
                    'dist',
                    'node_modules/**',
                    '*.cjs',
                    '*.mjs',
                    '**/__snapshots__/*',
                    '**/__tests__',
                    '**/*.test.js+(|x)',
                    '**/*.test.ts+(|x)',
                    '**/*.mdx',
                    '**/*.story.ts+(|x)',
                    '**/*.story.js+(|x)',
                    '**/*.stories.ts+(|x)',
                    '**/*.stories.js+(|x)',
                    'setupTests.ts',
                    'vitest.config.ts',
                ],
                //   rollupCommonJSResolveHack: true,
                //   exclude: "**/__tests__/**",
                //   clean: true
            }),
        ],
    },
    {
        input: 'dist/esm/types/src/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        external: [/\.(sc|sa|c)ss$/],
        plugins: [dts()],
    }
)
