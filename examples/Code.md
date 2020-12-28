# Code examples
## Example 1
The extension of single global interface is present in a single file. (Here, file name is math.ts)
```ts
// extension.ts
export {}
declare global {
    interface Math {
        add: (num1: number, num2: number) => number; // Declaration
        //...
    }
}

Math.add = (num1: number, num2: number) => { // Definition
    return num1 + num2;
}
// ...
```

And, it can be used by simply importing the above like this
```ts
// index.ts
// ...
import {} from "./extension"; // or import * as _ from "./extension"

const num1 = 24;
const num2 = 36;
const result = Math.add(num1, num2);
// ...
```
## Example 2
If the extension of various global interfaces is present in a single file. (Here, file name is extension.ts)
```ts
// extension.ts
// ...
export {}
declare global {
    interface Math {
        add: (num1: number, num2: number) => number;
        //...
    }
    interface String {
        isEqualTo: (str: string) => boolean;
        //...
    }
}

Math.add = (num1: number, num2: number) => {
    return num1 + num2;
}
// ...
String.prototype.isEqualTo = function(str: string): boolean {
    return this.valueOf() == str;
}
// ...
export {}
```
And, it can also be used by simply importing the above like this
```ts
// index.ts
// ...
import {} from "./extension"; // or import * as _ from "./extension"

const num1 = 24;
const num2 = 36;
const result = Math.add(num1, num2);
// ...
```

## Example 3
If the extension of various global interfaces had been modularised, then multiple files need to be imported in order to work.
If in case the project directory structure might be look like below. 
```
Project
+-- extension
|   |
|   +-- index.ts
|   +-- string.ts
|   +-- math.ts
|
+-- index.ts
|
```
Then index file, math file, and string file of extension directory might be look like
```ts
// extension/index.ts
export * from "./math";
export * from "./string";
// ...
```

```ts
// extension/math.ts
export  {}

declare global {
    interface Math {
        add: (num1: number, num2: number) => number;
        // ...
    }
}

Math.add = function (num1, num2): number {
    return num1 + num2;
}
// ...
```

```ts
// extension/string.ts
export {}

declare global {
    interface String {
        isEqualTo: (str: string) => boolean;
        // ...
    }
}

String.prototype.isEqualTo = function(str: string): boolean {
    return this.valueOf() == str;
}
// ...
```
And, the index file of project directory might be look like 
```ts
// Project/index.ts
import {} from "./extension"; // or import * as _ from "./extension"
// ...

const num1 = 24;
const num2 = 36;
console.log('sum of two number is:', Math.add(num1, num2));

const string1 = "Hello world";
const string2 = "Hello world";
console.log(`string1 ${string1.isEqualTo(string2) ? "is equal": "is not equal" } to string2`);
// ...
```
