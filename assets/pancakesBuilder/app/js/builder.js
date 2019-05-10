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
let dataColumns = "main [data-pb-template-level='column']";
const dataSelect = "fa-move";

//local storage
const db = localStorage;
const pageId = window.location;
const savedData = `${pageId}.savedData`;
const autoSavedData = `${savedData}.auto`;

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
  _All(`${dataSections}, ${dataRows}, ${dataColumns}`).forEach((item, index) => {
  
    var inactiveHover = function () {
      item.classList.remove("edit-hover");
      let faMove = item.querySelector(".fa-move");
        if (faMove) {
          faMove.parentNode.removeChild(faMove);
        }
    }

    var activeHover = function (e) {
      item.classList.add("edit-hover");
    }
    
    var createHandle = function (event) {
      
      // If handle wasn't already created, create it
      if (!item.querySelector(".fa-move")) {
        
        //console.log("item", e.currentTarget);
        var node = document.createElement("div");
        node.classList.add("fa-move");
        node.innerHTML = `<svg class="icon-arrows"><use xlink:href="/images/icons.svg#icon-arrows"></use></svg>Move Me <svg class="icon-pencil" pb-function="edit-item"><use xlink:href="/images/icons.svg#icon-pencil"></use></svg>`;
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

// On click, allow user to toggle the selected items classes using the options in the sidebar
let editItem = editBtn => {
  console.log(editBtn.target.parentNode.parentNode)

  // Get the item (section, row, column, element)
  //let item = editBtn.target.parentNode.parentNode;

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
      return handle.classList.contains('fa-move');
  },
    invalid(el, handle) {
      return (el.getAttribute("data-pb-template-level") === "row" || el.getAttribute("data-pb-template-level") === "column" );
    }
  }).on('out', function (el) {
    el.classList.remove("in-transit");
  });

  // add existing sections as an array
  let containers = [].slice.call(document.querySelectorAll("[data-pb-template-level='section']"));
  
  //Reorder rows with drag and drop using a handle
  dragula(containers, {
    moves: function (el, container, handle) {
      return handle.classList.contains('fa-move');
  },
    invalid(el, handle) {
      // If the selected element className is column, 
      //    dont allow the row to be dragged. This will allow 
      //    the column to be dragged separate from the row. 
      return (el.getAttribute("data-pb-template-level") === "column" );
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
      return handle.classList.contains('fa-move');
    },
    direction: 'horizontal',
    invalid(el, handle) {
      return (el.classList.contains("element") );
    },
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

let dialogue = document.querySelector(".modal--dialogue");
let dialogueTrigger = document.querySelector('[pb-function="exportYml"]');


var exportYml = function  () {
  console.log("export YML starting...");
  let sections = _All(dataSections);
  let rows, columns, indent;
  let textArea = dialogue.querySelector('textarea');
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

  const camelToDash = str => str
  .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
  .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`)

  const ymlString = (item, index) => {

    // Index: the current index of the draggable section, row, or column
    // i: the current key index

    let keys = Object.entries(item.dataset);
    let indent, prefix, name, value, level = item.getAttribute("data-pb-template-level");

    // iterate through each data-pb and grab the value
    // the order matches the order in the markup
    keys.forEach((key, i) => {      

      // YML format:
      // name: value
      name = key[0], value = key[1];

      // replace camelcase with dash format. Remove data-pb prefix so it matches our desirable YML
      name = camelToDash(name).replace("pb-", "");
        
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
        }
        // In our YML, each nested loop is started like this: "level-name:". However, this is only added once per loop level, so we compare the item index with the data index (i).
        if (level === "section") {
          
        } else if ((index === 0 && i === 0)) {
          yml += `${indent}${level}s:\n`;
        }
      yml += `${indent}${prefix}${name}: ${value}\n`;
      
    });

    console.log(yml);
    return yml;

  }

  // Loop through each draggable item within <main> tags, then get the data-attributes, then generate the YML.
  sections.forEach((section, index) => {
    textArea.value = ymlString(section, index);

    rows = section.querySelectorAll(dataRows);
    rows.forEach((row, index) => {
      textArea.value = ymlString(row, index);

      columns = row.querySelectorAll(dataColumns);
        columns.forEach((column, index) => {
          textArea.value = ymlString(column, index);
        });
    });
  });
  textArea.value += `---\n`;
}

dialogueTrigger.addEventListener("click", exportYml, false);

let savePage = page => {
  console.log("save page")
  db.setItem(savedData, _("main").innerHTML);
}
_("[pb-function='save']").addEventListener("click", savePage, false);

let loadSave = page => {
  console.log(db.getItem(savedData))
  _("main").innerHTML = db.getItem(savedData);
  //db.setItem(savedData, _("main").innerHTML);
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
  console.log("Auto saving...")
  autoSave();
}, 5000);