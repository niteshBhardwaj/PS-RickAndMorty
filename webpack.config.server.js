const path = require('path');
var webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');

module.exports = function(env) {  
    let isLocal = !!env.local; 
    return {
        entry: [
        'regenerator-runtime/runtime',
        `./server/server.js`
        ],
        target: 'node',
        devtool: isLocal? 'source-map': '',
        externals: [nodeExternals()],
        output: {
            path: isLocal? path.resolve("./dist") : path.resolve("./compiled"),
            filename: 'server-bundle.js',
            publicPath: './dist'
        },        
        module: {
            rules: [
                {
                 test: /\.js$/,
                 exclude: /node_modules/,
                 loader: 'babel-loader', // '@sucrase/webpack-loader',
                 options: {
                     presets: ["@babel/preset-env", "@babel/preset-react"],
                     plugins: ["@babel/plugin-transform-runtime"]
                 }
               },
               { test: /\.css$/,
                loader: 'ignore-loader'
               },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
    }
}
