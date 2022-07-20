# Assets
- [Requirements](#requirements)
- [Installation Guide](#installation)
- [Adding assets](#adding-assets)
- [Compiling assets...](#adding-assets)
- [...Gulp tasks in PhpStorm](#gulp-tasks-in-phpstorm)
- [...Gulp tasks CLI](#gulp-tasks-with-cli)
- [Fabricator](#fabricator)
- [NodeJS, NPM & N](#nodejs-npm--n)
- [Troubleshooting](#troubleshooting)
- [Contribution](#contribution)

## Requirements
Node version: 16.5.0

NPM version: 6.14.14

=> Manage your NodeJS versions with "[n](https://www.npmjs.com/package/n)"

Please keep this library up-to-date with the latest NodeJS-LTS version.

## Installation
In the same directory where the package.json resides:
```bash
$ npm install
```

## Adding assets
Put your source files in the corresponding folder in the <b>./src</b> directory. The processed files will go to <b>./dist</b>

```plain
└── src
    ├── es6       // your es6*
    ├── img       // your images
    ├── js        // your javascript*
    ├── libs      // static files, fonts and third party libraries to be copied/processed to the ./dist/libs folder
    ├── sass      // your sass
    ├── sprite    // contains a template for the svg-sprite generator 
    └── svg       // ...guess what, it's for your svg files

* Both are processed with webpack, the difference is:
  JS:  All files in ./src/js and its subfolders (glob ./src/js/**/*) 
       will be processed and copied individually to the dist folder 
  ES6: Only top level files in ./src/es6 (glob ./src/es6/*) will be 
       copied to the dist folder.
```

The processed assets will go to:

```plain
└── dist
    ├── es6       // transpiled es6
    ├── img       // minified images
    ├── js        // transpiled javascript
    ├── libs      // anything else you wanted copied from ./src/libs
    ├── sass      // compiled css
    └── svg       // minified svg and the generated svg-sprite
```

<b>IMPORTANT: Manually added files in the ./dist folder will be deleted when 
running gulp tasks!</b>

Put static files, downloaded resources, fonts etc. in the ./src/libs folder, 
this directory will be copied as is to ./dist/libs. If you would like to 
process these files (minify, concat, etc.), you will have to implement these 
tasks yourself. See gulpfile.js for examples. Best case scenario: you don't use
the libs directory and import libraries from node_module or CDN

## Compiling assets
### Gulp tasks in PhpStorm
In PhpStorm right-click on the gulpfile.js and select "Show Gulp Tasks". A 
new panel will open and list all the available gulp tasks. You can run any task 
by double clicking on it.

    - clean-dist: deletes the content of the ./dist directory
    - default: watch changes in the ./src directory and process accordingly (launches Fabricator)
    - minify-images: copies compressed versions of images from ./src/img to ./dist/img
    - minify-svgs: copies compressed versions of svgs from ./src/svg to ./dist/svg
    - svg-sprite: creates a sprite.svg in ./dist/svg from all the svg in the ./src/svg directory
    - watch: watch changes in the ./src directory and process accordingly (same as default but without Fabricator)

<b>IMPORTANT:</b> If you have several node_modules directories with different 
Gulp versions loading the Gulp tasks may fail. See [troubleshooting](#troubleshooting)

### Gulp tasks with CLI
All tasks can be run on the CLI. Examples:
```bash
$ gulp // default gulp task
$ gulp clean-dist
$ gulp watch
$ gulp minify-images
$ gulp <gulp_tasks or function_defined_in_gulpfile> (--dev)
```

By default all files are minified. If you don't want this, append <b>--dev</b> to the command:
```bash
$ gulp watch --dev
```

The <b>--dev</b> option will additionally generate .map files

## Fabricator
Fabricator is well documented at https://fbrctr.github.io/
Note: The paths for the source and distribution files have been reconfigured to work outside the ./fabricator directory

### Quickstart:
1. Create a html file with some code in ./fabricator/materials/components
2. run the Gulp default task (```$ gulp```), fabricator app will open in browser
3. You will find your created html in the menu "Components"

##### Things you may, should or must do:
- You can document your snippets with front-matters (yaml similar syntax) directly in its file
- You may change the directory structure in ./fabricator/materials and ./fabricator/views to fit your needs 
- Fabricator will automatically reflect your directory/file structure in the sidebar navigation
- You can order the items in the menu by prefixing your files with number (001-snippet.html or 1.02-snippet). Fabricator will remove the prefix in the output
- You can change the design of fabricator itself
- Fabricator can render for-loops and such, define your data with Yaml in ./fabricator/data

## NODEJS, NPM & N
```bash
$ npm -g install n
```
Once n is installed you can switch you NodeJS version
```bash
$ n
```
Select the desired version with the arrow keys and press enter.

Install different NodeJS version with:
```bash
$ n 14.17.4
```

## Troubleshooting
#### Gulp CLI works, but PhpStorm can not show tasks: 
This may happen when PhpStorm finds several node_modules folders with Gulp required. PhpStorm will re-use the gulp package from a previous npm install. To fix this:  
1. In the PhpStorm Gulp-Panel, context-click on the gulpfile.js that fails and select "Gulp settings..."
2. Set the path to the Gulp package from the node_module directory that corresponds to the package.json file.
3. Click the reload button in the Gulp-Panel

#### Error: Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime (57)
```bash
$ npm rebuild node-sass
```

#### Gulp-Imagemin Error: spawn /[some-local-path]/node_modules/mozjpeg/vendor/cjpeg ENOENT
See https://github.com/sindresorhus/gulp-imagemin/issues/338

Sometimes npm fails to install vendor libraries from modules. Delete and reinstall node_modules
```bash
$ rm -r node_modules
$ npm install
```


## Future improvement considerations
- Changes in js or es6 will trigger translation of both js and es6. We could separate this for better performance
- Move Assets to it's own repo
- Fabricator should be optional
- Replace Fabricator with a LTS-supported system

## Contribution
Any one who has access to this repo is encouraged to help improving this toolkit. You can add new functionality, fix bugs and push without consent. 
Just think about the consequences when altering existing configs, behaviors and Gulp tasks. Don't break existing functionality OR use GIT Tags (version number x.x.x)

