// Create debug bar
const body = document.querySelector('body');

//body.innerHTML = body.innerHTML + 
//``;

console.log(body);

const sections = document.querySelectorAll('section');
const rows = document.querySelectorAll('#row');
const columns = document.querySelectorAll('div[data-column-size]');

// Pages menu
const pagesDrawer = document.querySelector(".dbg-pages-container");
const pagesBtn = document.querySelector(".dbg-btn");
// Call the function
//section.addEventListener("click", functionName);


//do stuff for each section
sections.forEach(function (section, index) {
  section.style.border = "1px solid #000";
  createDebugMenu(section);
  // Change the headers to include the classlist 
  let section_h1 = section.querySelector('h1');
  //section_h1.innerText = section.classList;

  //Toggle blue outlines for columns on this.hover
  rows.forEach(function (row, index) {

    row.addEventListener("mouseover", () => {
      event.target.style.outline = "1px solid blue";
      // basic printing of the classes
    });

    row.addEventListener("mouseleave", () => {
        row.style = "";
    });

    //Toggle green outlines for columns on this.hover
    columns.forEach(function (column, index) {

      column.addEventListener("mouseenter", () => {
        event.target.style.outline = "1px solid green";
        // basic printing of the classes
        //console.log(`${index} - index ${column.classList}`)

        // Get classname based on prefix
        let colName = column.className.split( ' ').some(c => /col-.*/.test(c));
        
        //console.log(colName);
        if ( column.className.split(' ').some(c => /col-.*/.test(c)) ) {
          //console.log("has class");
        } else {
          //console.log("doesnt");
        }
      });

      column.addEventListener("mouseleave", () => {
          column.style = "";
      });

    });
  }); 
});


// DEBUG BAR ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Toggle pages drawer on click
pagesBtn.addEventListener("click", () => {
  pagesDrawer.classList.toggle("debug-menu-active");
});

// Create hover menus

function createDebugMenu(sectionName, index) {
  //console.log(rowName);
  sectionName.innerHTML = sectionName.innerHTML + 
  `<div id="section-dbg-menu" class="dbg-each-menu">
  
      <div class="dbg-main-btns">
  
      <i class="fas fa-arrows-alt"></i>
      <span class="this-section-name">{{ .global.Scratch.Get "section_template_name" | humanize }}</span>
      <a class="prepend-me part-edit" title="Open the Page Editor for this Part" href="https://app.forestry.io/sites/site_id/#/pages/content-{{ $.Scratch.Get "part_preview_link" }}"><i class="fas fa-external-link-alt"></i></a>
  
      <i class="fas fa-pen-square"></i>
  
      </div>
  <div class="dbg-style-menu">
  <ul class="dbg-style-sub-parent dbg-style-padding">
  <span class="dbg-style-sub-parent">Padding <i class="fas fa-caret-down"></i></span>
      <ul class="dbg-style-padding-top">
          <li class="dbg-list-sub-title dbg-style-padding-top-title">Top: </li>   
          <ul class="dbg-style-padding-bottom">
              <li class="dbg-list-sub-title dbg-style-padding-bottom-title">Bottom: </li> 
          </ul>
      </ul>
  </ul>
  <ul class="dbg-style-sub-parent dbg-style-background">
      <span class="dbg-style-sub-parent">Background...</i></span>
  </ul>
  <ul class="dbg-style-sub-parent dbg-style-section-height">
      <span class="dbg-style-sub-parent">Height <i class="fas fa-caret-down"></i></span>
      <ul class="dbg-style-section-height-options">
          
      </ul>
  </ul>
  </div><!--dbg-style-menu-->
  </div><!--dbg-each-menu-->`;
}
