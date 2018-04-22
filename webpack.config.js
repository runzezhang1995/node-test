const path = require('path');
const webpack = require('webpack');



module.exports = {
    entry: {
        homePage: path.resolve(__dirname, 'src/client/homePage.js'),
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname, 'build/frontend'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    devtool: 'source-map',
    node: {
        popper: 'empty'
    },
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, 'public'),
        port: 9000,
    },
};