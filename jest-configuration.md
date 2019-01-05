
# Some information to configure JEST

<https://basarat.gitbooks.io/typescript/docs/testing/jest.html>


good tuto configuring jest / vscode /typescript
https://medium.com/@mtiller/debugging-with-typescript-jest-ts-jest-and-visual-studio-code-ef9ca8644132
https://github.com/mtiller/ts-jest-sample


``` batch
npm i jest @types/jest ts-jest -D
```

<!-- Add the following jest.config.js file to the root of your project:

``` json
module.exports = {
  "roots": [  
    "<rootDir>/src"  
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}
``` -->

in the package.json

``` json
"jest": {
    "roots": [
      "./src/services"
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ],
    "transform": {
      "\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js"
    },
    "testRegex": "/__tests__/.*\\.(ts|tsx|js)$"
}
```

a confirmer l'utilisation de cette configuration pour pouvoir utiliser les path alias
    "moduleNameMapper": {
      "@stencil/core/mock-doc": "<rootDir>/mock-doc/",
      "store/index":"<rootDir>/src/store/index"
    },

## some other links

package.json configuration of ionic
<https://github.com/ionic-team/stencil/blob/master/package.json#L157-L159>

