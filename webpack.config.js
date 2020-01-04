const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //extrait le css dans des fichiers bien distinc au lieu de l'injecter dans le bundle
const TerserPlugin = require('terser-webpack-plugin');
const path = require("path");
const dev = process.env.NODE_ENV === "dev";

//permet d'exernialiser les loader css et de crée une condition si on est en prod ou non
let cssLoaders = [
                // Creates `style` nodes from JS strings
                'style-loader',
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    // you can specify a publicPath here
                    // by default it uses publicPath in webpackOptions.output
                    publicPath: "./public/css/",
                    hmr: !dev,
                  },
              },
                // Translates CSS into CommonJS
                { loader: 'css-loader', options: { importLoaders: 1 } }
                
          ]
          //Si je ne suis pas en dev, je push les plugins autoprefixer et css nano
          if (!dev){
            cssLoaders.push({
                loader : 'postcss-loader',
                options: {
                  plugins: (loader) => [
                    require('autoprefixer')(), //browser options à voir pour les vieux navigateurs ?
                    require('cssnano')()
                  ]
                }
              
              })
            }
 
    let config = {
    mode: 'development',
    watch: true, // mon watched qui me permet de npm run dev grâce au mot clé rentré dans le package.json sous scripts
    entry: "./src/js/index.js",
    output: {
      path: path.resolve(__dirname, "./public/"),
      filename: "js/bundle.js"
    },

    devtool : dev ? "cheap-module-eval-source-map" : false, //utilisation d'un source map qui m'indique la ligne pour pouvoir debbug

    module: {
      rules : [
        {
          test: /\.js$/, //expression reguliere qui lui indique que à chaque fois qu'il a un fichier js
          exclude: /(node_modules|bower_components)/,
          use:['babel-loader']
        },
        {
          test : /\.css$/,
          use: cssLoaders
        },
        {
          test : /\.scss$/,
          use: [
            ...cssLoaders,
                // Compiles Sass to CSS
                'sass-loader',
          ]
        }
      ]
    },
    optimization: {
      minimize: !dev, //minifie les choses seulement si on est en prod
      minimizer: [new TerserPlugin({ 
        test: /\.js(\?.*)?$/i,
      })],
    },
    plugins:[
      new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '/css/[name].css',
      chunkFilename: '[id].css',
      hmr: !dev,
      }),
    ],
  }

  module.exports = config;