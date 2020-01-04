const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //extrait le css dans des fichiers bien distinc au lieu de l'injecter dans le bundle
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
                    hmr: !dev, //je pense que le hmr ici ne fonctionne pas
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
    entry: {
      //app = nom donné au fichié puis la valeur, ici deux entry spécifié sous tabluea
      //ensuite pour donner la valeur de app il faut faire [name].extension du fichier
      app: ["./src/js/index.js","./src/sass/style.scss"],    
    },
    output: {
      //j'envoie mes fichier dans public js/css en dev sinon dans le dossier dist en prod avec un fichier hash
      path: dev ? path.resolve(__dirname, "./public/") : path.resolve(__dirname, "./public/dist/"),
      filename: dev ? "js/[name].js" : "[name].[hash].js",
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
      filename: dev ? '/css/[name].css' : '[name].[hash].css',
      chunkFilename: dev ? '[id].css' : '[id].[hash].css',
      hmr: !dev,
      }),
    ],
  }
  //charge seulement si on est en prod
  if(!dev){
    config.plugins.push(new ManifestPlugin({
      fileName: 'my-manifest.json',
    }));
    //clean les hash avant la ré ecriture des fichier dans dist en prod
    config.plugins.push(new CleanWebpackPlugin({
      dry: false, //true = ne delete pas test juste

    }));
    //plugins qui permet de generer une page en prod avec les bon hash du manifest.json
    //template = prend une copie d'une page déjà existante et se base dessus.
  
    /*  config.plugins.push(new HtmlWebpackPlugin({
      template: './src/view/template.php',
    }));  */

  }
  module.exports = config;