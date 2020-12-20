const transformer = require("ts-transformer-extend-global-interface/transformer").default;

module.exports = ["ts-loader", "awesome-typescript-loader"].map((loader) => ({
    mode: "development",
    entry: [
        "./src/index.ts",
        "./src/extension.ts"
    ],
    output: {
        path: __dirname + `/dist`,
        filename: `${loader}.bundle.js`
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
                                transformer(program)
                            ]
                        })
                    }
                },
            }
        ]
    }
}));