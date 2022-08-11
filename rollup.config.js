import image from '@rollup/plugin-image';
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    //   exports: "named",
      sourcemap: true
    },
  ],
  plugins: [
    external(),
    resolve(),
    // svg(),
    image(),
    typescript({
    //   rollupCommonJSResolveHack: true,
    //   exclude: "**/__tests__/**",
    //   clean: true
    }),
    commonjs({
      include: ["node_modules/**", "src/types/svg.d.ts", "src/inputs/mobile/flags"],
      namedExports: {
        "node_modules/react/react.js": [
          "Children",
          "Component",
          "PropTypes",
          "createElement"
        ],
        "node_modules/react-dom/index.js": ["render"]
      }
    })
  ]
};