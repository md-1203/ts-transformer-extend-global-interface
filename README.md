# ts-transformer-extend-global-interface
A Typescript custom transformer which enables to extend globally declare interface.
Typescript allow to extend the globally declared interfaces.(likewise String, Array, etc or any other Library)

```ts
// extension.ts
// ...
declare global {
    interface Math {
        add: (num1: number, num2: number) => number;
        //...
    }
}

Math.add = (num1: number, num2: number) => {
    return num1 + num2;
}
// ...
export {}
```

In order to use such extension, the file needs to be imported as shown below. (Here, we are importing extension.ts file)
```ts
// index.ts
// ...
import {} from "./extension"; // or import * as _ from "./extension"

const num1 = 24;
const num2 = 36;
const result = Math.add(num1, num2);
// ...
```

And Typescript configuration is
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "CommonJS",
    // ...
  }
  // ...
}
```

## But the problem is..
When these compiled code will run by Javascript engine, then it will throw an error as Typescript compiler optimize the import statements.(as we can see below)
```js
// extension.js
"use strict";
// ...
Object.defineProperty(exports, "__esModule", { value: true });
Math.add = function (num1, num2) {
    return num1 + num2;
};
// ...
```

```js
// index.js
"use strict";
// ...
Object.defineProperty(exports, "__esModule", { value: true });
var num1 = 24;
var num2 = 36;
console.log('sum of two number is:', Math.add(num1, num2));
// ...
```

And the error is
```shell script
$ node index
/dirPath/index.js:5
console.log('sum of two number is:', Math.add(num1, num2));
                                          ^
TypeError: Math.add is not a function
    at Object.<anonymous> (/dirPath/index.js:5:43)
    ...
    at internal/main/run_main_module.js:17:47
```
(Here, the Node engine used to run the compiled code.)

## Solution?
This custom transformer will inform the Typescript compiler not to optimize only those import statements that extend the global interface. (as we can see below)
```js
"use strict";
// ...
Object.defineProperty(exports, "__esModule", { value: true });
var exports_1 = require("./extension")
var num1 = 24;
var num2 = 36;
console.log('sum of two number is:', Math.add(num1, num2));
// ...
```

Now, when we re-run the code, it will be executed without any error. 
```shell script
$ node index
sum of two number is: 60
```

# Requirement
Typescript >= 2.4.1

# How to use the custom transformer

Unfortunately, TypeScript itself does not currently provide any easy way to use custom transformers (See https://github.com/Microsoft/TypeScript/issues/14419).
The followings are the example usage of the custom transformer.

## Webpack (with ts-loader or awesome-typescript-loader)

See [examples/webpack](examples/webpack) for detail.

```js
// webpack.config.js
const extendGlobalInterfaceTransformer = require('ts-transformer-extend-global-interface/transformer').default;

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader', // or 'awesome-typescript-loader'
        options: {
          // make sure not to set `transpileOnly: true` here, otherwise it will not work
          getCustomTransformers: program => ({
              before: [
                  extendGlobalInterfaceTransformer(program)
              ]
          })
        }
      }
    ]
  }
};

```

## Rollup (with rollup-plugin-typescript2)

See [examples/rollup](examples/rollup) for detail.

```js
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import extendGlobalInterfaceTransformer from 'ts-transformer-extend-global-interface/transformer';

export default {
  // ...
  plugins: [
    resolve(),
    typescript({ transformers: [service => ({
      before: [ extendGlobalInterfaceTransformer(service.getProgram()) ],
      after: []
    })] })
  ]
};
```

## ttypescript

See [examples/ttypescript](examples/ttypescript) for detail.
See [ttypescript's README](https://github.com/cevek/ttypescript/blob/master/README.md) for how to use this with module bundlers such as webpack or Rollup.

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "plugins": [
      { "transform": "ts-transformer-extend-global-interface/transformer" }
    ]
  },
  // ...
}
```

## ts-jest

See [examples/ts-jest](examples/ts-jest) for details.
In order to use this transformer with ts-jest, you need to add a wrapper around it like this:

```javascript
// ts-jest-extend-global-interface-transformer.js
const extendGlobalInterfaceTransformer = require('ts-transformer-extend-global-interface/transformer').default;
const name = 'my-key-transformer';
const version = 1;
const factory = (cs) => (ctx) => extendGlobalInterfaceTransformer(cs.tsCompiler.program)(ctx);
module.exports = { name, version, factory };
```

And add it in `jest.config.js` like this:

```javascript
  globals: {
    'ts-jest': {
      // relative path to the ts-jest-extend-global-interface-transformer.js file
      astTransformers: { before: ['src/react/ts-jest-extend-global-interface-transformer.js'] },
    },
  },
```

Note: ts-jest 26.4.2 does not work with this transformer (fixed in ts-jest 26.4.3). Also, for versions smaller than 26.2, you need to provide the transformer in an array instead, like this: `astTransformers: { before: ['src/react/ts-jest-extend-global-interface-transformer.js'] }`

## TypeScript API

See [test](test) for detail.
You can try it with `$ npm test`.

```js
const ts = require('typescript');
const extendGlobalInterfaceTransformer = require('ts-transformer-keys/transformer').default;

const program = ts.createProgram([/* your files to compile */], {
  strict: true,
  noEmitOnError: true,
  target: ts.ScriptTarget.ES5
});

const transformers = {
  before: [extendGlobalInterface(program)],
  after: []
};
const { emitSkipped, diagnostics } = program.emit(undefined, undefined, undefined, false, transformers);

if (emitSkipped) {
  throw new Error(diagnostics.map(diagnostic => diagnostic.messageText).join('\n'));
}
```

As a result, the TypeScript code shown [here](#how-to-use-keys) is compiled into the following JavaScript.

```js
"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.defineProperty(Math, "add", {
    value: function (num1, num2) {
        return num1 + num2;
    }
});
```

# License

MIT

[npm-image]:https://img.shields.io/npm/v/ts-transformer-keys.svg?style=flat
[npm-url]:https://npmjs.org/package/ts-transformer-keys