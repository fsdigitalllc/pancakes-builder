// Query shorthand:
// _(".element");
// _All(".elements");

// TEST MODE //
_("html").classList.add("editing--mode");

_(".drawer").classList.add("drawer--fixed-header", "drawer--is-visible");
///////////////

// Draggable elements will always use data-pb-template-level
let dataSections = "main [data-pb-template-level='section']";
let dataRows = "main [data-pb-template-level='row']"
let dataColumns = "main [data-pb-template-level='column']", dataElements = "main [data-pb-template-level='element']";
const dataSelect = "fa-move";
const moveHandle = "fa-move", editHandle = "fa-edit", hoverMenu = "hover-menu", editHover = "edit-hover", editClick = "pb-editing", dialogueTrigger = document.querySelector('[pb-function="exportYml"]'), modalSave = ".modal--dialogue.modal--is-visible [pb-function='save']", drawerTitle = "drawerTitle", responsiveMode = "data-pb-responsive-mode", iFrame = _("iframe.pbResponsiveFrame");
var modal = document.querySelector('.modal');
_("html").setAttribute(responsiveMode, "desktop");
let paramContainer = document.querySelector('[pb-content="params"]');
//local storage
const db = localStorage;
const pageId = window.location;
const savedData = `${pageId}.savedData`;
const autoSavedData = `${savedData}.auto`;

const responsiveAttribute = _("html").getAttribute(responsiveMode)
// Modes
if (!responsiveAttribute) {
  _("html").setAttribute(responsiveMode, "desktop")
};

// move UI Outside of main
function moveFromMain(){
  //console.log(_(".pb-template-contentWrapper"));
  _("body").appendChild(_(".builderUIComponents"));
  _("body").appendChild(_(".pb-template-contentWrapper"));
  
  // move scripts to footer
  _All("main script").forEach((element, index) => {
    _("main").parentNode.appendChild(element);
  });

  _All("main link").forEach((element, index) => {
    _("head").appendChild(element);
  });
  _All("main style").forEach((element, index) => {
    _("head").appendChild(element);
  });
  _All(".modal").forEach((element, index) => {
    _("body").appendChild(element);
  });
  _("body").appendChild(_(".pb-responsive-wrapper"));
  

  // Move out nested elements
  _All(`.pb-template-contentWrapper [data-pb-template-level^='row']`).forEach((element, index) => {
    _(".pb-template-contentWrapper").appendChild(element);
  });
  _All(`.pb-template-contentWrapper [data-pb-template-level^='column']`).forEach((element, index) => {
    _(".pb-template-contentWrapper").appendChild(element);
  });
}

var promise1 = new Promise(function(resolve, reject) {
  resolve(moveFromMain());
});

promise1.then(function() {
  loadAutoSave();
}).then(function() {
  dragDrop();
}).then(function() {
  hoverState();
}).then(function() {
  dragOrder();
});

function hoverState() {
  _All(`${dataSections}, ${dataRows}, ${dataColumns}, ${dataElements}`).forEach((item, index) => {
  
    item.setAttribute(editClick, "0")
    var inactiveHover = function () {
      item.classList.remove(editHover);
      let tempMenu = item.querySelector(`.${hoverMenu}`);
        if (tempMenu) {
          tempMenu.parentNode.removeChild(tempMenu);
        }
    }

    var activeHover = function (e) {
      item.classList.add(editHover);
    }
    
    var createHandle = function (event) {
      // If handle wasn't already created, create it
      if (!item.querySelector(`.${hoverMenu}`)) {
        //console.log("item", e.currentTarget);
        var node = document.createElement("div");
        node.classList.add(`${hoverMenu}`);
        node.innerHTML = `<svg class="icon-arrows ${moveHandle}"><use xlink:href="/images/icons.svg#icon-arrows"></use></svg><svg class="icon-pencil ${editHandle}" pb-function="edit-item"><use xlink:href="/images/icons.svg#icon-pencil"></use></svg>`;
        item.appendChild(node);

        item.querySelector(`[pb-function='edit-item']`).addEventListener("click", editItem, false);
      }
      if (event.target === item) {
        activeHover(event);
      }
    }
    
    item.addEventListener("mouseover", createHandle, false);
    item.addEventListener("mouseleave", inactiveHover, false);

  });
}

