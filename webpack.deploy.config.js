import webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

let path = require("path");

module.exports = {
    resolve: {
        alias: {
            config: path.join(__dirname, "src/app/config/deploy.json")
        }
    },
    plugins: [
        new CopyWebpackPlugin([{ context: "src/app/config", from: "config.deploy.js", to: "js/config.js" }]),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

