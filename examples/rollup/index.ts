export {}

declare global {
    interface Math {
        add: (num1: number, num2: number) => number;
    }
}

Math.add = function (num1: number, num2: number): number {
    return num1 + num2;
}