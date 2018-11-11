
https://basarat.gitbooks.io/typescript/docs/testing/jest.html


``` batch
npm i jest @types/jest ts-jest -D
```


Add the following jest.config.js file to the root of your project:

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
```


removed from package.json
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