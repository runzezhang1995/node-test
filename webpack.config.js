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
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
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
        new webpack.DefinePlugin({
            'process.env.NODE.ENV':"development"
            }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        compress: true,
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        contentBase: path.join(__dirname, 'public'),
        port: 9003,
    },
};