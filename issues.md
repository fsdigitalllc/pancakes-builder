## build --minify issues

In the page YAML, if the key/value "- template: element-html" is used, the build fails.
**Fix**: Do not include "html" in value name.

## hugo server issues
In some cases, when saving html partials that have css, the page css doesn't reload properly. You'll notice that all content is shifted to one side.
**Fix** TBD. save base.html or re-serve site