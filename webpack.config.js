const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'production',

	entry: {
		common: './src/js/common.js'
	},

	output: {
		path: path.resolve(__dirname, './dist/js'),
		filename: '[name].js'
	},
	resolve: {
		alias: {
			'jquery.easing': path.join(__dirname, 'src/js/lib/jquery.easing'),
			'jquery.inview': path.join(__dirname, 'src/js/lib/jquery.inview.min'),
			'jquery.color': path.join(__dirname, 'src/js/lib/jquery.color'),
			// 'swiper': path.join(__dirname, 'src/js/lib/swiper.min'),
			// 'slick': path.join(__dirname, 'src/js/lib/slick'),
			'pjax-api': path.join(__dirname, 'src/js/lib/pjax-api'),
			// 'images-compare': path.join(__dirname, 'src/js/lib/jquery.images-compare'),
			'animation': path.join(__dirname, 'src/js/lib/animsition')
		}
	},
	performance: { hints: false },

	plugins: [
    /* 
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    */
   new UglifyJSPlugin({
			uglifyOptions: {
				output: {
					comments: /^\**!|@preserve|@license|@cc_on/
				},
			},
			sourceMap: true
		})

  ],

	devtool: 'source-map'
};


