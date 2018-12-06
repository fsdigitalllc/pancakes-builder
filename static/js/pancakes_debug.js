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

// The object tree needs to be in seperate function
// iterate through each section, row, column, element
// compare the object tree classes to the existing classes
// if the class exists (is active), add the text to the text area.
function pancakes() {

//const sectionHTML = document.querySelector('.debugging-bar').innerHTML;
const sections = document.querySelectorAll('section');


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
    }
  }
  const columnClasses = {
    size: {
      "12": "col-12",
      "11": "col-11",
      "10": "col-10",
      "9": "col-9",
      "8": "col-8",
      "7": "col-7",
      "6": "col-6",
      "5": "col-5",
      "4": "col-4",
      "3": "col-3",
      "2": "col-2",
      "1": "col-1"
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
    }
  }
  const elementClasses = {
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
    }
  }

formSections(sectionClasses);

//do stuff for each section
function formSections(sectionClasses) {

console.log("Object Section Classes:");
console.log(sectionClasses);

let formattedParams = "stacks:\n";
let indentParams = "";

sections.forEach(function (section, index) {

// Create the edit button for a section
let selectedTitle = section.getAttribute('data-template');
let selectedItem = section;
let selectedType = section.getAttribute('selected-type');


createEditMenu(selectedItem, selectedTitle, selectedType, sectionClasses);

//needs to only apply to this section
//defineClasses(selectedItem, selectedTitle);


// - template: block-builder-section-home1
//   background_color: "#ffffff"
//   background_image: 
//   size: container
//   p_top_val: 200px
//   p_top: XL
//   p_bottom: XL
//   v_content: center
//   row_space: M
//   rows:
//   - template: include-row
section.setAttribute('data-highlightable','1');

//formattedParams += `- template: ${selectedTitle}\n`;
formattedParams += `- template: ${selectedTitle}\n`;
//formattedParams += `  background_color: "${selectedType}"\n`;
indentParams = "  ";

selectedClasses = sectionClasses;

for (const par in selectedClasses) {

  for (const pat in selectedClasses[par]) {
    //console.log("pat: " + selectedClasses[par][pat]);
    if ( section.classList.contains(selectedClasses[par][pat]) ) {
      formattedParams += `${indentParams}${par}: ${pat}\n`;
    } 
  }
}

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
  formattedParams += `${indentParams}rows:\n`;
  
  rows.forEach(function (row, index) {
  formattedParams += `  - template: include-row\n`;
  indentParams = "    ";
  // formattedParams += `${indentParams}h_content: end\n`;
  // formattedParams += `${indentParams}v_content: center\n`;

  selectedClasses = rowClasses;

  for (const par in selectedClasses) {

    for (const pat in selectedClasses[par]) {
      //console.log("pat: " + selectedClasses[par][pat]);
      if ( row.classList.contains(selectedClasses[par][pat]) ) {
        formattedParams += `${indentParams}${par}: ${pat}\n`;
      } 
    }
  }
    //console.log(row);
    // Create the edit button for a row
    let selectedTitle = row.getAttribute('selected-type');
    let selectedItem = row;
    let selectedType = row.getAttribute('selected-type');

    createEditMenu(selectedItem, selectedTitle, selectedType);

    const columns = row.querySelectorAll('div[data-column-size]');
    row.setAttribute('data-highlightable','1');

    // cols:
    // - template: block-column-builder
    //Toggle green outlines for columns on this.hover
    
    formattedParams += `${indentParams}cols:\n`;

    columns.forEach(function (column, index) {

      indentParams = "    ";
      formattedParams += `${indentParams}- template: block-column-builder\n`;
      indentParams = "      ";
      // formattedParams += `${indentParams}size: '4'\n`;

      selectedClasses = columnClasses;

      for (const par in selectedClasses) {

        for (const pat in selectedClasses[par]) {
          //console.log("pat: " + selectedClasses[par][pat]);
          if ( column.classList.contains(selectedClasses[par][pat]) ) {
            formattedParams += `${indentParams}${par}: ${pat}\n`;
          } 
        }
      }
      // Create the edit button for a row
      let selectedTitle = column.getAttribute('selected-type');
      let selectedItem = column;
      let selectedType = column.getAttribute('selected-type');

      createEditMenu(selectedItem, selectedTitle, selectedType);

      column.setAttribute('data-highlightable','1');

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

      const elements = column.querySelectorAll('.elements-wrapper');

      formattedParams += `${indentParams}elements:\n`;
      elements.forEach(function (element, index) {
        element.setAttribute('data-highlightable','1');
        formattedParams += `${indentParams}- template: element-title\n`;
        indentParams = "        ";
        // formattedParams += `${indentParams}tag: h1\n`;
        // formattedParams += `${indentParams}title: Totally New Module\n`;
        //console.log(element);

        selectedClasses = elementClasses;

        for (const par in selectedClasses) {

          for (const pat in selectedClasses[par]) {
            //console.log("pat: " + selectedClasses[par][pat]);
            if ( element.classList.contains(selectedClasses[par][pat]) ) {
              formattedParams += `${indentParams}${par}: ${pat}\n`;
            } 
          }
        }
        
      });

    });
    exportYML.addEventListener("click", () => {
      console.log("start export");
      createExportYml(formattedParams);
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

function defineClasses(selectedItem, selectedTitle, selectedType, sectionClasses, index) {

  console.log("SELECTED TYPE: " + selectedType);

  

let selectedClasses = "";

if ( selectedType == "section" ) {
  selectedClasses = sectionClasses;
} else if ( selectedType == "row" ) {
  selectedClasses = rowClasses;
} else if ( selectedType == "column" ) {
  selectedClasses = columnClasses;
}

console.log("selected classes:");
console.log(selectedItem);

let debugBarMenuTitle = document.querySelector(".debugging-bar .toggle_class_list .debugBarMenuTitle");
let debugBarSubMenu = document.querySelector(".debugging-bar .toggle_class_list > ul");

//console.log(debugBarMenuTitle);


debugBarSubMenu.innerHTML = "";
debugBarMenuTitle.innerText = "";

debugBarMenuTitle.innerText = selectedType;

  for (const par in selectedClasses) {
    // `prop` contains the name of each property, i.e. `'code'` or `'items'`
    // consequently, `data[prop]` refers to the value of each property, i.e.
    // either `42` or the array
    debugBarSubMenu.innerHTML += `<li data="${par}"><strong>${par}</strong> </li>`;

    for (const pat in selectedClasses[par]) {
      //console.log("pat: " + selectedClasses[par][pat]);
      if ( selectedItem.classList.contains(selectedClasses[par][pat]) ) {
        debugBarSubMenu.innerHTML += `<li data-parent="${par}" data="${selectedClasses[par][pat]}" class="active">${pat}</li>`;
      } else {
        debugBarSubMenu.innerHTML += `<li data-parent="${par}" data="${selectedClasses[par][pat]}">${pat}</li>`;
      }
    }
  }
  
    let dataVals = debugBarSubMenu.querySelectorAll("li[data]");
      
    //console.log(selectedClasses);
    
    dataVals.forEach(function (dataVal, index) {
      
      let dataValAttr = dataVal.getAttribute("data");
      let pParent = dataVal.getAttribute("data-parent");
      //console.log("parent:" + pParent);

      dataVal.addEventListener("click", (e) => {
          let pVal = e.currentTarget.getAttribute("data");
          
          let thisDataParent = e.currentTarget.getAttribute("data-parent");

            for (const pat in selectedClasses[pParent]) {
              //
              if ( selectedClasses[pParent][pat] === pVal ) {
                //console.log("true");
                
              } else {
                //console.log("false");
                selectedItem.classList.remove(selectedClasses[pParent][pat]);
              }
            }
          
          //remove previously selected class
          selectedItem.classList.remove(pVal);
          
          //add newly selected class to section
          selectedItem.classList.add(pVal);

          let dataVs = debugBarSubMenu.querySelectorAll("li[data]");
          let thDt = debugBarSubMenu.querySelectorAll("li[data-parent*='" + pParent + "']");

          thDt.forEach(function (thDts, index) {
              if ( thDts.classList.contains("active") ) {
                thDts.classList.remove("active");
              }
              dataVal.classList.add("active");
          });
          
            //in the menu, show which class is active
          dataVal.classList.add("active");

          // for the selected menu item parent name, remove any other active classes.

          // if( pParent == aParents ){
          //   let activePvals = pParent.querySelector("li[data].active");
          //   activePvals.classList.remove('active');
          // }
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
      defineClasses(selectedItem, selectedTitle, selectedType, sectionClasses);
    });
}

function createExportYml(formattedParams, index) {
  let exportBox = document.querySelector(".exportYMLbox");
  exportBox.innerText = formattedParams;
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