# ts-transformer-extend-global-interface
A Typescript custom transformer which enables to extend globally declared interfaces.
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
// index.js
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
>️️ *** Please read the important [note](#note). *** <br/>

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

## TypeScript API
See [test](test/compile/compile.ts) for detail.
You can try it with `$ npm test`.

```js
const ts = require('typescript');
const transformer = require('ts-transformer-keys/transformer').default;

const program = ts.createProgram([/* your files to compile */], {
  target: ts.ScriptTarget.ES5,
  noEmitOnError: true,
  esModuleInterop: true,
  noImplicitReturns: true,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
});

const transformers = {
  before: [transformer(program)],
  after: []
};
const { emitSkipped, diagnostics } = program.emit(undefined, undefined, undefined, false, transformers);

if (emitSkipped) {
  throw new Error(diagnostics.map(diagnostic => diagnostic.messageText).join('\n'));
}
```

As a result, the TypeScript code shown [here](test/fileTransformation/Typescript) is compiled into the following JavaScript.
```js
// index.js
"use strict";
// ...
Object.defineProperty(exports, "__esModule", { value: true });
var exports_1 = require("./extension")
var num1 = 24;
var num2 = 36;
console.log('sum of two number is:', Math.add(num1, num2));
// ...
```

```js
// extension.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendGlobalInterfaceSignature = void 0;
Math.add = function (num1, num2) {
    return num1 + num2;
};
exports.extendGlobalInterfaceSignature = 0;
```
>The more typescript code examples can be found [here](examples/Code.md).

## Note 
If in case extension file already contains export keyword, then the following list of syntax will be accepted or rejected.
- [x] 1st scenario 
    > [declareProperty]; <br/>
      [declareProperty]; <br/>
      export { [declaredProperty] }; <br/>
- [x] 2nd scenario  
    > export [declaration]; <br/>
- [ ] 3rd scenario  
    > [declareProperty]; <br/>
      [defineProperty]; <br/>
      export default [declaration];<br/>

(All the above syntax's codes can be found [here](examples/Syntax code.md))
# License
MIT
