export {}

declare global {
    interface Math {
        add: (num1: number, num2: number) => number;
    }
}

Math.add = (num1: number, num2: number) => {
    return num1 + num2;
}