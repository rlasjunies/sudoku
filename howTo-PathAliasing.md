# How to use path alias

use `rollup-plugin-alias` as the bundling of stencil is done via rollup

## Install the package

> npm install rollup-plugin-alias

## Configure the plugin accordingly

In the stencil config file: `'stencil.config.ts'`

``` javascript
aliasPlugin({
      '@store': 'src/store',
      '@pages': 'src/pages',
    }),
```

## Configure typescript

In the `tsconfig.ts`

``` json
  "baseUrl": ".",
  "paths": {
    "store/*":["src/store/*"],
    "services/*":["src/services/*"],
  },
```

## Enjoy the usage

In your ts file import like this

``` javascript
import * as sc from '@pages/splashscreens'`
```