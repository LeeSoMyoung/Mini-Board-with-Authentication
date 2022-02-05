const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebPackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve('./src/dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.png$/,
                use: [{ loader: 'file-loader', options: { publicPath: './src/static/img' } }]
            }
        ]
    },
    plugins: [
       // new CleanWebPackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/static/html/index.html'
        }),
    ]
}