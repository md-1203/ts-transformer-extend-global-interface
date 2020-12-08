import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: './index.ts',
    output: {
        file: 'index.js',
        format: 'iife'
    },
    plugins: [
        resolve(),
        typescript({ transformers: [service => ({
                before: [ keysTransformer(service.getProgram()) ],
                after: []
            })] })
    ]
};