import path from "path";
import { fileURLToPath } from "url";
import rspack from '@rspack/core'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "production",
  devtool: 'hidden-source-map',
  entry: {
    main: "./src/index",
  },
  module: {
    parser: {
      javascript: { importMeta: false },
    },
    rules: [
      {
        resolve: {
          fullySpecified: false,
        },
        test: /\.m?js$/,
        type: 'javascript/auto',
      },
    ],
  },
  output: {
    chunkFormat: 'module',
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].mjs",
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
    topLevelAwait: true
  },
  // Comment this out to fix the issue
  // plugins: [
  //   new rspack.DefinePlugin({ "global.GENTLY": false })
  // ],
  resolve: {
    extensions: ['.js', '.mjs', '.json', '.wasm'],
    fullySpecified: false,
  },
  target: 'node'
};

export default config;
