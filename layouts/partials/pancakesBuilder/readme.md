## Readme dev guidelines

This theme component contains both the builder layout (the html, css, js that goes into building the content of a **page**) and the **app** files (the html, css, js that goes into creating the drag and drop editor).

## Folder Structure - Path and naming convention

### App
The drag/drop editor html, scss, js path will always look like this: `pancakesBuilder/app/`. They are conditionally included based on the environment. **Nothing App related is compiled in production.**

Each component that is added should have an associated partial HTML file, SCSS, or JS file. Then, combine these using Hugo Pipes. 

#### HTML:
1. Add HTML here partials/pancakesBuilder/app/yourpartial.html
2. Include in the template using `{{ partial "pancakesBuilder/app/yourpartial.html" . }}`

#### JS:
1. Add JS here: assets/pancakesBuilder/app/js
2. Create a resource in partials/app/scripts.html
3. Modify the slice to include the additional script

#### SCSS:
1. Add partial SCSS file in assets/pancakesBuilder/app/SCSS
2. For non-component styles, add to /global.
3. Import new SCSS in scss/builder.scss

### Page
The path for the html, scss, js for the page will look like this: `pancakesBuilder/`. These are included in both production and staging.

Use the same approach as above with a different path. 