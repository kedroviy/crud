const path = require("path");

module.exports = {
    mode: "production",
    target: "node",
    entry: {
        bundle: './src/server.ts',
        cluster: './src/cluster.ts',
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
};
