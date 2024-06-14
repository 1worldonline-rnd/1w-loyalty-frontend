const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const dotenv = require("dotenv").config({ path: path.join(__dirname, '../.env'), });

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './index.js'),
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'widget-constructor.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(dotenv.parsed),
        }),
        // common: don't change
        new HtmlWebpackPlugin({
            title: 'Widget constructor',
            loyaltyWidgetId: '9f718a9d-dccf-431f-94f5-e23592118bb2',
            template: path.resolve(__dirname, './index.html'),
            filename: 'widget-constructor.html',
        }),
    ],
};
