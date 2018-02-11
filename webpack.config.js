var path = require('path');

module.exports = {
    entry: './app/init.ts',
    output: {
        filename: 'dist/bundle.js',
        path: __dirname,
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFileName: 'tsconfig.json',
                }
            },
            {
                test: /\.js/,
                loaders: ['babel-loader']
            },
            {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        compress: true,
        port: 8001,
        disableHostCheck: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: 'source-map'
};