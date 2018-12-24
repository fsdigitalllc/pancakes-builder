const body = document.querySelector('body');


const _ = (el) => {
  return document.querySelector(el);
};

//Short local storage
const db = localStorage;
let mainP = document.querySelector('main');

//start aos on load
window.addEventListener("load", (e) => {
  let pageId = window.location;

  let savedData = `${pageId}.savedData`;
  
  
  AOS.init();
  if (typeof db.getItem(savedData) !== 'undefined' && db.getItem(savedData) !== null && db.getItem(savedData) !== "") {
    mainP.innerHTML = db.getItem(savedData);
    //makeEditable();
    //console.log(db.getItem(savedData));
    pancakes(pageId);
  } else {
    //console.log("loading pancakes..." + pageId);
    pancakes(pageId);
  };
  // Enable inspect mode by default
  body.classList.add("inspect-mode");
  
  
});

// The object tree needs to be in seperate function
// iterate through each section, row, column, element
// compare the object tree classes to the existing classes
// if the class exists (is active), add the text to the text area.

function pancakes(pageId) {
  console.log("loading pancakes..." + pageId);
  const previewBtn = document.querySelector('.enable-debug');
  const exportYML = document.querySelector('.export-yml');
  const mediaUploadButton = document.querySelector(".imageUpload");
  // Pages menu
  const pagesDrawer = document.querySelector(".dbg-pages-container");
  const pagesBtn = document.querySelector(".dbg-btn");
  const mediaBox = document.querySelector(".mediaUploads");
  let savedData = `${pageId}.savedData`;
  
  //https://codepen.io/nakome/pen/qRWqBe -- copy elements
  const makeEditable = () => {
    let elements = document.querySelectorAll('.drop-element');
    let toArr = Array.prototype.slice.call(elements);
    Array.prototype.forEach.call(toArr, (obj, index) => {
      if (obj.querySelector('img')) {
        return false;
      } else {
        obj.addEventListener('click', (e) => {
          e.preventDefault();
          obj.children[0].setAttribute('contenteditable', '');
          obj.focus();
        });
        obj.children[0].addEventListener('blur', (e) => {
          e.preventDefault();
          obj.children[0].removeAttribute('contenteditable');
        });
      }
    });
  };
  
  let saveChangesButton = document.querySelector(".saveChanges");
  let revertChangesButton = document.querySelector(".revertChanges");
  let clearChangesButton = document.querySelector(".clearChanges");
  

  // Detect any changes and prompt the user to save
  function onChange() {
    console.log("something changed...");
  
  }
  
  saveChangesButton.addEventListener("click", () => {
    db.setItem(savedData, mainP.innerHTML);
  });
  revertChangesButton.addEventListener("click", () => {
    revertChanges();
  });
  clearChangesButton.addEventListener("click", () => {
    undo();
  });
  
  /**
   * save in local storage
   */
  function revertChanges() {
    if (typeof db.getItem(savedData) !== 'undefined' && db.getItem(savedData) !== 'undefined' && db.getItem(savedData) !== 'null' && db.getItem(savedData) != null && db.getItem(savedData) !== "") {
      mainP.innerHTML = db.getItem(savedData);
      //makeEditable();
      sanitizeItems();
    };
  }
  function undo() {
    if (typeof db.getItem(savedData) !== 'undefined' && db.getItem(savedData) !== 'undefined' && db.getItem(savedData) !== 'null' && db.getItem(savedData) != null) {
      db.setItem(savedData, "");
  
      // Delete dbg menus first
      sanitizeItems();
    };
  }
  function initOverlays() {
    
  }
  // INSPECT MODE
  /////////////////////////////////////////////////////////////
  //if ( body.classList.contains("inspect-mode") ) {
  
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
  const tpl = {
    'header1': '<h1>I am header 111</h1>',
    'header2': '<h2>I am header 2</h2>',
    'header3': '<h3>I am header 3</h3>',
    'header4': '<h4>I am header 4</h4>',
    'shortparagraph': '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et</p>',
    'mediumparagraph': '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate</p>',
    'largeparagraph': '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,</p>',
    'ullist': '<ul><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ul>',
    'ollist': '<ol><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ol>',
    'image': '<img src="http://lorempixel.com/400/200/">',
    'code': '<pre>function say(name){\n return name;\n}</pre>',
    'column': '<div class="column col-2"><div class="elements-wrapper"></div></div>'
  };
  
    mediaUploadButton.addEventListener("click", () => {
    mediaBox.classList.toggle("active");
    mediaUploadButton.classList.toggle("active");
  });

  sanitizeItems();
  
  
  function sanitizeItems() {
  
  //Clean out some generated elements before regenerating them
  document.querySelectorAll(".dbg-each-menu").forEach(e => e.parentNode.removeChild(e));

  let debugBarMenuTitle = document.querySelector(".debugging-bar .toggle_class_list .debugBarMenuTitle");
  let debugBarSubMenu = document.querySelector(".debugging-bar .toggle_class_list > ul");
  
  let debugBarElementMenu = document.querySelector(".debugging-bar .dragSourceList");
  let debugBarElementTitle = document.querySelector(".debugging-bar .dragSourceList i");
  //console.log(debugBarElementMenu);

  debugBarMenuTitle.addEventListener("click", () => {
    debugBarMenuTitle.classList.toggle("active");
    //console.log("debugbarmenutitle");
  });
  debugBarElementTitle.addEventListener("click", () => {
    debugBarElementTitle.classList.toggle("active");
    debugBarElementMenu.classList.toggle("active");
    //console.log("debugBarElementMenu");
  });


  
  let sections = document.querySelectorAll('section');
  // DEBUG BAR ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
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
  
    formSections(sectionClasses);
  
    //do stuff for each section
    function formSections(sectionClasses) {
  
    //console.log("Object Section Classes:");
    //console.log(sectionClasses);
  
    sections.forEach(function (section, index) {
  
    // Create the edit button for a section
    let selectedTitle = section.getAttribute('template');
    let selectedItem = section;
    let selectedType = section.getAttribute('selected-type');
  
    createEditMenu(selectedItem, selectedTitle, selectedType, sectionClasses);

    //defineClasses(selectedItem, selectedTitle);
    section.setAttribute('data-highlightable','1');

    //dragIt(section);
  
    // redefine rows to current scope
    let rows = section.querySelectorAll('#row');
  
    //Sticky menu on click or hover
    // check event bubbling on this
    let dbgSelectedTitle = document.querySelector(".debugging-bar .toggle_class_list > li");
  
    section.addEventListener("click", (e) => {
      let activeSection = document.querySelector('section.sticky');
  
      // if(activeSection){
      //   activeSection.classList.remove('sticky');
      // }
      // //e.target or e.currentTarget
      // section.classList.add("sticky");
      
      dbgSelectedTitle.innerHTML = `<li>${selectedTitle}</li>`;
  
    });
      
      rows.forEach(function (row, index) {
  
        //console.log(row);
        // Create the edit button for a row
        let selectedTitle = row.getAttribute('template');
        let selectedItem = row;
        let selectedType = row.getAttribute('selected-type');
  
        createEditMenu(selectedItem, selectedTitle, selectedType);
  
        let columns = row.querySelectorAll('div[size]');
        row.setAttribute('data-highlightable','1');

        columns.forEach(function (column, index) {
          
          //https://codepen.io/nakome/pen/qRWqBe -- editor/copy elements
          //https://codepen.io/ariona/pen/vgeoQx navbar builder
          //https://codepen.io/nakome/pen/ZLPYpy editor  
  
          // Create the edit button for a row
          let selectedTitle = column.getAttribute('size');
          let selectedItem = column;
          let selectedType = column.getAttribute('selected-type');
  
          createEditMenu(selectedItem, selectedTitle, selectedType);
  
          column.setAttribute('data-highlightable','1');
  
          column.addEventListener("mouseenter", () => {
            event.target.style.outline = "1px solid green";
            column.classList.add("active");
  
            // Get classname based on prefix
            let colName = column.className.split( ' ').some(c => /col-.*/.test(c));
  
            if ( column.className.split(' ').some(c => /col-.*/.test(c)) ) {
              //console.log("has class");
            } else {
              //console.log("doesnt");
            }
          });
          column.addEventListener("mouseleave", () => {
              column.style = "";
          });
          let elements = column.querySelectorAll('.elements-wrapper');
          elements.forEach(function (element, index) {
            element.setAttribute('data-highlightable','1');
          });
  
        });
        
  
      }); 
    });
    }

  function defineClasses(selectedItem, selectedTitle, selectedType, sectionClasses, index) {
  
  let selectedClasses = "";
  
  if ( selectedType == "section" ) {
    selectedClasses = sectionClasses;
  } else if ( selectedType == "row" ) {
    selectedClasses = rowClasses;
  } else if ( selectedType == "column" ) {
    selectedClasses = columnClasses;
  }
    
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

        });
  
        
  
      });
   
    }

    
  // Create hover menus
  function createEditMenu(selectedItem, selectedTitle, selectedType, index) {
  
    //console.log("create hover menus type: " + selectedType);
    
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
  
    //Debug editor handlers
  
    let debugMenuEditBtn = selectedItem.querySelector("#section-dbg-menu .fa-pen-square");
    
      debugMenuEditBtn.addEventListener("click", (e) => {
        //Get each debug menu attribute
      //Compare each debug menu variable to existing classes
      //if equal, mark active
      document.querySelector(".debugging-bar .toggle_class_list").classList.toggle("active");
        defineClasses(selectedItem, selectedTitle, selectedType, sectionClasses);
      });
  }
  
  let exportBox = document.querySelector(".exportYMLbox");
  
  exportYML.addEventListener("click", () => {
    console.log("start export");
    createExportYml();
    exportYML.classList.toggle("active");
    exportBox.classList.toggle("active");
  });
  }
  

  ////////////////////////Drag and drop functionality////////////////
  /**Gets the tpl.
   * @param      {<type>}  element  The element
   * @return     {string}  The tpl.
   */
  const getTpl = (element) => {
    return tpl[element];
  };
  function makeElement(elementContent){
    console.log(elementContent);
    var newNode = document.createElement("div");
    newNode.innerHTML = elementContent;
    console.log(newNode);
    //newNode.classList.add("elem");
    return newNode;
  }
  dragula([document.querySelector("main")], {
    moves: function (el, container, handle) {
    return handle.classList.contains('fa-arrows-alt');
  },
    invalid(el, handle) {
      // If the selected element className is column, 
      //    dont allow the row to be dragged. This will allow 
      //    the column to be dragged separate from the row. 
      return (el.classList.contains("row") || el.classList.contains("column") );
    }
  });

  // add existing sections as an array
  let containers = [].slice.call(document.querySelectorAll("section"));
  
  dragula(containers, {
    moves: function (el, container, handle) {
    return handle.classList.contains('fa-arrows-alt');
  },
    invalid(el, handle) {
      // If the selected element className is column, 
      //    dont allow the row to be dragged. This will allow 
      //    the column to be dragged separate from the row. 
      return (el.classList.contains("column") || el.classList.contains("element") );
    }
  });

  // el = column;
  containers = [].slice.call(document.querySelectorAll(".row"));

  dragula(containers, {
    moves: function (el, container, handle) {
    return handle.classList.contains('fa-arrows-alt');
  },
    direction: 'horizontal',
    invalid(el, handle) {
      // If the selected element className is column, 
      //    dont allow the row to be dragged. This will allow 
      //    the column to be dragged separate from the row. 
      return (el.classList.contains("element") );
    }
  });
  // // What I learned
  // // Return runs the function if a condition is met, like the param matching a certain value
  // // need another dragula instance for dragging elements between columns
  // // refer to this codepen for fixing the undefined issue on reordering in the same container
  // //console.log(containers);
  //let containerSource = document.querySelector(".debugging-bar .dragSourceList ul");
  let dragMenu = document.querySelector(".debugging-bar .dragSourceList .dragMenu ul.elementsDrag");
  
  containers = Array.prototype.slice.call(document.querySelectorAll("section .row .column .elements-wrapper")).concat(dragMenu);
  
  //console.log(containers);
  const elementDrake = dragula({
    containers,
    direction: 'vertical',
    revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
    removeOnSpill: false,              // spilling will `.remove` the element, if this is true
    ignoreInputTextSelection: true,
    copy(el, source) {
      return source === dragMenu;
    },
    accepts(el, target, source) {
      // if (el.getAttribute('data-title') == "column") {
      //   console.log("a column is selected");
      //   return target !== debugBarElementMenu;
      // }
      if (target.classList.contains("elements-wrapper")) {
        return target !== dragMenu;
      }
      
    },
  });
  elementDrake.on('out', function (el, container) {
    if (container.classList.contains("elements-wrapper") && el.getAttribute('data-tpl') ) {
      el.innerHTML = getTpl(el.getAttribute('data-tpl'));
      //el.className = 'drop-element';
      //makeEditable();
    }
    if (container == dragMenu) {
      el.innerHTML = el.getAttribute('data-title');
    }
    //sanitizeItems();
    
  });

  let rowDragMenu = document.querySelector(".debugging-bar .dragSourceList .dragMenu ul.rowsDrag");
  containers = Array.prototype.slice.call(document.querySelectorAll(".row")).concat(rowDragMenu);
  console.log(containers);

  const rowDrake = dragula({
    containers,
    direction: 'horizontal',
    revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
    removeOnSpill: false,              // spilling will `.remove` the element, if this is true
    ignoreInputTextSelection: true,
    moves(el, source) {
      console.log("el");
      console.log(el);
      return source === rowDragMenu;
    },
    copy(el, source) {
      return source === rowDragMenu;
    },
    accepts(el, target, source) {
      // if (el.getAttribute('data-title') == "column") {
      //   console.log("a column is selected");
      //   return target !== debugBarElementMenu;
      // }
      if (target.classList.contains("row")) {
        return target !== rowDragMenu;
      }
    },
    invalid(el, handle) {
      // If the selected element className is column, 
      //    dont allow the row to be dragged. This will allow 
      //    the column to be dragged separate from the row. 
      return (el.classList.contains("elements-wrapper") );
    }
  });
  rowDrake.on('out', function (el, container) {
    if (container.classList.contains("row") && el.getAttribute('data-tpl') ) {
      console.log("dropped1");
      console.log(el);
      //el.innerHTML = getTpl(el.getAttribute('data-tpl'));
      if (el.querySelector(".element-content")) {
        console.log("dropped2");
        console.log(el.querySelector(".element-content"));
      }
      
      //el.className = 'drop-element';
      //makeEditable();
    }
    if (container == rowDragMenu) {
      el.innerHTML = el.getAttribute('data-title');
    }
    //sanitizeItems();
    
  });

  function createExportYml(index) {
    
    let exportBox = document.querySelector(".exportYMLbox");
    let sections = document.querySelectorAll('section');
    let formattedParams = "stacks:\n";
    let indentParams = "";
      ////////////////////////////////////////
     // YAML --- FRONT MATTER GENERATOR ---//
    ////////////////////////////////////////
  
    sections.forEach(function (section, index) {
  
    let selectedTitle = section.getAttribute('template');
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
    
    // ROWS
    let rows = section.querySelectorAll('#row');
    formattedParams += `${indentParams}rows:\n`;
      
    rows.forEach(function (row, index) {
  
    selectedTitle = row.getAttribute('template');
  
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
  
    // COLUMNS
    let columns = row.querySelectorAll(".column");
  
  
    formattedParams += `${indentParams}cols:\n`;
  
      columns.forEach(function (column, index) {
  
        selectedTitle = column.getAttribute('template');
  
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
        
        // ELEMENTS
        const elements = column.querySelectorAll('.elements-wrapper');
  
        formattedParams += `${indentParams}elements:\n`;
        
          elements.forEach(function (element, index) {
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
    });
    });
  
  
    // add the text to the export box textarea
    console.log(formattedParams);
  
    exportBox.value = formattedParams;
  }
  //} // End if body class contains inspect mode
  
  
// Lazy load the images that are in the content directory.
function imageUpload () {

}
}
