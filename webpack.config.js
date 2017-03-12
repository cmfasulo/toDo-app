var webpack = require('webpack');
var path = require('path');

//boiler plate config settings for webpack, webpack-dev-server
module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
        'bootstrap-loader',
        './src'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: [
          path.resolve('./src'),
          "node_modules"
        ],
        extensions: ['.js', '.scss']
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015']}
            }],
        },
        {
            test: /\.html$/,
            use: 'raw-loader'
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader?importLoaders=1',
                'postcss-loader',
                'sass-loader'
            ]
        },
        {
            test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
            use: 'imports-loader?jQuery=jquery'
        },
        {
            test: /\.(woff2?|svg)$/,
            use: 'url-loader?limit=10000'
        },
        {
            test: /\.(ttf|eot)$/,
            use: 'file-loader'
        }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {
        hot: true,
        proxy: {
            '*': 'http://localhost:3000'
        }
    }
};
