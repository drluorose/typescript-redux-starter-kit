
var webpack = require("webpack");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");


//自定义"魔力"变量
var definePlugin = new webpack.DefinePlugin({
    __DEBUG__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || "false")),
    __DEBUG_NEW_WINDOW__:true,
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || "false")),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || "false"))
});


module.exports = {
    //上下文
    context: __dirname + "/src",
    //配置入口
    entry: {
        app: [
            "webpack-hot-middleware/client?timeout=5000&path=http://localhost:3000/__webpack_hmr",
            "./app.tsx"
        ]
    },
    //配置输出
    output: {
        path: __dirname + "/build/",
        filename: "bundle.js?[hash]",
        publicPath: "http://localhost:3000/build/",
        sourceMapFilename: "[file].map"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    //模块
    module: {
        loaders: [
             { test: /\.tsx?$/, loader: "ts-loader" }, // 处理Typescript
             {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(
                        "style-loader",
                        "css-loader?sourceMap"
                   )
             },
             {
                  test: /\.(png|jpg|gif)$/,
                  loader: "url-loader?limit=1024"
             }
             
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        //公用模块
        //new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),

        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
         //设置抽出css文件名
        new ExtractTextPlugin("css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]", {
            disable: false,
            allChunks: true
        }),
        //定义全局变量
        definePlugin
    ],
    //添加了此项，则表明从外部引入，内部不会打包合并进去
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
