const webpack = require('webpack');
const openBrowser = require('open-browser-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
let PORT = 8066;
let config = {
	entry:{
		index:path.join(__dirname,'/src/app.tsx')
	},
	output:{
		path:path.join(__dirname,'dist'),
		publicPath:'/',
		filename:'bundle-[hash].js',
		chunkFilename:'[name].[chunkhash:5].js'
	},
	devtool:'source-map',
	devServer:{
		contentBase:'/src',
		historyApiFallback:false,
		hot:false,
		inline:true,
		port:PORT,
		host:'127.0.0.1'
	},
	plugins:[
		new htmlWebpackPlugin({
			template:path.join(__dirname,'/src/index.html')
		}),
		//new extractTextPlugin('style.css'),
		// new cleanWebpackPlugin(
		// 	['dist/*.js',"dist/*.js.map","dist/*.css","dist/*.css.map"],
		// 	{
		// 		root:__dirname,
		// 		verbose:true,
		// 		dry:false
		// 	}
		// ),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV':JSON.stringify('dev'),
			IS_DEVELOPMENT:true
		}),
		new openBrowser({
			url:`http://localhost:${PORT}`
		})
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
			// {
			// 	test : /(\.scss|\.css)$/,
			// 	use : extractTextPlugin.extract({
			// 		fallback:'style-loader',
			// 		use : [
			// 			{
			// 				loader : 'css-loader',
			// 				options : {
			// 					modules : true,
			// 					localIdentName: '[name]__[local]--[hash:base64:5]'
			// 				}
			// 			},
			// 			{
			// 				loader: 'sass-loader'
			// 			}
			// 		]
			// 	})
			// },
			// {
			// 	test : /(\.png|\.jpeg|\.jpg|\.gif)$/,
			// 	use : {
			// 		loader : 'image-loader',
			// 		options : {
			// 			limit:8192
			// 		}
			// 	}
			// }
		]
	},
	// externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
}
module.exports = config;