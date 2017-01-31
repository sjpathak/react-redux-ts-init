const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const paths = {
    styles: path.resolve(ROOT_PATH, 'src/less'),
    images: path.resolve(ROOT_PATH, 'src/img'),
    html: path.resolve(ROOT_PATH, 'src/*.*html')
};

module.exports = {
    entry: {
        app: path.resolve(ROOT_PATH, 'src/app/App.tsx'),
    },
    output: {
        path: './dist',
        filename: 'js/[name].js',
    },
    resolve: {
        modules: [
            ROOT_PATH,
            'node_modules'
        ],
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', '.json']
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: paths.images, to: 'img/' },
            { context: 'src', from: '*.cshtml' }
        ]),
        new ExtractTextPlugin('css/[name].css')
    ],
    module: {
        rules: [
            {
                // The loader that handles ts and tsx files.  These are compiled
				// with the ts-loader and the output is then passed through to the
				// babel-loader.  The babel-loader uses the es2015 and react presets
				// in order that jsx and es6 are processed
                test: /\.[jt]s(x)?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                options: {
                    useBabel: true,
                    useCache: true,
                    babelOptions: {
                        presets: [['es2015', { modules: false }], 'react']
                    }
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: [{
                    loader: 'css-loader',
                    query: 'localIdentName=[name]__[local]___[hash:base64:5]',
                },
                {
                    loader: 'sass-loader',
                    query: {
                    data: '@import \'./src/styles/_variables.scss\'; @import \'./src/styles/_colors.scss\';',
                    },
                }],
                }),
            },
            { 
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=100000&name=./imgs/[hash].[ext]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=./fonts/[hash].[ext]',
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: 'file-loader?&name=./fonts/[hash].[ext]' 
            }
        ]
    }
}