import path from 'path'

import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import inject from '@rollup/plugin-inject'

import pkgInfo from './package.json'

export default {
	input: 'src/index.js',
	external: ['buffer', 'inherits', 'stream', 'string_decoder', 'vm'],
	output: [
		{
			file: pkgInfo['main'],
			format: 'cjs',
		},
		{
			file: pkgInfo['module'],
			format: 'esm',
		}
	],
	plugins: [
		resolve({
			mainFields: ['module', 'jsnext', 'browser', 'main'],
			preferBuiltins: false,
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.browser': JSON.stringify(true),
		}),
		inject({
			'global': path.resolve(__dirname, './src/global.js'),
		})
	]
}