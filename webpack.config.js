const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',　//buildするファイル
    output: {
        filename: 'bundle.js',　//build後のファイル名
        path: path.join(__dirname, '../company_data/company_info/static/js'), //buildファイルが作成される場所
    },
    module: {
        rules: [
          {
            test: /\.js[x]?$/,  
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react' 
                ],
                plugins: ['@babel/plugin-proposal-class-properties'] 
              }
            }
          },
          //変更
          {
            test: /\.(css|scss|sass)$/,
            // Sassファイルの読み込みとコンパイル
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              // CSSをバンドルするためのローダー
              {
                loader: "css-loader",
                options: {
                  //URL の解決を無効に
                  url: false,
                  // ソースマップを有効に
                  sourceMap: true,
                },
              },
              // Sass を CSS へ変換するローダー
              {
                loader: "sass-loader",
                options: {
                  // dart-sass を優先
                  implementation: require('sass'),
                  sassOptions: {
                    // fibers を使わない場合は以下で false を指定
                    // fiber: require('fibers'),
                    fiber: false,
                  },
                  // ソースマップを有効に
                  sourceMap: true,
                },
              },
            ],                         
          },
          //ここまで追加
          //もともと
          // {
          //   test: /\.css$/, 
          //   use: ['style-loader', 'css-loader'] 
          // },
          {
            test: /\.(png|svg|jpg|jpeg)$/, 
            use: [
              {
                loader: 'url-loader',
                options: {
                    //ここ追加
                    name: '[path][name].[ext]'
                }  
              }
            ] 
          }
        ]
    },
    //プラグインの設定 追加
    plugins: [
      new MiniCssExtractPlugin({
      // 抽出する CSS のファイル名
        filename: "style.css",
      }),
    ],
    //source-map タイプのソースマップを出力
    devtool: "source-map",
    // node_modules を監視（watch）対象から除外
    watchOptions: {
      ignored: /node_modules/  //正規表現で指定
    },
    //end 追加
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
};