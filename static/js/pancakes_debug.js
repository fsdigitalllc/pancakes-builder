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

const sectionSupportedValues = {
  padding: {
    xxl: "padding-xxl",
    xl: "padding-xl",
    l: "padding-l",
    m: "padding-m",
    s: "padding-s",
    xs: "padding-xs",
    xxs: "padding-xxs"
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
const params = sectionSupportedValues;
//console.log(params);

exportYML.addEventListener("click", () => {
  console.log("start export");
  createExportYml(params);
});

//issue is that the variable is for each section, not just this section
function getSectionClasses () {
  console.log("getSectionClasses ----- setting classes...");
  console.log("FIRST paddingtop: " + paddingTop);
  if ( section.classList.contains("padding-xxl-top") ) {
    paddingTop = sectionSupportedValues.padding.xxl + "-top";
  } else if ( section.classList.contains("padding-xl-top") ) {
    paddingTop = "padding-xl-top";
  } else if ( section.classList.contains("padding-l-top") ) {
    paddingTop = "padding-l-top";
  } else if ( section.classList.contains("padding-m-top") ) {
    paddingTop = "padding-m-top";
  } else if ( section.classList.contains("padding-s-top") ) {
    paddingTop = "padding-s-top";
  } else if ( section.classList.contains("padding-xs-top") ) {
    paddingTop = "padding-xs-top";
  } else if ( section.classList.contains("padding-xxs-top") ) {
    //paddingTop = section.className.match(/padding-.*-top/);
    paddingTop = "padding-xxs-top";
  } 
  
  // if ( section.className.match(/padding-.*-bottom/) ) {
  //   paddingBottom = section.className.match(/padding-.*-bottom/);
  // }
  console.log("second paddingTop: " + paddingTop);
}

const sectionClasses = {
  paddingTop: paddingTop,
  paddingBottom: paddingBottom
}

console.log("constTop: " + paddingTop);
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
let debugPaddingEdit = debugMenu.querySelector("span.dbg-style-sub-parent");
let debugMenuName = debugMenu.querySelector(".this-section-name");

//Sticky menu on click or hover
// check event bubbling on this
section.addEventListener("click", (e) => {
  const activeDbgMenu = document.querySelector('#section-dbg-menu.sticky');

  if(activeDbgMenu){
    activeDbgMenu.classList.remove('sticky');
  }
  //e.target or e.currentTarget
  section.querySelector("#section-dbg-menu").classList.add("sticky");
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
debugMenuEdit.addEventListener("click", (e) => {
  debugMenu.querySelector(".dbg-style-menu").classList.toggle("active");
  changeAttr();
});
debugPaddingEdit.addEventListener("click", () => {
  debugMenu.querySelector(".dbg-style-padding").classList.toggle("active");
  changeAttr();
});


//Get each debug menu attribute
//Compare each debug menu variable to existing classes
//if equal, mark active
function changeAttr () {
  let dataVals = debugMenu.querySelectorAll(".dbg-style-menu li[data]");

  dataVals.forEach(function (dataVal, index) {
    
    let dataValAttr = dataVal.getAttribute("data");
    if (dataValAttr == paddingTop) {
      dataVal.classList.add("active");
      //console.log("active");
    }
    //console.log(dataValAttr);
    //console.log("data vals " + dataVals);
    console.log("this paddingtop ---- " + sectionClasses.paddingTop);
    dataVal.addEventListener("click", (e) => {
        let pVal = e.currentTarget.getAttribute("data");
  
        section.classList.remove(paddingTop);
  
        paddingTop = pVal;
        section.classList.add(pVal);

        let activepVal = debugMenu.querySelector(".dbg-style-menu li[data].active")

        if(activepVal){
          activepVal.classList.remove('active');
        }
        //dataVal.classList.remove("active");
        e.currentTarget.classList.add("active");
        //console.log("pval" + pVal);
        getSectionClasses();
    });
  
  });
}

  
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
  <li data="padding-xxl-top">XXL</li>  
  <li data="padding-xl-top">XL</li>  
  <li data="padding-l-top">L</li>  
  <li data="padding-m-top">M</li>
  <li data="padding-s-top">S</li>
  <li data="padding-xs-top">XS</li>
  <li data="padding-xxs-top">XXS</li>
  <li data="padding-none-top">None</li>
</ul>      
<ul class="dbg-style-padding-bottom">
  <li class="dbg-list-sub-title dbg-style-padding-bottom-title">Bottom: </li>
  <li data="padding-xxl-top">XXL</li>  
  <li data="padding-xl-bottom">XL</li>  
  <li data="padding-l-bottom">L</li>  
  <li data="padding-m-bottom">M</li>
  <li data="padding-s-bottom">S</li>
  <li data="padding-xs-bottom">XS</li>
  <li data="padding-xxs-bottom">XXS</li>
  <li data="padding-none-bottom">None</li>  
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