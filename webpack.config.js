var path = require('path');
var webpack = require('webpack');
var vuxLoader = require('vux-loader');
var htmlPlugin = require('html-webpack-plugin');

let webpackConfig = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.js'
  },
  module: {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              loaders: {
              }
              // other vue-loader options go here
            }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]?[hash]'
            }
        },
        {
            test:/\.css$/,
            loader:'style-loader!css-loader!postcss-loader'
        },
        {
            test:/\.less/,
            loader:'style-loader!css-loader!less-loader!postcss-loader'
        }
    ]
  },
  resolve: {
      extensions: ['.js','.vue','.css','.less'],
      alias: {
          'vue$': 'vue/dist/vue.esm.js',
          'jquery':'jquery'
    }
  },
    plugins: [
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery'
        }),
        new htmlPlugin({
            filename:'index.html',
            template:'./templateIndex.html'
        })
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        disableHostCheck: true,
        host : '0.0.0.0',
        port:'80'
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};
module.exports = vuxLoader.merge(webpackConfig,{
    plugins:['vux-ui']
});



if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
