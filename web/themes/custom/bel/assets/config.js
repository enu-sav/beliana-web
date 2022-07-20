module.exports = (argv) => {
	return {
		/**
		 * Development/Production mode switch
		 */
		dev: argv.dev ? true : false,

		/**
		 * Destination directory for processed files
		 * @type {String}
		 */
		dest: 'dist',

		/**
		 * Favicon.ico source and destination
		 * @type {*}
		 */
		favicon: {
			src: 'src/favicon.ico',
			dest: 'dist',
		},

		/**
		 * SASS compilation
		 * @type {*}
		 */
		styles: {

			/**
			 * Browser support
			 * @type {Array}
			 */
			browsers: [
				'ie 11',
				'edge >= 16',
				'chrome >= 70',
				'firefox >= 63',
				'safari >= 11',
				'iOS >= 12',
				'ChromeAndroid >= 70',
			],

			/**
			 * Sass files directories
			 * @type {*}
			 */
			sass: {
				src: 'src/sass/**/*.{scss,sass}',
				dest: 'dist/css',
				watch: 'src/sass/**/*.{scss,sass}',
			},

			/**
			 * Fabricator styles
			 * @type {*}
			 */
			fabricator: {
				src: 'fabricator/assets/fabricator/styles/fabricator.scss',
				dest: 'dist/fabricator/styles',
				watch: 'fabricator/assets/fabricator/styles/**/*.scss',
			},

		},

		scripts: {

			/**
			 * Javascript source, destination, watch
			 * @type {*}
			 */
			js: {
				src: './src/js/**/*.js',
				dest: 'dist/js',
				watch: 'src/js/**/*.js',
			},

			/**
			 * ES6 source, destination, watch
			 * @type {*}
			 */
			es6: {
				src: './src/es6/**/*.js',
				dest: 'dist/es6',
				watch: 'src/es6/**/*.js',
			},

			/**
			 * Fabricator script source, destination, watch
			 * @type {*}
			 */
			fabricator: {
				src: './fabricator/assets/fabricator/scripts/fabricator.js',
				dest: 'dist/assets/fabricator/scripts',
				watch: 'fabricator/assets/fabricator/scripts/**/*',
			},
		},

		/**
		 * Libraries script source, destination, watch
		 * @type {*}
		 */
		libs: {
			src: 'src/libs/**/*',
			dest: 'dist/libs',
			watch: 'src/libs/**/*',
		},

		/**
		 * Images source, destination, watch
		 * @type {*}
		 */
		images: {
			src: 'src/img/**/*.{png,jpg,gif}',
			dest: 'dist/img',
			watch: 'src/img/**/*.{png,jpg,gif}',
		},

		/**
		 * SVGs source, destination, watch
		 * @type {*}
		 */
		svgs: {
			src: 'src/svg/**/*.svg',
			tpl: 'src/sprite/template.svg',
			dest: 'dist/svg',
			watch: 'src/svg/**/*.svg',
		},

		/**
		 * Pattern lib templates source, destination, watch
		 * @type {*}
		 */
		templates: {
			watch: 'fabricator/**/*.{html,md,json,yml}',
		},

		/**
		 * General Fabricator & BrowserSync config
		 * @type {*}
		 */
		assembler: {

			/**
			 * ID (filename) of default layout
			 * @type {String}
			 */
			layout: 'default',

			/**
			 * Layout templates
			 * @type {(String|Array)}
			 */
			layouts: ['fabricator/views/layouts/*'],

			/**
			 * Layout includes (partials)
			 * @type {String}
			 */
			layoutIncludes: ['fabricator/views/layouts/includes/*'],

			/**
			 * Pages to be inserted into a layout
			 * @type {(String|Array)}
			 */
			views: ['fabricator/views/**/*', '!fabricator/views/+(layouts)/**'],

			/**
			 * Materials - snippets turned into partials
			 * @type {(String|Array)}
			 */
			materials: ['fabricator/materials/**/*'],

			/**
			 * JSON or YAML data models that are piped into views
			 * @type {(String|Array)}
			 */
			data: ['fabricator/data/**/*.{json,yml}'],

			/**
			 * Data to be merged into context
			 * @type {(Object)}
			 */
			buildData: {},

			/**
			 * Markdown files containing toolkit-wide documentation
			 * @type {(String|Array)}
			 */
			docs: ['fabricator/docs/**/*.md'],

			/**
			 * Keywords used to access items in views
			 * @type {Object}
			 */
			keys: {
				materials: 'materials',
				views: 'views',
				docs: 'docs'
			},

			/**
			 * Location to write files
			 * @type {String}
			 */
			dest: 'dist',

			/**
			 * Extension to output files as
			 * @type {String}
			 */
			extension: '.html',

			/**
			 * Custom dest map
			 * @type {Object}
			 */
			destMap: {},

			/**
			 * beautifier options
			 * @type {Object}
			 */
			beautifier: {
				indent_size: 1,
				indent_char: '	',
				indent_with_tabs: true
			},

			/**
			 * Function to call when an error occurs
			 * @type {Function}
			 */
			onError: null,

			/**
			 * Whether or not to log errors to console
			 * @type {Boolean}
			 */
			logErrors: argv.dev ? true : false,

			/**
			 * Overrides default when a value is given
			 * @type {String}
			 */
			baseUrl: '',
		}
	}
};
