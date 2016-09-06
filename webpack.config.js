const path = require('path');
const webpack = require('webpack');

const PATHS = {
  build: path.join(__dirname, 'build'),
  src: path.join(__dirname, 'src')
};

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
//    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
   
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ]
  },
  devServer: {
    contentBase: PATHS.build,
    historyApiFallback: true,
    hot: true,      
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //global variable plugins
    new webpack.DefinePlugin({
      API_URL: JSON.stringify("http://localhost:3000"),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};


