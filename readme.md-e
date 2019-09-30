![Pancakes Builder](./static/images/pb_logo_banner.jpg "Pancakes Builder")

## LEGACY - Pancakes Builder
A theme component for Hugo that allows you to visually build optimized landing pages. Pancakes builder works along side your existing Hugo theme.

**PB isn't a HTML generator**. Instead of generating static HTML, front-matter is generated, which references micro components. In other words, pages are built entirely with front-matter and PB generates this for you. As a result, the developer is able to achieve similar functionality to a Wordpress website (querying posts) without needing a database. Additionally, critical/non-critical CSS is [automatically generated](https://blog.fullstackdigital.com/how-to-automatically-generate-and-inline-critical-css-with-hugo-pipes-48c52c2d8f82) based on the styles in use across the site.

## Features (alpha release):
* Image optimization: lazy loading, image processing for responsive images and thumbnails (using Hugo processing or Cloudinary)
* CSS Optimization: automatically inlines critical CSS in the head of your page and then conditionally generates the non-critical stylesheet based on used components
* Navigate between pages: easily browse between pages and sections on your site
* Mobile-preview and development: Quickly view the mobile versions of your page without opening Dev Tools and specify mobile styling and positioning
* Contact forms: build contact forms (powered by Netlify) visually

## Development Roadmap
PB is finally nearing alpha!

For updates on development progress:

* Follow me on [Twitter](https://twitter.com/BenBozzay)
* Subscribe to the early access [email list](https://upscri.be/15ee91/)


## Getting Started
You can preview the current development version:

1. Clone (or add as a submodule) the repository to your Hugo themes folder
2. Modify the active theme in your config.toml to `theme = ["pancakes-builder"]`
3. Alternatively, add it as a theme component 
4. Use `layout: pancakes` in your page YML to activate the builder for that specific page.

### About the developer
[Ben Bozzay](https://bbozzay.com) is the lead front-end developer at [Fullstack Digital](https://fullstackdigital.com). Pancakes Builder was originally created to simplify landing page development for fullstackdigital.com.


# Known issues

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
