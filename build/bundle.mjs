/* 
NOTE: This build script is intended for an app with a single html file.
It will not preserve the directory structure of dist and will likely 
produce broken output with multiple pages. For multi-page apps 
consider using an esbuild plugin. 
*/

import * as esbuild from 'esbuild'
import * as fs from 'node:fs'

const HTML_SRC = './src/static/index.html'
const HTML_DIST = './dist/index.html'
const CSS_SRC = './src/static/styles.css'
const APP_SRC = './src/app/app.ts'

//copy html
fs.copyFile(HTML_SRC, HTML_DIST, (err) => {
	if (err) {
		throw new Error(err)
	}
})

//bundle js and css
let config = {
	entryPoints: [APP_SRC, CSS_SRC],
	entryNames: 'entry-[name]-[hash]',
	chunkNames: 'chunk-[name]-[hash]',
	bundle: true,
	target: ['chrome114'],
	splitting: true,
	minify: true,
	outdir: 'dist',
	format: 'esm',
	metafile: true,
	logLevel: 'info',
}

if (process.env.NODE_ENV == 'development') {
	config.sourcemap = 'inline'
}

const result = await esbuild.build(config)

//insert css and js entry points into html
const script = getEntryFileName('.js', result)
const styles = getEntryFileName('.css', result)
insertHtml(
	HTML_DIST,
	'</head>',
	`<script type="module" async="true" src="${script}"></script>\n<link rel="stylesheet" href="${styles}">`
)

function getEntryFileName(extension, buildResult) {
	return Object.keys(buildResult.metafile.outputs)
		.filter(
			(output) => output.includes('entry') && output.includes(extension)
		)[0]
		.split('/')[1]
}

function insertHtml(htmlPath, insertBeforeTag, html) {
	fs.readFile(htmlPath, 'utf8', (err, data) => {
		if (err) {
			throw new Error(err)
		}
		const modifiedData = data.replace(
			insertBeforeTag,
			`${html}\n ${insertBeforeTag}`
		)
		fs.writeFile(htmlPath, modifiedData, 'utf8', (err) => {
			if (err) {
				throw new Error(err)
			}
		})
	})
}
