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

const sectionHTML = document.querySelector('.debugging-bar').innerHTML;
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
exportYML.addEventListener("click", () => {
  console.log("start export");
});



// INSPECT MODE
/////////////////////////////////////////////////////////////
if ( body.classList.contains("inspect-mode") ) {
formSections();

//do stuff for each section
function formSections() {

sections.forEach(function (section, index) {

let sectionTitle = section.getAttribute('data-section-name');

//Set the starting classes for the section, which we will change later

let paddingTop = "padding-none-top";
let paddingBottom = "padding-none-bottom";

//If a padding class exists run the functon to set the padding object
if ( section.className.match(/padding-.*/) ) {
  getSectionClasses();
}

//issue is that the variable is for each section, not just this section
function getSectionClasses () {
  console.log("setting classes...");
  if ( section.className.match(/padding-.*-top/) ) {
    paddingTop = section.className.match(/padding-.*-top/);
  } 
  
  if ( section.className.match(/padding-.*-bottom/) ) {
    paddingBottom = section.className.match(/padding-.*-bottom/);
  }
  console.log("paddingTop: " + paddingTop);
}

const sectionClasses = {
  paddingTop: paddingTop,
  paddingBottom: paddingBottom
}

console.log("constTop: " + sectionClasses.paddingTop);
//console.log("paddingBottom: " + sectionClasses.paddingBottom);

//Create the debug menu
createDebugMenu(section, sectionTitle);


section.setAttribute('data-highlightable','1');

// redefine rows to current scope
rows = section.querySelectorAll('#row');

// rows.forEach(function (row, index) {
//   row.setAttribute('data-highlightable','1');
// });

let allDebugMenus = section.querySelectorAll("#section-dbg-menu");
let debugMenu = section.querySelector("#section-dbg-menu");
let debugMenuEdit = debugMenu.querySelector(".fa-pen-square");
let debugPaddingEdit = debugMenu.querySelector(".dbg-style-padding");
let debugMenuName = debugMenu.querySelector(".this-section-name");

//Sticky menu on click or hover
section.addEventListener("click", (e) => {
  const activeDbgMenu = document.querySelector('#section-dbg-menu.sticky');

  if(activeDbgMenu){
    activeDbgMenu.classList.remove('sticky');
  }
  e.currentTarget.querySelector("#section-dbg-menu").classList.add("sticky");
});

section.addEventListener("mouseenter", (e) => {
  debugMenu.classList.toggle("active");
    //menu.style.display = "block";
});

section.addEventListener("mouseleave", (e) => {
  debugMenu.classList.toggle("active");
    //menu.style.display = "block";
});
  

//localStorage.setItem("section", JSON.stringify(section) );

//Debug editor handlers
debugMenuEdit.addEventListener("click", () => {
  debugMenu.querySelector(".dbg-style-menu").classList.toggle("active");
});
debugPaddingEdit.addEventListener("click", () => {
  debugMenu.querySelector(".dbg-style-padding > ul").classList.toggle("active");
});


let dataVals = debugMenu.querySelectorAll(".dbg-style-padding-top li[data]");

dataVals.forEach(function (dataVal, index) {

  dataVal.addEventListener("click", (e) => {
      let pVal = e.currentTarget.getAttribute("data");

      //section.classList.remove(paddingTop);

      //paddingTop = pVal;
      section.classList.add(pVal);
      console.log("pval" + pVal);
      getSectionClasses();
  });

});


  
  // Change the headers to include the classlist
  
  //console.log(sectionTitle);
  //section_h1.innerText = sectionTitle;
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
    const columns = row.querySelectorAll('div[data-column-size]');
    row.setAttribute('data-highlightable','1');

    row.addEventListener("mouseover", () => {
      row.style.outline = "1px solid blue";
      // basic printing of the classes
    });

    row.addEventListener("mouseleave", () => {
        row.style = "";
    });

  if ( row.className.match(/padding-.*/) ) {
    setRowClasses();
  }
  
  function setRowClasses () {
    // if ( row.className.match(/padding-.*-top/) ) {
    //   paddingTop = row.className.match(/padding-.*-top/);
    // } 
    
    // if ( row.className.match(/padding-.*-bottom/) ) {
    //   paddingBottom = row.className.match(/padding-.*-bottom/);
    // }
  }
  
  // const rowClasses = {
  //   paddingTop: paddingTop,
  //   paddingBottom: paddingBottom
  // }
  
  //console.log("paddingTop: " + rowClasses.paddingTop);
  //console.log("paddingBottom: " + rowClasses.paddingBottom);
  

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
}


function sectionClick(sectionName, index) {
  if ( document.querySelector('section.active') !== null ) {
    document.querySelector('section.active').classList.remove('active');
  }
  sectionName.classList.toggle("active");
}

// Create hover menus
function createDebugMenu(sectionName, sectionTitle, index) {
  //console.log(sectionTitle);
  let debugWidget = `<div id="section-dbg-menu" class="dbg-each-menu">
  
<div class="dbg-main-btns">

<i class="fas fa-arrows-alt"></i>
<span class="this-section-name">${sectionTitle}</span>
<a class="prepend-me part-edit" title="Open the Page Editor for this Part" href="https://app.forestry.io/sites/site_id/#/pages/content-{{ $.Scratch.Get "part_preview_link" }}"><i class="fas fa-external-link-alt"></i></a>

<i class="fas fa-pen-square"></i>

</div>
<div class="dbg-style-menu">
<ul class="dbg-style-sub-parent dbg-style-padding">
<span class="dbg-style-sub-parent">Padding <i class="fas fa-caret-down"></i></span>
<ul class="dbg-style-padding-top">
    <li class="dbg-list-sub-title dbg-style-padding-top-title">Top: </li>
    <li data="padding-l-top">L</li>  
    <li data="padding-m-top">M</li> 
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

  sectionName.innerHTML = sectionName.innerHTML + debugWidget;
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