# Single page Boilerplate

Because building a single-page static html page should be as complicated as possible. 

Actually, because there is a set of modern tools which make building web pages much faster, and there's no reason to waste time putting those tools together again each time. 

## Instructions

1. Fork this repository (or just clone it)
2. `npm install` (you've got gulp globally instaelled already, right?)
3. start hacking. 


## Stuff this does

The high-level view is this: The gulp file gathers assets and packages everything into a neat single-folder heirarchy which can be deployed basically anywhere. 

1. Copies images to the build folder
2. compiles Sass SCSS files, inserts a minified copy into the html file
3. runs a local webserver and enables auto-refresh on save with livereload
