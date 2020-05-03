const webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const getDevserver = () => (
    {
        //contentBase: path.join(__dirname, 'src/dist/'),
        host: '0.0.0.0',
        compress: true,
        historyApiFallback: true,
        port: 3000,
        index: 'index.html',
        proxy: {
            '**': {
                target: 'http://localhost:8081',
                bypass(req, res, proxyOptions) {
                    console.log("inside bypass", req.headers.accept);
                    if (req.headers.accept.indexOf('html') !== -1 && req.url.indexOf('login') === -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    }
                },
            },
        }
    });

module.exports = ({ mode }) => ({
    context: path.resolve(__dirname, 'src'),
    entry: {
        start: ['./index.jsx'],
        react: ['react', 'react-dom'],
    },
    mode,

    output: {
        path: path.resolve(__dirname, 'src/dist/'),
        filename: 'eet/js/[name]-[hash].js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                loader: 'url-loader?limit=1024&name=eet/images/[name].[ext]'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'quiz',
            filename: 'index.html',
            inject: true,
            hash: true,
            xhtml: true,
            template: 'index.html',
            chunks: ['react', 'start', 'initial']
        }),
        // new BundleAnalyzerPlugin()
    ],
    devServer: mode === 'production' ? {} : getDevserver(),

});