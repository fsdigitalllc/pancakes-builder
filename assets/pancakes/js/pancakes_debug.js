/*Functions need refactoring.
On drop, regenerate sections, rows, columns, elements so that indicators display
When dynamically generating content in the sidebar, make sure the current HTML in each variable is correct. This can be fixed by seperating functions
- There's an issue where the variable for the dynamic content in the sidebar is undefined due to the order of HTML loaded in the dom. This is caused by the current function setup not being interrelated.
*/
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
  
  
  document.querySelector(".pb-close").addEventListener("click", (e) => {
    body.classList.toggle("inspect-mode");
    console.log("clicked close");
  });
  
});

// The object tree needs to be in seperate function
// iterate through each section, row, column, element
// compare the object tree classes to the existing classes
// if the class exists (is active), add the text to the text area.

function pancakes(pageId) {

  console.log("loading pancakes..." + pageId);
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
  
  const exportYML = document.querySelector('.pb-export__yml');
  const mediaUploadButton = document.querySelector(".imageUpload");
  // Pages menu
  const pagesDrawer = document.querySelector(".pb-pagesContainer");
  const pagesBtn = document.querySelector(".pb-pageNavigator");
  const mediaBox = document.querySelector(".mediaUploads");
  
  let savedData = `${pageId}.savedData`;
  let saveChangesButton = document.querySelector(".pb-quickBtns .pb-saveChanges");
  let revertChangesButton = document.querySelector(".pb-quickBtns .pb-revertChanges");
  let clearChangesButton = document.querySelector(".pb-quickBtns .pb-clearChanges");
  let debugBarMenuTitle = document.querySelector(".debugging-bar .pb-dynamicArea .debugBarMenuTitle");
  let debugBarSubMenu = document.querySelector(".debugging-bar .pb-dynamicArea > ul");
  //https://codepen.io/nakome/pen/qRWqBe -- copy elements
  const makeEditable = () => {
    let editElements = document.querySelectorAll('[data-edit]');
    
    console.log("makeeditable");
    //console.log(editElements);
    let toArr = Array.prototype.slice.call(editElements);
    Array.prototype.forEach.call(toArr, (obj, index) => {
      
        obj.addEventListener('dblclick', (e) => {
          console.log("edit this element");
          console.log(obj);
          if (obj.getAttribute('data-element') == "element-image") {
            console.log("it's an image");
            let imageSrc = obj.getAttribute('src');
            let imageSrcset = obj.getAttribute('srcset');
            html = `<input type="text" value="${imageSrc}"></input>
            <input id="submit" type="submit"></input>`;
            createDynamicContent(html);

            _(".pb-populateValues input[type='submit']").addEventListener("click", (e) => {
              console.log("submit");
              imageSrc = _(".pb-populateValues input[type='text']").value;
              obj.setAttribute('src', imageSrc);
              obj.setAttribute('srcset', '');
              obj.setAttribute('data-srcset', '');
            });
          } else if (obj.getAttribute('data-element') == "element-title") {
            let titleTag = obj.tagName;
            let titleText = obj.innerText;
            html = `
            <input type="text" data-attr-text="title-text" value="${titleText}"></input>
            <input type="text" data-attr-tag="title-tag" value="${titleTag}"></input>
            <input id="submit" type="submit"></input>`;
            createDynamicContent(html);
            _(".pb-populateValues input[type='submit']").addEventListener("click", (e) => {
              console.log("submit");
              titleText = _(".pb-populateValues input[data-attr-text='title-text']").value;
              titleTag = _(".pb-populateValues input[data-attr-tag='title-tag']").value;
              let newTitle = document.createElement(titleTag);
              newTitle.setAttribute("id", "seven");
              let oldAttrs = obj.attributes;

                Array.from(oldAttrs).forEach(function (item, key) {
                  console.log("oldattrs");
                  console.log(item);
                  console.log(key);
                  newTitle.setAttribute(item.name, item.value);
                });
              console.log(newTitle);
              console.log(obj.attributes);
              newTitle.innerText = titleText;

              //var a = ​document.getElementsByTagName('a');
              // var el, attrs;
              // for(var i=0,l=obj.length;i<l;i++) {
              //     el = document.createElement('div');
              //     attrs = obj.attributes;
              //     for(var j=0,k=attrs.length;j<k;j++) {
              //         el.setAttribute(attrs[j].name, attrs[j].value);
              //     }
              //     el.innerHTML = obj.innerHTML;
              //     obj.parentNode.replaceChild(el, obj);
              // }
              console.log(obj.parentNode.replaceChild(newTitle, obj));
              sanitizeItems();
              // // move children
              // while(obj.firstChild) newTitle.appendChild(obj.firstChild);

              // // copy attributes
              // for( var i=0, a=obj.attributes, l=a.length; i<l; i++) {
              //   newTitle.attributes[a[i].name] = a[i].value;
              // }
              // obj.parentNode.replaceChild(newTitle, obj);
              // // obj.tagName(titleTag);
              // // obj.innerText(titleText);
            });
          } else {
            //e.preventDefault();
            //obj.setAttribute('contenteditable', '');
            //obj.focus();
            html = obj;
            createDynamicDialogue(obj, html);
          }
        });
        // obj.addEventListener('blur', (e) => {
        //   e.preventDefault();
        //   obj.removeAttribute('contenteditable');
        // });
      
    });
  };
  

  
  function createDynamicDialogue(obj, html) {
    console.log(html);
    let dDialogue = _(".pb-dynamicDialogue");
    dDialogue.classList.add("active");
    let objNew = dDialogue.querySelector("textarea").value = html.innerHTML;
    dDialogue.querySelector("input[type='submit']").addEventListener("click", (e) => {
      dDialogue.classList.remove("active");
      objNew = dDialogue.querySelector("textarea").value; 
      obj.innerHTML = objNew;
    });

  }
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
  
  mediaUploadButton.addEventListener("click", () => {
    mediaBox.classList.toggle("active");
    mediaUploadButton.classList.toggle("active");
  });

  // Organize these variables...
  let sections = document.querySelectorAll('section');

  pagesBtn.addEventListener("click", () => {
    pagesDrawer.classList.toggle("active");
  });

  sanitizeItems(); // adds overlays to each item. Needs to be fired after any item is created

  function sanitizeItems() {
  
    console.log("sanitizeItems...");
    //Clean out some generated elements before regenerating them
    document.querySelectorAll(".dbg-each-menu").forEach(e => e.parentNode.removeChild(e));
    formSections(sectionClasses);
    makeEditable();
  }//end sanitizeItems

  // Create hover menus
  function createEditMenu(selectedItem, selectedTitle, selectedType, index) {
    
    let debugWidget = `<span id="section-dbg-menu" class="dbg-each-menu">
    
    <div class="dbg-main-btns">
    
    <i class="fas fa-arrows-alt"></i>
    <span class="this-selected-name">${selectedTitle}</span>
    <a class="prepend-me part-edit" title="Open the Page Editor for this Part" href="https://app.forestry.io/sites/site_id/#/pages/content-{{ $.Scratch.Get "part_preview_link" }}"><i class="fas fa-external-link-alt"></i></a>
    <i class="fas fa-pen-square"></i>
    </div>
    </span><!--dbg-each-menu-->`;
    
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
    document.querySelector(".debugging-bar .pb-dynamicArea").classList.toggle("active");
      defineClasses(selectedItem, selectedTitle, selectedType, sectionClasses);
    });
  }//end createEditMenu

