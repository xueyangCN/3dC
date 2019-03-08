const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path');
let PORT = 8066;
let config = {
	entry:{
        index:path.join(__dirname,'/src/app.tsx'),
        vendor:['react','react-dom','react-redux','immutable']//需要单独拉出打包成verdor
	},
	output:{
		path:path.join(__dirname,'dist'),
		publicPath:'./',
		filename:'bundle-[hash].js',
		chunkFilename:'[name].[chunkhash:5].js'
	},
	//devtool:'source-map',
	plugins:[
		new htmlWebpackPlugin({
			template:path.join(__dirname,'/src/index.html')
		}),
		new extractTextPlugin('style.css'),
		new CleanWebpackPlugin(
			['dist/*.js',"dist/*.js.map","dist/*.css","dist/*.css.map"],
			{
				root:__dirname,
				verbose:true,
				dry:false
			}
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-[hash].js',
            minChunks: 2,//最小重复加载次数，打包成common
          }),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV':'pubulic',
			IS_DEVELOPMENT:false
        }),
        /* 压缩优化代码开始*/
	    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
	    // 分析代码
	    new BundleAnalyzerPlugin({ analyzerPort: 3011 })
	],
	module : {
		rules : [
			// { 
			// 	test : /(\.js|\.jsx|\.tsx)$/,
			// 	use : {
			// 		loader : 'babel-loader'
			// 	}
			// },
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
           	{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
			{
				test : /(\.scss|\.css)$/,
				use : extractTextPlugin.extract({
					fallback:'style-loader',
					use : [
						{
							loader : 'css-loader',
							options : {
								modules : true,
								localIdentName: '[name]__[local]--[hash:base64:5]'
							}
						},
						{
							loader: 'sass-loader'
						}
					]
				})
			},
			{
				test : /(\.png|\.jpeg|\.jpg|\.gif)$/,
				use : {
					loader : 'image-loader',
					options : {
						limit:8192
					}
				}
			}
		]
	},
	externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}
module.exports = config;