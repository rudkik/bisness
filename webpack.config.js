const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');


fs.stat('.babelrc', function (err) {
  if (err == null) {
    console.log('\x1b[32m%s\x1b[0m', 'File .babelrc exists\n');
  } else {
    fs.writeFileSync('.babelrc', '{"presets":["@babel/preset-env"]}');
  }
});

const postcssConfig = [
  require('autoprefixer')
];

const config = {
  entry: ["./src/js/index.js", "./src/scss/style.scss"],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          }, {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssConfig
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            },
          }
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: [/img/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: [/fonts/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css'
    })
  ],
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin()
    ],
  },
  stats: {
    entrypoints: false,
    children: false,
    performance: false,
    assets: false,
    chunks: false,
    hash: false,
    modules: false,
  }
};

module.exports = (env, argv) => {

  if (argv.mode === "production") {
    postcssConfig.push(
      require("cssnano")({
        preset: [
          "default"
        ]
      }),
    );
    config.optimization['minimize'] = true;
  }

  return config;
};

