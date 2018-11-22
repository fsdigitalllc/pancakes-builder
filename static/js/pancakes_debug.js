//ADD draggable
//https://github.com/Shopify/draggable
const body = document.querySelector('body');
//start aos on load
window.addEventListener("load", (e) => {
  AOS.init();
  // Enable inspect mode by default
  body.classList.add("inspect-mode");
  pancakes();
});

function pancakes() {

//const sectionHTML = document.querySelector('.debugging-bar').innerHTML;
const sections = document.querySelectorAll('section');
const elements = document.querySelectorAll('.elements-wrapper');

let rows = document.querySelectorAll('#row');
//console.log(rows);

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
formSections();

//do stuff for each section
function formSections() {

sections.forEach(function (section, index) {

// Create the edit button for a section
let selectedTitle = section.getAttribute('selected-name');
let selectedItem = section;
let selectedType = section.getAttribute('selected-type');

createEditMenu(selectedItem, selectedTitle, selectedType);

//needs to only apply to this section
//defineClasses(selectedItem, selectedTitle);



exportYML.addEventListener("click", () => {
  console.log("start export");
  createExportYml(params);
});

section.setAttribute('data-highlightable','1');

// redefine rows to current scope
rows = section.querySelectorAll('#row');

//Sticky menu on click or hover
// check event bubbling on this
let dbgSelectedTitle = document.querySelector(".debugging-bar .toggle_class_list > li");

section.addEventListener("click", (e) => {
  let activeSection = document.querySelector('section.sticky');

  if(activeSection){
    activeSection.classList.remove('sticky');
  }
  //e.target or e.currentTarget
  section.classList.add("sticky");
  
  dbgSelectedTitle.innerHTML = `<li>${selectedTitle}</li>`;

});
  

  //localStorage.setItem("section", JSON.stringify(section) );
  //section_h1.innerText = selectedTitle;
  //section_h1.innerText = section.classList;
  //Toggle blue outlines for columns on this.hover
  // This takes a snapshot of the HTML before the JS is loaded
  localStorage.setItem('html', body.innerHTML);
  //Export YML on click
  // exportYML.addEventListener("click", () => {
  //   body.innerHTML = localStorage.getItem('html');
  //   AOS.init();
  // });

  rows.forEach(function (row, index) {
    //console.log(row);
    // Create the edit button for a row
    let selectedTitle = row.getAttribute('selected-type');
    let selectedItem = row;
    let selectedType = row.getAttribute('selected-type');

    createEditMenu(selectedItem, selectedTitle, selectedType);

    const columns = row.querySelectorAll('div[data-column-size]');
    row.setAttribute('data-highlightable','1');

    //Toggle green outlines for columns on this.hover
    columns.forEach(function (column, index) {

      // Create the edit button for a row
      let selectedTitle = column.getAttribute('selected-type');
      let selectedItem = column;
      let selectedType = column.getAttribute('selected-type');

      createEditMenu(selectedItem, selectedTitle, selectedType);

      column.setAttribute('data-highlightable','1');

      // column.addEventListener("click", (e) => {
      //   let activeColumn = document.querySelector('section.sticky');
      
      //   if(activeColumn){
      //     activeColumn.classList.remove('sticky');
      //   }
      //   //e.target or e.currentTarget
      //   column.classList.add("sticky");
      // });

      const columnAttributes = {
        size: column.getAttribute('data-column-size')
      }

      // window.localStorage.setItem('columnAttributes', JSON.stringify(columnAttributes))

      // console.log("COL SIZE:" + columnAttributes.size);

      column.addEventListener("mouseenter", () => {
        event.target.style.outline = "1px solid green";
        column.classList.add("active");
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
}


// function sectionClick(sectionName, index) {
//   if ( document.querySelector('section.active') !== null ) {
//     document.querySelector('section.active').classList.remove('active');
//   }
//   sectionName.classList.toggle("active");
// }

// Object to store all classes
// Use generic param names equal to the item specific values. So params depend on if a section, row, or column is selected. Then, based on what the value equals, a different constant is used.

function defineClasses(selectedItem, selectedTitle, selectedType, index) {

  console.log("SELECTED TYPE: " + selectedType);

  const sectionClasses = {
    padding_top: {
      xxl: "padding-xxl-top",
      xl: "padding-xl-top",
      l: "padding-l-top",
      m: "padding-m-top",
      s: "padding-s-top",
      xs: "padding-xs-top",
      xxs: "padding-xxs-top"
    },
    padding_bottom: {
      xxl: "padding-xxl-bottom",
      xl: "padding-xl-bottom",
      l: "padding-l-bottom",
      m: "padding-m-bottom",
      s: "padding-s-bottom",
      xs: "padding-xs-bottom",
      xxs: "padding-xxs-bottom"
    },
    margin_top: {
      xxl: "margin-xxl-top",
      xl: "margin-xl-top",
      l: "margin-l-top",
      m: "margin-m-top",
      s: "margin-s-top",
      xs: "margin-xs-top",
      xxs: "margin-xxs-top"
    },
    margin_bottom: {
      xxl: "margin-xxl-bottom",
      xl: "margin-xl-bottom",
      l: "margin-l-bottom",
      m: "margin-m-bottom",
      s: "margin-s-bottom",
      xs: "margin-xs-bottom",
      xxs: "margin-xxs-bottom"
    },
    margin_bottom: {
      xxl: "margin-xxl-bottom",
      xl: "margin-xl-bottom",
      l: "margin-l-bottom",
      m: "margin-m-bottom",
      s: "margin-s-bottom",
      xs: "margin-xs-bottom",
      xxs: "margin-xxs-bottom"
    },
    h_content: {
      start: "h_c_start",
      center: "h_c_center",
      end: "h_c_end",
      space_between: "h_c_space-between",
      space_around: "h_c_space-around"
    },
    v_content: {
      start: "v_c_start",
      center: "v_c_center",
      end: "v_c_end",
      space_between: "v_c_space-between",
      space_around: "v_c_space-around"
    },
    maxwidth: {
      xxl: "maxwidth-xxl",
      xl: "maxwidth-xl",
      l: "maxwidth-l",
      m: "maxwidth-m",
      s: "maxwidth-s",
      xs: "maxwidth-xs",
      xxs: "maxwidth-xxs"
    }
  }
  const rowClasses = {
    container: {
      fullwidth: "Full",
      container: "container",
      container_large: "Large"
    }
  }
  const columnClasses = {
    maxwidth: {
      xxl: "maxwidth-xxl",
      xl: "maxwidth-xl",
      l: "maxwidth-l",
      m: "maxwidth-m",
      s: "maxwidth-s",
      xs: "maxwidth-xs",
      xxs: "maxwidth-xxs"
    },
    size: {
      "col-12": "12",
      "col-8": "8",
      "col-6": "6",
      "col-4": "4",
      "col-2": "2"
    }
  }
  //const params = Object.values(selectedClasses);
  //console.log(params[0]);

let selectedClasses = "";

if ( selectedType == "section" ) {
  selectedClasses = sectionClasses;
} else if ( selectedType == "row" ) {
  selectedClasses = rowClasses;
} else if ( selectedType == "column" ) {
  selectedClasses = columnClasses;
}

console.log(selectedClasses);

let debugBarMenuTitle = document.querySelector(".debugging-bar .toggle_class_list .debugBarMenuTitle");
let debugBarSubMenu = document.querySelector(".debugging-bar .toggle_class_list > ul");

console.log(debugBarMenuTitle);

debugBarSubMenu.innerHTML = "";

debugBarMenuTitle.innerText = selectedType;

  for (const par in selectedClasses) {
    // `prop` contains the name of each property, i.e. `'code'` or `'items'`
    // consequently, `data[prop]` refers to the value of each property, i.e.
    // either `42` or the array
    debugBarSubMenu.innerHTML += `<li data="${par}"><strong>${par}:</strong> </li>`;

    for (const pat in selectedClasses[par]) {
      //console.log("pat: " + selectedClasses[par][pat]);
      debugBarSubMenu.innerHTML += `<li data-parent="${par}" data="${selectedClasses[par][pat]}">${par}: ${pat}</li>`;
    }
  }
    let dataVals = debugBarSubMenu.querySelectorAll("li[data]");
      
    //console.log(selectedClasses);
    
    dataVals.forEach(function (dataVal, index) {
      
      let dataValAttr = dataVal.getAttribute("data");

      dataVal.addEventListener("click", (e) => {
          let pVal = e.currentTarget.getAttribute("data");
          let pParent = e.currentTarget.getAttribute("data-parent");
          let aParents = dataVal.getAttribute("data-parent");
  
          let listItems = e.target.parentNode;
          //console.log(listItems.classList);
  
          // listItems.forEach(function (listItem, index) {
          //   console.log(listItem.getAttribute("data"));
          // });
          //for (const par in selectedClasses) {
            // `prop` contains the name of each property, i.e. `'code'` or `'items'`
            // consequently, `data[prop]` refers to the value of each property, i.e.
            // either `42` or the array
            //paramHtml += `<li data="${par}"><strong>${par}:</strong> </li>`;
            for (const pat in selectedClasses[pParent]) {
              //console.log("patttttttttt: " + selectedClasses[pParent][pat]);
              //paramHtml += `<li data="${selectedClasses[par][pat]}">${pat}: </li>`;
              if ( selectedClasses[pParent][pat] === pVal ) {
                console.log("true");
                
              } else {
                console.log("false");
                selectedItem.classList.remove(selectedClasses[pParent][pat]);
              }
            }
          //}
  
          //console.log("parent " + selectedClasses[pParent]);
          
          //remove previously selected class
          selectedItem.classList.remove(pVal);
          
          //add newly selected class to section
          selectedItem.classList.add(pVal);

          //in the menu, show which class is active
          e.currentTarget.classList.add("active");

          // for the selected menu item parent name, remove any other active classes.

          if( pParent == aParents ){
            let activePvals = pParent.querySelector("li[data].active");
            activePvals.classList.remove('active');
          }
          //dataVal.classList.remove("active");
          
          //console.log("pval" + pVal);
          //getselectedClasses();
      });
    
    });
 
  }
  
// Create hover menus
function createEditMenu(selectedItem, selectedTitle, selectedType, index) {

  console.log("create hover menus type: " + selectedType);
  
  let debugWidget = `<div id="section-dbg-menu" class="dbg-each-menu">
  
<div class="dbg-main-btns">

<i class="fas fa-arrows-alt"></i>
<span class="this-selected-name">${selectedTitle}</span>
<a class="prepend-me part-edit" title="Open the Page Editor for this Part" href="https://app.forestry.io/sites/site_id/#/pages/content-{{ $.Scratch.Get "part_preview_link" }}"><i class="fas fa-external-link-alt"></i></a>
<i class="fas fa-pen-square"></i>
</div>
</div><!--dbg-each-menu-->`;

selectedItem.innerHTML = selectedItem.innerHTML + debugWidget;

selectedItem.addEventListener("mouseenter", (e) => {
  //selectedItem.querySelector("#section-dbg-menu").classList.add("active");

  selectedItem.classList.toggle("hovered");
    //menu.style.display = "block";
});

selectedItem.addEventListener("mouseleave", (e) => {
  selectedItem.classList.toggle("hovered");
    //menu.style.display = "block";
});
  // let columns = section.querySelectorAll(".column");

  // let columnHtml;

  // columns.forEach(function (column, index) {
  //   columnHtml = column.innerHTML;
  //   columnHtml.innerHTML = column.innerHTML += debugWidget;
  // });
  

  //Debug editor handlers

  let debugMenuEditBtn = selectedItem.querySelector("#section-dbg-menu .fa-pen-square");
  
    debugMenuEditBtn.addEventListener("click", (e) => {
      //Get each debug menu attribute
    //Compare each debug menu variable to existing classes
    //if equal, mark active
      defineClasses(selectedItem, selectedTitle, selectedType);
    });
}

function createExportYml(params, index) {
  let exportBox = `
  <textarea class="exportYMLbox">//iterate through params
  section:
    row:
        - Column:
  ${params.padding}
  </textarea>`;
  body.innerHTML = body.innerHTML + exportBox;
}
} // End if body class contains inspect mode


// const swappable = new Draggable.Swappable(
// 	document.querySelectorAll('section'), {
// 		draggable: '.button',
// 		delay: 0,
// 	}
// )
// swappable.on('drag:start', () => {
// 	console.log('drag:start')
// })
// swappable.on('swappable:swapped', () => {
// 	console.log('drag:swapped')
// })
// swappable.on('drag:stop', () => {
// 	console.log('drag:stop')
// })
// swappable.on('drag:move', () => {
// 	console.log('drag:move')
// })

// const sortable = new Draggable.Sortable(
// 	document.querySelectorAll('section'), {
// 		draggable: '.col-6',
// 		delay: 0,
// 	}
// )
// sortable.on('drag:start', () => {
// 	console.log('drag:start')
// })
// sortable.on('drag:stop', () => {
  
// })
}