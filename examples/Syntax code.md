# Syntax code examples
## 1st scenario
```ts
// extension.ts
declare global {
    interface String {
        // ...
    }
    // ...
} 
// ...
let someConst: number; // declare
someConst = 20;        // define
export {someConst}     // exported
``` 

## 2nd scenario
```ts
// extension.ts
// ...
declare global {
    interface String {
        // ...
    }
    // ...
} 
// ...
export function someHelperFunc() { // export declaration
    const someProperty = "Just a simple constant";
    // ...
}
// ...
``` 

## 3rd scenario
```ts
// extension.ts
// ...
declare global {
    interface String {
        // ...
    }
    // ...
} 
// ...
let someConst: number;    // declare
someConst = 20;           // define
// ...
export default someConst; // exported;
``` 
*** This type of file will be ignored by the transformer as file contain default export. ***