Fusion Interactive Template
===========================
A template for new interactive projects.

Why use this?
- Support for downloading text from Google Docs, compiling it through ArchieML and injecting it into your project
- Includes Mustache templating engine to merge documents into valid markup
- Includes a static server for testing your project
- Rebuild your code base automatically when changes are detected with Watchify
- Compiles all code with Browserify and concatenates into one file
- Automatically reversions static assets
- Includes BrowserSync to make testing on multiple devices easy
- Supports SASS, Compass and source maps
- Automatically compress images

Setup
-----
1. Install Node, NPM and Ruby if not already available
2. `git clone git@github.com:fusioneng/interactive-template.git`
3. Run `bundle` to install Ruby dependencies
4. Run `npm install` to install Node dependencies
5. HTML goes in `src/htdocs`, JS in `src/js` and SASS in `src/sass`

The preview URL, publish URL and post ID should be entered in package.json.

Text Fetcher
------------
1. Put the Google Doc ID into `package.json` under the key name `document`
2. Share the Google Doc with text-fetcher@fusion-static.iam.gserviceaccount.com
3. Download the [Fusion key file][key-file] and put it inside a folder named `key` in the project directory
4. Use Mustache syntax to determine where your text snippets belong
5. `gulp text` will download and merge the Google document with your template

Develop
-------
To start a static server, cd to the project directory and run:

	gulp

Build
-----
To compile the project for distribution:

	gulp dist

This will version all static assets and minimise all the code. Output will be built into the directory `dist`.

Publish
-------
To publish to interactive.fusion.net run this in the project root:

	gulp publish

You will need a valid key for Google Cloud Storage.

[key-file]: https://drive.google.com/a/fusion.net/file/d/0B-o9W3rDNbkoT3BxQ0RST1BwS2s/view?usp=sharing