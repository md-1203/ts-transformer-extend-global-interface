const extendGlobalInterfaceTransformer = require("../../transformer").default;

module.exports = ["ts-loader", "awesome-typescript-loader"].map((loader) => ({
    mode: "development",
    entry: "./index.ts",
    output: {
        path: __dirname,
        filename: `${loader}.js`
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader,
                    options: {
                        getCustomTransformers: program => ({
                            before: [
                                extendGlobalInterfaceTransformer(program)
                            ]
                        })
                    }
                },
            }
        ]
    }
}));