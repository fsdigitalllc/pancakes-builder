//ADD draggable
//https://github.com/Shopify/draggable

const body = document.querySelector('body');
const sectionHTML = document.querySelector('.debugging-bar').innerHTML;
//body.innerHTML = body.innerHTML + 
//``;

const sections = document.querySelectorAll('section');
const rows = document.querySelectorAll('#row');
const columns = document.querySelectorAll('div[data-column-size]');
const elements = document.querySelectorAll('.elements-wrapper');

body.classList.add("inspect-mode");
document.querySelector('div[data-column-size]').setAttribute('data-highlightable','1');

// DEBUG BAR ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const previewBtn = document.querySelector('.enable-debug');
const exportYML = document.querySelector('.export-yml');

// Pages menu
const pagesDrawer = document.querySelector(".dbg-pages-container");
const pagesBtn = document.querySelector(".dbg-btn");
// Call the function
//section.addEventListener("click", functionName);

// Toggle pages drawer on click
pagesBtn.addEventListener("click", () => {
  pagesDrawer.classList.toggle("debug-menu-active");
});

// Toggle inspect mode/preview mode on click
previewBtn.addEventListener("click", () => {
  body.classList.toggle("inspect-mode");
});



// INSPECT MODE
/////////////////////////////////////////////////////////////
if ( body.classList.contains("inspect-mode") ) {
//do stuff for each section
sections.forEach(function (section, index) {
  //console.log(section);
  section.setAttribute('data-highlightable','1');

  //localStorage.setItem("section", JSON.stringify(section) );

  section.addEventListener("mouseenter", () => {
    createDebugMenu(section);
  });

  section.addEventListener("mouseleave", () => {
    destroyDebugMenu(section);
  });

  section.addEventListener("click", () => {
    sectionClick(section);
  });

  
  // Change the headers to include the classlist 
  let section_h1 = section.querySelector('h1');
  let sectionTitle = section.getAttribute('data-section-name');
  console.log(sectionTitle);

  section_h1.innerText = sectionTitle;
  //section_h1.innerText = section.classList;

  //Toggle blue outlines for columns on this.hover
  // This takes a snapshot of the HTML before the JS is loaded
  localStorage.setItem('html', body.innerHTML);
  // Export YML on click
  exportYML.addEventListener("click", () => {
    body.innerHTML = localStorage.getItem('html');
    AOS.init();
  });
  rows.forEach(function (row, index) {

    row.setAttribute('data-highlightable','1');

    row.addEventListener("mouseover", () => {
      event.target.style.outline = "1px solid blue";
      // basic printing of the classes
    });

    row.addEventListener("mouseleave", () => {
        row.style = "";
    });

    //Toggle green outlines for columns on this.hover
    columns.forEach(function (column, index) {

      column.setAttribute('data-highlightable','1');

      const columnAttributes = {
        size: column.getAttribute('data-column-size')
      }

      // window.localStorage.setItem('columnAttributes', JSON.stringify(columnAttributes))

      // console.log("COL SIZE:" + columnAttributes.size);

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

      elements.forEach(function (element, index) {
        element.setAttribute('data-highlightable','1');
      });

    });
  }); 
});


function sectionClick(sectionName, index) {
  if ( document.querySelector('section.active') !== null ) {
    document.querySelector('section.active').classList.remove('active');
  }
  sectionName.classList.toggle("active");
}

let debugWidget = `<div id="section-dbg-menu" class="dbg-each-menu">
  
<div class="dbg-main-btns">

<i class="fas fa-arrows-alt"></i>
<span class="this-section-name"></span>
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

// Create hover menus
function createDebugMenu(sectionName, index) {
  //console.log(rowName);
  debugWidget = debugWidget; 
  sectionName.innerHTML = sectionName.innerHTML + debugWidget;
}
function destroyDebugMenu(sectionName, index) {
  //console.log(rowName);
  sectionName.innerHTML = sectionName.innerHTML;
}

} // End if body class contains inspect mode