const camelToDash = str => str
  .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
  .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`)

// On click, allow user to toggle the selected items classes using the options in the sidebar
let getType = item => {
  let level = item.getAttribute("data-pb-template-level");
  //console.log(level);
  if (level) {
    return level;
  } else {
    return "Que?";
  }
}

// add some features for all modal windows

// Get the nearest editable parent of the selected handle
let getClosest = elem => {
  let selector = "data-pb-template-level";
  console.log(elem);
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.hasAttribute("data-pb-template-level") ) return elem;
	}
	return null;
};

let getResponsiveMode = () => {
  return _("html").getAttribute(responsiveMode);
}
// Do this stuff after a responsive-related mode is triggered. IE, toggling responsive mode or editing a div.
let setResponsiveMode = () => {

  let currentMode = getResponsiveMode();
  // Toggle stuff in sidebar
  let allGroups = _All(".drawer [data-pb-support-mode]");

  // For now, toggling these values in responsive mode doesn't matter
  // allGroups.forEach( group => {
  //   //console.log(group.getAttribute("data-pb-support-mode"));
  //   if (group.getAttribute("data-pb-support-mode") !== currentMode) {
  //     group.style.display = "none";
  //   } else {
  //     group.style.display = "block";
  //   }
  // })
};

// Hide or display options based on the selected item level
let setSupportedClasses = level => {
  //console.log("supported classes", level);
  let allGroups = _All(".drawer [pb-supports]");
  allGroups.forEach( group => {
    //v.includes(value))
    if (group.getAttribute("pb-supports").includes(level) || group.getAttribute("pb-supports") === "global") {
      group.style.display = "block";
    } else {
      group.style.display = "none";
    }
  });
}

// On responsive button click, toggle the button state, display the iframe, and then hide drawer options that don't relate to the current responsive view
let responsiveToggleButton = (e) => {
  let currentMode = getResponsiveMode();
  let btn = e.target;
  console.log("current mode: ", currentMode);
  if ((".pbResponsiveFrame")) {
    
      let iContent = iFrame.contentWindow.document;
      let contents = iContent.querySelectorAll(".builderUIComponents, .modal, .pb-template-contentWrapper, iframe.pbResponsiveFrame");

      let html = iContent.querySelector("html")
      let main = document.querySelector("main").innerHTML;
      //html.classList.remove("editing--mode");
      html.setAttribute("data-pb-responsive-mode", "desktop");
      html.style.width = "100%";
      contents.forEach( content => {
        console.log("contents...", content)
        content.style.display = "none";
      })
    // }
    if (currentMode === "desktop") {
      //console.log("set tablet mode", iFrame)
      _("html").setAttribute(responsiveMode, "tablet");
      btn.innerText = "T"
  
      iFrame.setAttribute("width", 600)
      iFrame.setAttribute("height", 780)
    } else if (currentMode === "tablet") {
      _("html").setAttribute(responsiveMode, "mobile");
      btn.innerText = "M"
  
      iFrame.setAttribute("width", 420)
      iFrame.setAttribute("height", 650)
    } else if (currentMode === "mobile") {
      _("html").setAttribute(responsiveMode, "desktop");
      btn.innerText = "D"
    }
    iContent.querySelector("main").innerHTML = document.querySelector("main").innerHTML;
  }
  setResponsiveMode();
}
_('[pb-function="responsive"]').addEventListener("click", responsiveToggleButton, false);

let createEditor = (item, textArea) => {
  let editor = CodeMirror.fromTextArea(textArea, {
    lineNumbers: true,
    lineWrapping: true,
    autofocus: true,
    showCursorWhenSelecting: true,
    value: textArea.value,
    mode: "htmlmixed"
  });
}

let toggleModal = (src, type) => {

  let modalContent = modal.querySelector(".modal__body");

    // event.detail is the element that triggered the modal opening
    console.log("MODAL OPEN---")
    modal.classList.add("modal--full-screen")
    let toggleFullscreen = button => {
      modal.classList.toggle("modal--full-screen")
    }
    modal.querySelector("[pb-function='fullscreen-modal']").addEventListener("click", toggleFullscreen, false);

    // Stuff here
    if (type === "text") {
      //console.log("text Value: ", editText(src))
    } else {
      modalContent.innerHTML = src;
    }

    let saveModal = (src, content) => {
      
      console.log("src: ", src.innerHTML, "content: ", content.innerHTML)

      if (type === "params") {
        let newValues = content.querySelectorAll("input");
        newValues.forEach((input, index) => {
          input.setAttribute('value', input.value);
        })
        src.innerHTML = content.innerHTML;
      } else if (type === "yml") {
        console.log("save YML?")
      }
    }
    let modalClose = (event) => {
      if (event.target.getAttribute("pb-function") !== "save") {
        console.log("do not save changes", event.target)
      } else {
        console.log("save the changes");
        saveModal(paramContainer, modalContent);
        //saveText(item, textArea, editor, CM);
      }
      //modalContent.innerHTML = "";
    }
    modal.querySelector("[pb-function='save']").addEventListener("click", modalClose, false);
    
}

// Param editor
_(".drawer [pb-function='params']").addEventListener("click", () => {
  toggleModal(paramContainer.innerHTML, "params")
}, false);

// YML trigger
dialogueTrigger.addEventListener("click", () => {
  console.log(exportYml());
  toggleModal(exportYml(), "yml")
}, false);

let editItem = editBtn => {
  // Get the item (section, row, column)
  _All(`${dataSections}, ${dataRows}, ${dataColumns}, ${dataElements}`).forEach((level, index) => {
    level.setAttribute(editClick, "0")
  });
  let item = getClosest(editBtn.currentTarget);
  item.setAttribute(editClick, "1")
  _(`.${drawerTitle}`).innerText = getType(item);

  setSupportedClasses(getType(item));
  
  if (item.getAttribute("data-pb-element-type") === "text") {
    _(".drawer [pb-function='edit-code']").addEventListener("click", () => {
      toggleModal(item, "text")
    }, false);
    // _(".drawer [pb-function='edit-code']").addEventListener("click", () => {
    //   toggleModal(item, type === "params")
    // }, false);
  }

  let tabSections = _All(".drawer .tabs__panels section");
  let tabs = _All(".drawer .tabs .tab-title");

  tabSections.forEach(tabSection => {
    tabSection.classList.remove("tabs__panel--selected");
    if (!tabSection.classList.contains("tab__panel--is-hidden") ) {
      tabSection.classList.add("tab__panel--is-hidden");
    }
  })

  // Need to fix tab active state
  // Set aria-selected to true/false and selected class
  tabs.forEach(tab => {
    tab.classList.remove("tabs__control--selected");
    if (!tab.classList.contains("tab__panel--is-hidden") ) {
      tab.classList.add("tab__panel--is-hidden");
    }
  });

  _('.drawer .tabs__panels [pb-function="edit-item" ]').classList.add("tabs__panel--selected");

  let allOptions = _All(".drawer input"), value, v, name;

  //let keys = Object.entries(item.dataset);
  allOptions.forEach( input => {
    value = input.value;

    input.addEventListener("click", (e) => {
      setClasses(input, item, allOptions);
    }, false);
  
    v = getClasses(item);
    
    if (v.includes(value)) {
      //console.log(value)
      input.checked = true;
    } else {
      input.checked = false;
    }
  })
}

// On edit click, get all classes in use on the current item
let getClasses = item => {
  //console.log("getClasses", item)
  let keys = Object.entries(item.dataset);
  let v;
    keys.forEach((key, i) => {
      if (key[0] === "pbClass") {
        v = key[1];
      }
    })
    return v;
}

// After selection an option in the drawer, modify the HTML with the newly selected classes
let setClasses = (input, item, inputs) => {
  //let currentClasses = getClasses(item);
  let inputClasses = "";
  inputs.forEach(i => {
    if (i.checked) {
      inputClasses += `${i.value} `;
    }
  });
  if (item.getAttribute(editClick) === "1") {
    item.classList = inputClasses;
    item.setAttribute("data-pb-class", inputClasses)
  }
}

function dragDrop() {
  // Elements that are created on drag start in the drawer sidebar
  let dragMenu = document.querySelector('.drawer .drawer__body [pb-function="item-drawer"]');
  let containers = Array.prototype.slice.call(_("main"));
  //console.log(containers);
  //[dragMenu, containers], 
  
  var createOnDrop = dragula([dragMenu, containers], {
    isContainer: function (el) {
      return false; // only elements in drake.containers will be taken into account
    },
    moves: function (el, source, handle, sibling) {
      if (handle.getAttribute("data-pb-template-level") && source === dragMenu) {
        return true; // elements are always draggable by default
      }
    },
    accepts: function (el, target, source, sibling) {
      if (el.getAttribute("data-pb-template-level") === "section" && target.classList.contains("site-main")) {
        return true;
      } else if (el.getAttribute("data-pb-template-level") === "row" && target.getAttribute("data-pb-template-level") === "section") {
        return true;
      } else if (el.getAttribute("data-pb-template-level") === "column" && target.getAttribute("data-pb-template-level") === "row") {
        return true;
      } else if (el.getAttribute("data-pb-template-level") === "element" && target.getAttribute("data-pb-template-level") === "column") {
        return true;
      }
    },
    invalid: function (el, handle) {
      return false;
    },
    direction: 'vertical',
    copy: true,
    copySortSource: false,
    revertOnSpill: true,
    removeOnSpill: false,
    ignoreInputTextSelection: true     // allows users to select input text, see details below
  });
  createOnDrop.containers.push(_("main"));
  createOnDrop.on('drag', function (el) {
    el.classList.add("in-transit");
  }).on('out', function (el) {
    el.classList.remove("in-transit");
  }).on('drop', function (el, container, source) {
    if (source === dragMenu) {
     dragCreate(el, createOnDrop, containers); 
    }
  });
}

function dragOrder() {
  //Reorder sections with drag and drop using a handle
  dragula([_("main")], {
    moves: function (el, container, handle) {
      return handle.classList.contains(moveHandle);
  },
    invalid(el, handle) {
      return (el.getAttribute("data-pb-template-level") === "row" || el.getAttribute("data-pb-template-level") === "column" || el.getAttribute("data-pb-template-level") === "element" );
    }
  }).on('out', function (el) {
    el.classList.remove("in-transit");
  });

  // add existing sections as an array
  let containers = [].slice.call(document.querySelectorAll("[data-pb-template-level='section']"));
  
  //Reorder rows with drag and drop using a handle
  dragula(containers, {
    moves: function (el, container, handle) {
      return handle.classList.contains(moveHandle);
  },
    invalid(el, handle) {
      // If the selected element className is column, 
      //    dont allow the row to be dragged. This will allow 
      //    the column to be dragged separate from the row. 
      return (el.getAttribute("data-pb-template-level") === "column" || el.getAttribute("data-pb-template-level") === "element" );
    }
  }).on('drag', function (el) {
      el.classList.add("in-transit");
  }).on('out', function (el) {
      el.classList.remove("in-transit");
  });

  containers = [].slice.call(document.querySelectorAll("[data-pb-template-level='row']"));

  //Reorder rows with drag and drop using a handle
  dragula(containers, {
    moves: function (el, container, handle) {
      return handle.classList.contains(moveHandle);
    },
    direction: 'horizontal',
    invalid(el, handle) {
      return (el.getAttribute("data-pb-template-level") === "element" );
    },
    }).on('out', function (el) {
      el.classList.remove("in-transit");
    });

  containers = [].slice.call(document.querySelectorAll("[data-pb-template-level='column']"));

  //Reorder rows with drag and drop using a handle
  dragula(containers, {
    moves: function (el, container, handle) {
      return handle.classList.contains(moveHandle);
    },
    direction: 'vertical',
    // invalid(el, handle) {
    //   return (el.classList.contains("element") );
    // },
    }).on('out', function (el) {
      el.classList.remove("in-transit");
    });
  }

function dragCreate (el, drake, containers) {
  let pbTemplateAdd = el.getAttribute("data-pb-template-add");
  let pbCreateContent = _(".pb-template-contentWrapper");
  let pbTemplate = pbCreateContent.querySelector(`[data-pb-template^='${pbTemplateAdd}']`);
  let pbReplace = pbTemplate.cloneNode(true);
  el.parentNode.replaceChild(pbReplace, el);
  drake.containers.push(pbReplace);
  //console.log(drake.containers);
  hoverState();
  dragOrder();
}

//let dialogue = document.querySelector(".modal--dialogue");


const ymlString = (item, index) => {

  // Index: the current index of the draggable section, row, or column
  // i: the current key index

  let keys = Object.entries(item.dataset);
  let yml = "";
  let indent, prefix, name, value, level = item.getAttribute("data-pb-template-level");

  // iterate through each data-pb and grab the value
  // the order matches the order in the markup
  keys.forEach((key, i) => {      

    // YML format:
    // name: value
    name = key[0], value = `${key[1]}\n`;
    // replace camelcase with dash format. Remove data-pb prefix so it matches our desirable YML
    name = `${camelToDash(name).replace("pb-", "")}:`;
    
      //console.log(index, i, name,": ", value);
      // For the first key index (i), use a dash in the prefix. We assume it's - template: for the first key index
      if (i === 0) {
        prefix = "- ";
      } else {
        prefix = "  ";
      }
      // For each draggable item, the YML indent will vary slightly. 
      if (level === "section" ) {
        indent = "  "
      } else if (level === "row") {
        indent = "    "            
      } else if (level === "column") {
        indent = "      "            
      } else if (level === "element") {
        indent = "        "
      }
      // In our YML, each nested loop is started like this: "level-name:". However, this is only added once per loop level, so we compare the item index with the data index (i).
      if (level === "section") {
        
      } else if ((index === 0 && i === 0)) {
        yml += `${indent}${level}s:\n`;
      } else if (item.getAttribute("data-pb-element-type") === "text") {
        //yml += `${indent}${prefix}html: |\n`;
        let cleanH = item.innerHTML.replace(/\s+/g,'');
        yml += `${indent}${prefix}html: |\n${indent}${prefix}  ${cleanH}\n`;
      }
    yml += `${indent}${prefix}${name} ${value}`;
    
  });
  //console.log(yml);
  return yml;
}

var exportYml = function  () {
  console.log("export YML starting...");
  let sections = _All(dataSections);
  let rows, columns, elements, indent;
  let yml = `---\n`;
  let params = _All(".modal--full-screen label, .modal--full-screen input");

  let key, value, prefix;
  params.forEach((param, index) => {
      key = param.getAttribute("data-pb-key");
      value = param.value;
      if ( (key != undefined && key != null) && (value != undefined || value != null) ) {
        yml += `${key}: ${value}\n`;
      }
  });

  yml += "stacks:\n";

  // Loop through each draggable item within <main> tags, then get the data-attributes, then generate the YML.
  sections.forEach((section, index) => {
    yml += ymlString(section, index);

    rows = section.querySelectorAll(dataRows);
    rows.forEach((row, index) => {
      yml += ymlString(row, index);

      columns = row.querySelectorAll(dataColumns);
        columns.forEach((column, index) => {
          yml += ymlString(column, index);

          elements = column.querySelectorAll(dataElements);
          elements.forEach((element, index) => {
            yml += ymlString(element, index);
          });
        });
    });
  });
  yml += `---\n`;
  // CodeMirror(function(elt) {
  //   textArea.parentNode.replaceChild(elt, textArea);
  // }, {value: textArea.value});
  return yml;
}

let savePage = page => {
  console.log("save page")
  db.setItem(savedData, _("main").innerHTML);
}
_("[pb-function='save']").addEventListener("click", savePage, false);

let loadSave = page => {
  //console.log(db.getItem(savedData))
  _("main").innerHTML = db.getItem(savedData);
  //db.setItem(savedData, _("main").innerHTML);
  dragDrop();
  hoverState();
  dragOrder();

}
_("[pb-function='load']").addEventListener("click", loadSave, false);


let autoSave = page => {
  db.setItem(autoSavedData, _("main").innerHTML);
}
let loadAutoSave = page => {
  if (!db.getItem(autoSavedData) === null || !db.getItem(autoSavedData) === undefined) {
    _("main").innerHTML = db.getItem(autoSavedData);
  }
}
// Auto save
setInterval(() => {
  //console.log("Auto saving...")
  autoSave();
}, 5000);