const path = require('path');
const webpack = require('webpack');



module.exports = {
    entry:{
        login: path.resolve(__dirname, 'src/client/index.js'),
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname, 'build/frontend'),
        publicPath: '/',
    },
    module:{
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
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    devtool: 'source-map',
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, 'public'),
        port: 9003,
    },
};