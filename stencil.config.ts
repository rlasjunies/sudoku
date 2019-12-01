import { Config } from '@stencil/core';
// import aliasPlugin from "rollup-plugin-alias";

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  srcDir: "src",
  plugins:[
    // aliasPlugin({
    //   '@store': 'src/store',
    //   '@pages': 'src/pages',
    //   "store":"src/store",
    //   "services":"src/services",
    // }),
  ],
  outputTargets: [
    {
      type: 'www',
      // serviceWorker: {
      //   swSrc: 'src/sw.js',
      //   globPatterns: [
      //     '**/*.{html,js,css,json,ico,png}'
      //   ]
      // }
    }
  ]
};