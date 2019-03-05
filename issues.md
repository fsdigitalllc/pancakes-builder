## build --minify issues

In the page YAML, if the key/value "- template: element-html" is used, the build fails.
**Fix**: Do not include "html" in value name.

## hugo server issues
In some cases, when saving html partials that have css, the page css doesn't reload properly. You'll notice that all content is shifted to one side.
**Fix** TBD. save base.html or re-serve site

## image SRC Resource Object
If an image is referenced in the front matter, but the file doesn't exist, the site won't build
**Fix** use iffileexists to check before creating resource object

## Custom CSS
when adding custom css, it must be inserted as a string. It's not possible to just use safeCSS or safeHTML, it must be a string.

## Images in element-code
When adding an image src to custom html blocks, there needs to be a way to define the correct directory.
* content/uploads only works after the site is built because it references the public directory, which is not rebuilt on hugo server
* static/uploads reference works when using hugo server, but the workflow isn't ideal since it's another directory we have to consider

## adding images to static folder
When adding an image to the static folder, hugo throws an error related to lookup order. Have to force rebuild for it to work.
*Fix* IDK