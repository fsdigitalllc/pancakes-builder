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
The path for the html, scss, js for the page will look like this: `pancakesBuilder/`. These are included in both production and staging. Use the same approach as above with a different path. 

### Toggle actions
Open sidedrawer:
aria-controls="drawer2"

Open modal small:
aria-controls="modal1"

open modal large:
aria-controls="modal2"

### Generator
Generator is broken down into partial files for each section, row, column, element. all.html is the primary file which is included in the layout. This file generates either css or html depending on the scratch value set before the included partial.

In every partial, $scratch variable is declared based on the current context. The context is different based on the nested level of the file.

1. Get scratch given the current context: `{{ $scratch := $.Scratch.Get }}`

We then get a scratch value with `{{ $scratch "name" }}`

In a nested file that uses (dict), the var might look like this: `{{ $scratch := .global.Scratch.Get }}` or `{{ $scratch := .global.global.Scratch.Get }}`.

For nested partials, pass the global and current level context with dict: `{{ partial "partial/path/file.html" (dict "page" . "global" $) }}`. Now we reference global context with somethingn like `{{ .global.Site.Data.data_file_name }}` instead of `{{ $.Site.Data.data_file_name }}`. We reference the current page context with `.page.template` instead of `.template`. If we need to go "up" one level of context, we can still use `$` for page context. However, global context requires `.global`.

### Scratch names
{{ $scratch "name" }}:
* env - Get current environment state:
- staging - localHost, Forestry preview.
- production - netlify

* generatorType - get the mode that the generator is in (css, html, etc)
- gen_pagehtml - output sections, rows, cols, elements based on page front matter. This is the generated page html. **active in production**.
- gen_criticalcss - output CSS defined as critical (usually if the current section loop has an index of < 2). **active in production**.
- gen_menu_buttons - generate the buttons for the draggable items in the editor drawer. **Not active in production.**.
- gen_menu_content - generate all the supported HTML that can be inserted using the builder. This is based on front matter from a data file. **Not active in production**.
- gen_noncriticalcss - generate site-wide styles based on the theme stylesheet and user-defined styles that are in the section loop $index > 2. **active in production**.


### Constructors 

```
constructor
function Human(firstName, lastName) {
	this.firstName = firstName,
	this.lastName = lastName,
	this.fullName = function() {
		return this.firstName + " " + this.lastName;
	}
}

var person1 = new Human("Virat", "Kohli");

console.log(person1)
```

```
someValues.forEach((element, index) => {
    console.log(`Current index: ${index}`);
    console.log(element);
});
```