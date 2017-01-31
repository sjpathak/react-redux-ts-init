import webpack from "webpack";
import WebpackPreBuildPlugin from "pre-build-webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

let path = require("path");

module.exports = {
    devtool: "inline-source-map",
    resolve: {
        alias: {
            config: path.join(__dirname, "src/app/config/dev.json")
        }
    },
    plugins: [
        new CopyWebpackPlugin([{ context: "src/app/config", from: "config.dev.js", to: "js/config.js" }]),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("development")
            }
        }),
        new WebpackPreBuildPlugin(function() {
            console.log("\nStarting compilation...".bold.yellow);
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
};