function defineClasses(selectedItem, selectedTitle, selectedType, sectionClasses, index) {
  
  let selectedClasses = "";
  let html = "";
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
    //html = debugBarSubMenu.innerHTML;
    //createDynamicContent(html);
    if ( !_(".debugging-bar .pb-dynamicArea").classList.contains("active") ) {
      _(".debugging-bar .pb-dynamicArea").classList.add("active");
    }
}//end defineClasses

//do stuff for each section
function formSections(sectionClasses) {
  
  console.log("formSections...");

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
  let dbgSelectedTitle = document.querySelector(".debugging-bar .pb-dynamicArea > li");

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
          //event.target.style.outline = "1px solid green";
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

          //Split the formation function from the function that iterates through and makes things clickable
          // element.addEventListener('dblclick', function (e) {
          //   element.classList.toggle('large');
          // });
        });

      });
    }); 
  });
  //refresh drag and drop so that it gets the new containers
  dragDrop();
}

  let exportBox = document.querySelector(".exportYMLbox");
  
  exportYML.addEventListener("click", () => {
    console.log("start export");
    createExportYml();
    exportYML.classList.toggle("active");
    exportBox.classList.toggle("active");
  });
  ////////////////////////Drag and drop functionality////////////////
  /**Gets the tpl.
   * @param      {<type>}  element  The element
   * @return     {string}  The tpl.
   */
  const getTpl = (element) => {
    return tpl[element];
  };
  debugBarMenuTitle.addEventListener("click", () => {
    debugBarMenuTitle.classList.toggle("active");
    //console.log("debugbarmenutitle");
  });

  
  if ( _(".pb-dynamicArea").classList.contains("active") ) {
    dragulaCreate();
  } else {
    // Initialize the copy functionality on click
    _(".debugging-bar .pb-addItems").addEventListener("click", () => {
      //_(".debugging-bar .pb-dragSourceList").classList.toggle("active");
      html = _(".pb-dragSourceList").innerHTML;
      //after forming classes, start draggable
      createDynamicContent(html);
      dragDrop();
      //dragulaCreate();
      //sanitizeItems();
      //console.log("debugbarmenutitle");
    });
  }
  function dragDrop() {
    console.log("dragDrop...");

    //Reorder sections with drag and drop using a handle
    dragula([_("main")], {
      moves: function (el, container, handle) {
        return handle.classList.contains('fa-arrows-alt');
    },
      invalid(el, handle) {
        // If the selected element className is column, 
        //    dont allow the row to be dragged. This will allow 
        //    the column to be dragged separate from the row. 
        return (el.classList.contains("row") || el.classList.contains("column") );
      }
    }).on('out', function (el) {
      el.classList.remove("in-transit");
      AOS.refresh();
    });

    // add existing sections as an array
    let containers = [].slice.call(document.querySelectorAll("section"));
    
    //Reorder rows with drag and drop using a handle
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
    }).on('drag', function (el) {
        el.classList.add("in-transit");
    }).on('out', function (el) {
        el.classList.remove("in-transit");
        AOS.refresh();
    });

    containers = [].slice.call(document.querySelectorAll(".row"));

    //Reorder rows with drag and drop using a handle
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
    }).on('out', function (el) {
      el.classList.remove("in-transit");
      AOS.refresh();
    });;


    //////////////////////////////////////// CREATE ITEMS ON DROP ////////////////////////////////////////////////////
   
    
    //console.log(debugBarElementMenu);


    //function dragulaCreate () {
      
      let dragMenu = document.querySelector(".debugging-bar .pb-dynamicArea .pb-populateValues ul.elementsDrag");

      //Create elements, set the dragMenu as source
      containers = Array.prototype.slice.call(document.querySelectorAll("section .row .column .elements-wrapper")).concat(dragMenu);
      
      //console.log(containers);
      let elementDrake = dragula({
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

      elementDrake.on('drop', function (el, container) {
        if (container.classList.contains("elements-wrapper") && el.getAttribute('data-tpl') ) {
          //el.innerHTML = getTpl(el.getAttribute('data-tpl'));
          //el.className = 'drop-element';
          //makeEditable();
          //sanitizeItems(); //regen the overlays
          //sanitizeItems();
          itemCreate(el)
        }
        if (container == dragMenu) {
          el.innerHTML = el.getAttribute('data-title');
        }
        //sanitizeItems();
        
      });


      let rowDragMenu = document.querySelector(".debugging-bar .pb-dynamicArea .pb-populateValues ul.rowsDrag");
      //let findElements = rowDragMenu.querySelectorAll("[data-tpl]");
      containers = Array.prototype.slice.call(document.querySelectorAll(".row")).concat(rowDragMenu);
      

      let rowDrake = dragula({
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
      rowDrake.on('drop', function (el, container) {
        if (container.classList.contains("row") && el.getAttribute('data-tpl') ) {
          //console.log("dragging...row level containers");
          //console.log(containers);
          //console.log("dropped1");
          //console.log(el);

          //el.innerHTML = getTpl(el.getAttribute('data-tpl'));
          //console.log("el");

          itemCreate(el);
          
          //formSections(sectionClasses);
          // if (el.querySelector(".element-content")) {
          //   console.log("dropped2");
          //   console.log(el.querySelector(".element-content"));
          // }
          
          //el.className = 'drop-element';
          //makeEditable();
        }
        if (container == rowDragMenu) {
          el.innerHTML = el.getAttribute('data-title');
        }
      });
      function itemCreate(el) {
        let elReplace = el.querySelector(".element-content").innerHTML;
        elReplace = document.createRange().createContextualFragment(elReplace);
        console.log(elReplace);
        
        console.log(el.parentNode.querySelector("li[data-tpl]"));
        el.parentNode.replaceChild(elReplace, el);

        //formSections(sectionClasses);
        sanitizeItems();
      }
      
    //}
  }
    

  ////////////////////////////// Generate the content in the sidebar ---/////////////////////////////////////////////
  function createDynamicContent(html, index) {
    console.log("createDynamicContent in the sidebar...");
    
    _(".pb-dynamicArea .pb-populateValues").innerHTML = html;
    if (html) {
      _(".debugging-bar .pb-dynamicArea").classList.add("active");
    } else {
      _(".debugging-bar .pb-dynamicArea").classList.remove("active");
    }
    //_(".debugging-bar .pb-dynamicArea").classList.toggle("active");
    //console.log(_(".pb-dynamicArea .pb-populateValues").innerHTML);
    
  }//end createDynamicContent

  ////////////////////////////// YAML --- FRONT MATTER GENERATOR ---/////////////////////////////////////////////
  function createExportYml(index) {
    
    let exportBox = document.querySelector(".exportYMLbox");
    let sections = document.querySelectorAll('section');
    let formattedParams = "stacks:\n";
    let indentParams = "";
  
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
    console.log(formattedParams);
    exportBox.value = formattedParams;
  }//createExportBox

  //} // End if body class contains inspect mode

}//End function Pancakes
