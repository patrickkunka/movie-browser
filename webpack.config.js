const path = require('path');

module.exports = {
    entry: './src/init.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist', 'js')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};