window.addEventListener('DOMContentLoaded', () => {
  pancakes();
});

// Query shorthand:
// _(".element");
// _All(".elements");

let pancakes = () => {
console.log("loaded pancakesBuilder")

// TEST MODE //
//_("html").classList.add("editing--mode");
//_(".pb--drawer").classList.add("pb--drawer--fixed-header", "pb--drawer--is-visible");
///////////////

// Draggable elements will always use data-pb-template-level
let dataSections = "main [data-pb-template-level='1']", dataRows = "main [data-pb-template-level='2']", dataColumns = "main [data-pb-template-level='3']", dataElements = "main [data-pb-template-level='4']";
const dataSelect = "pb--fa-move", moveHandle = "pb-move", deleteHandle = '[pb-function="delete-item"]', editHandle = "pb--fa-edit", hoverMenu = "pb--hover-menu", editHover = "pb--edit-hover", editClick = "pb-editing", dialogueTrigger = document.querySelector('[pb-function="exportYml"]'), modalSave = ".pb--modal--dialogue.pb--modal--is-visible [pb-function='save']", drawerTitle = "pb--drawerTitle", responsiveMode = "data-pb-responsive-mode", iFrame = _("iframe.pbResponsiveFrame");
let modal = document.querySelector('.pb--modal');
_("html").setAttribute(responsiveMode, "desktop"), paramContainer = document.querySelector('[pb-content="params"]');

//local storage
const db = localStorage, pageId = window.location, savedData = `${pageId}.savedData`, autoSavedData = `${savedData}.auto`, responsiveAttribute = _("html").getAttribute(responsiveMode)
// Modes
if (!responsiveAttribute) {
  _("html").setAttribute(responsiveMode, "desktop")
};


let cleanMain = () => {
  console.log("clean main")
  _("body").appendChild(_(".builderUIComponents"));
  _("body").appendChild(_(".builderUIComponents, .pb-template-contentWrapper, .pb-responsive-wrapper"));
  _All("main script").forEach((element, index) => {
    _("main").parentNode.appendChild(element);
  });
  _All("main link, main style").forEach((element, index) => {
    _("head").appendChild(element);
    //console.log(element)
  });
  _All(".pb--modal").forEach((element, index) => {
    _("body").appendChild(element);
  });  
  _All(`.pb-template-contentWrapper [data-pb-template-level^='row'], .pb-template-contentWrapper [data-pb-template-level^='column'], .pb-template-contentWrapper [data-pb-template-level^='element']`).forEach((element, index) => {
    _(".pb-template-contentWrapper").appendChild(element);
  });
  _("main").setAttribute("data-pb-template-level", "0");
}
(function runPromises() {
  var promise1 = new Promise(function(resolve, reject) {
    resolve(cleanMain());
  });
  promise1.then(function() {
    loadAutoSave();
  }).then(function() {
    dragDrop();
  }).then(function() {
    hoverState();
  }).then(function() {
    //dragOrder();
  });
})();

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
        node.innerHTML = `<svg class="icon-arrows pb--fa-move ${moveHandle}" pb-move="true"><use xlink:href="/images/icons.svg#icon-arrows"></use></svg><svg class="icon-pencil ${editHandle}" pb-function="edit-item"><use xlink:href="/images/icons.svg#icon-pencil"></use></svg><svg class="icon-trash ${editHandle}" pb-function="delete-item"><use xlink:href="/images/icons.svg#icon-trash"></use></svg>`;
        item.appendChild(node);

        item.querySelector(`[pb-function='edit-item']`).addEventListener("click", editItem, false);

        let deleteItem = btn => {
          let thisItem = getClosest(btn.currentTarget);
          thisItem.parentNode.removeChild(thisItem);
        }
        _(deleteHandle).addEventListener("click", deleteItem, false);
        //item.addEventListener("click", editItem, false);
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
let getLevel = item => {
  let level = item.getAttribute("data-pb-template-level");
  //console.log(level);
  if (level) {
    return level;
  } else {
    return "Que?";
  }
}

let getType = item => {
  let type = `element-${item.getAttribute("data-pb-element-type")}`;
  //console.log(level);
  if (type) {
    return type;
  } else {
    return "Que?";
  }
}

// add some features for all modal windows

// Get the nearest editable parent of the selected handle
let getClosest = (elem, attribute) => {
  let selector = "data-pb-template-level";
  if (attribute) {
    selector = attribute;
  }
  //console.log(elem);
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.hasAttribute(selector) ) return elem;
	}
	return null;
};

let getClosestValue = (elem, attribute) => {
  let selector = "data-pb-template-level";
  if (attribute) {
    selector = attribute;
  }
  //console.log(elem);
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.hasAttribute(selector) ) return elem.getAttribute(selector);
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
  let allGroups = _All(".pb--drawer [data-pb-support-mode]");

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
let setSupportedClasses = (level, type) => {
  console.log("supported classes", level, type);
  let allGroups = _All(".pb--drawer [pb-supports]");
  allGroups.forEach( group => {
    //v.includes(value))
    console.log("supported classes", level, type);
    if (group.getAttribute("pb-supports").includes(level) || group.getAttribute("pb-supports").includes(type) || group.getAttribute("pb-supports") === "global") {
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
      let contents = iContent.querySelectorAll(".builderUIComponents, .pb--modal, .pb-template-contentWrapper, iframe.pbResponsiveFrame");

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

let editItem = editBtn => {
  // Get the item (section, row, column)
  _All(`${dataSections}, ${dataRows}, ${dataColumns}, ${dataElements}`).forEach((level, index) => {
    level.setAttribute(editClick, "0")
  });
  let item = getClosest(editBtn.currentTarget);
  item.setAttribute(editClick, "1")
  _(`.${drawerTitle}`).innerText = `${getLevel(item)} | ${item.id}`;

  setSupportedClasses(getLevel(item), getType(item));

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

  let tabSections = _All(".pb--drawer .pb--tabs__panels section");
  let tabs = _All(".pb--drawer .pb--tabs .pb--tab-title");

  tabSections.forEach(tabSection => {
    tabSection.classList.remove("pb--tabs__panel--selected");
    if (!tabSection.classList.contains("pb--tab__panel--is-hidden") ) {
      tabSection.classList.add("pb--tab__panel--is-hidden");
    }
  })

  // Need to fix tab active state
  // Set aria-selected to true/false and selected class
  tabs.forEach(tab => {
    tab.classList.remove("pb--tabs__control--selected");
    if (!tab.classList.contains("pb--tab__panel--is-hidden") ) {
      tab.classList.add("pb--tab__panel--is-hidden");
    }
  });

  _('.pb--drawer .pb--tabs__panels [pb-function="edit-item" ]').classList.add("pb--tabs__panel--selected");

  let allOptions = _All(".pb--drawer input, .pb--drawer select"), value, v, name;

  //let keys = Object.entries(item.dataset);
  allOptions.forEach( input => {
    value = input.value;

    if (input.tagName === "INPUT") {
    input.addEventListener("click", (e) => {
      //console.log("click", input.tagName, item)
      setClasses(input, item, allOptions);
    }, false);
    } else if (input.tagName === "SELECT") {
      input.addEventListener("change", (e) => {
        //console.log("changed, select", input)
        if (input.getAttribute("pb-set-attribute")) {
          setAttribute(input, input.getAttribute("pb-set-attribute"), item);
        }
        
      }, false);
    }

    v = getClasses(item);
    
    if (v.includes(value)) {
      //console.log(value)
      input.checked = true;
    } else {
      input.checked = false;
    }
  })
}
let updateIframe = () => {
  let iContent = iFrame.contentWindow.document;
  let html = iContent.querySelector("html")
  let main = document.querySelector("main").innerHTML;

  iContent.querySelector("main").innerHTML = document.querySelector("main").innerHTML;
  
  iContent.querySelector(".pageCss").innerHTML = document.querySelector("style.pageCss").innerHTML;
  console.log("doc", document.querySelector(".pageCss"), "iframe", iFrame.querySelector(".pageCss"))
}
// After selection an option in the drawer, modify the HTML with the newly selected classes
let setAttribute = (input, attrTarget, item) => {
  //console.log("set attr", input.value, attrTarget, item)
  if (item.getAttribute("data-pb-template", "image") && attrTarget === "data-pb-size") {
    item.setAttribute(attrTarget, input.value)
    let image = item.querySelector("img");
    image.src = image.getAttribute(`${input.value}`);
  }
  //updateIframe();
}
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
  //updateIframe();
}
let dragCreate = (el) => {
  let pbTemplateAdd = el.getAttribute("data-pb-template-add");
  let pbCreateContent = _(".pb-template-contentWrapper");
  let pbTemplate = pbCreateContent.querySelector(`[data-pb-template^='${pbTemplateAdd}']`);
  let pbReplace = pbTemplate.cloneNode(false);
  if (parseFloat(el.getAttribute("data-pb-template-level")) >= 4) {
    pbReplace = pbTemplate.cloneNode(true);
  }
  console.log("after", pbReplace, el.parentNode)
  el.parentNode.replaceChild(pbReplace, el);
  //drake.containers.push(pbReplace);
  //console.log(drake.containers);
  hoverState();
  //dragOrder();
}

function dragDrop() {
  let valueToNumber = (element, attribute) => {
    return parseFloat(getClosestValue(element, attribute));
  }
  let level = (e) => {
    return e.getAttribute("data-pb-template-level");
  }
  // Elements that are created on drag start in the drawer sidebar
  let dragMenu = document.querySelector('.pb--drawer .pb--drawer__body [pb-function="item-drawer"]');   
  let containers = [];
  let hLevel, elementLevel;

  let all = _All("[data-pb-template-level]");
  //console.log("all", all)

  all.forEach((item) => {
    let handler = (e) => {
      //console.log("e", e, e.target, e.currentTarget)
        //console.log("e", e.target.getAttribute("data-pb-template-level"))
        hLevel = (valueToNumber(e.target, "data-pb-template-level") - 1)
    }
    item.addEventListener("mousedown", handler, false)
  })
  let options = {
    moves: function (el, target, handle) {
      console.log("MOVING....container", el, target, handle)
      let cLevel = valueToNumber(target, "data-pb-template-level");
      //return getClosestValue(handle, "data-pb-template-level") !== "1";
      if ((handle.closest("[pb-move='true']", true))) {
        drake.options.copy = false;
        return true;
      } else if (handle.classList.contains("pb--fa-edit")) {
        drake.options.copy = true;
        drake.options.copySortSource = true;
        return true;
      } else if (handle.tagName === "BUTTON") {
        console.log("source drag menu")
        drake.options.copy = true;
        drake.options.copySortSource = false;
        return true;
      }
    },
    isContainer: function (el) {
      // Dynamically set containers based on the handle closest level - 1
        return parseFloat(el.getAttribute("data-pb-template-level")) === hLevel || el === dragMenu;
    },
    copySortSource: function (el, source) {
      return source !== dragMenu;
    },
    copy: function (el, source) {
      return source === dragMenu;
    }
  };
  

  let drake = dragula(containers, options);
  //drake.containers.push(_("main"));
  drake.options = options;
  console.log("drake,", drake)

  drake.on('drag', function (el, source) {
    //drake.containers = [].slice.apply(document.querySelectorAll("main [data-pb-template-level='1']")).concat(dragMenu);
    el.classList.add("in-transit");
  }).on('drop', function (el, target, source) {
    el.classList.remove("in-transit");
    if (target === null) {
      return false;
    } else if (source === dragMenu) {
      console.log("source", source)
      dragCreate(el)
    }
    // Regenerate the node tree for hver boxes
    hoverState();
  });

  let loadSave = page => {
    //console.log(db.getItem(savedData))
    _("main").innerHTML = db.getItem(savedData);
    //db.setItem(savedData, _("main").innerHTML);
    //drake.destroy();
  
    runPromises();
    _("[pb-function='load']").removeEventListener("click", loadSave, false);
  }
  _("[pb-function='load']").addEventListener("click", loadSave, false);
}

// function dragOrder() {
//   let containers = "";
//   //Reorder sections with drag and drop using a handle
//   dragula([_("main")], {
//     moves: function (el, container, handle) {
//       return handle.getAttribute(moveHandle);
//   },
//     invalid(el, handle) {
//       return (el.getAttribute("data-pb-template-level") === "row" || el.getAttribute("data-pb-template-level") === "column" || el.getAttribute("data-pb-template-level") === "element" );
//     }
//   }).on('out', function (el) {
//     el.classList.remove("in-transit");
//   });

//   // add existing sections as an array
//   containers = [].slice.call(document.querySelectorAll("[data-pb-template-level='1']"));
  
//   //Reorder rows with drag and drop using a handle
//   dragula(containers, {
//     moves: function (el, container, handle) {
//       return handle.getAttribute(moveHandle);
//   },
//     invalid(el, handle) {
//       // If the selected element className is column, 
//       //    dont allow the row to be dragged. This will allow 
//       //    the column to be dragged separate from the row. 
//       return (el.getAttribute("data-pb-template-level") === "column" || el.getAttribute("data-pb-template-level") === "element" );
//     }
//   }).on('drag', function (el) {
//       console.log("elements: ", el)
//       el.classList.add("in-transit");
//   }).on('out', function (el) {
//       el.classList.remove("in-transit");
//   });

//   containers = [].slice.call(document.querySelectorAll("[data-pb-template-level='2']"));

//   //Reorder rows with drag and drop using a handle
//   dragula(containers, {
//     moves: function (el, container, handle) {
//       return handle.getAttribute(moveHandle);
//     },
//     direction: 'horizontal',
//     invalid(el, handle) {
//       return (el.getAttribute("data-pb-template-level") === "element" );
//     },
//     }).on('out', function (el) {
//       el.classList.remove("in-transit");
//     });

//   containers = [].slice.call(document.querySelectorAll("[data-pb-template-level='3']"));

//   //Reorder rows with drag and drop using a handle
//   dragula(containers, {
//     moves: function (el, container, handle) {
//       return handle.getAttribute(moveHandle);
//     },
//     direction: 'vertical',
//     // invalid(el, handle) {
//     //   return (el.classList.contains("element") );
//     // },
//     }).on('out', function (el) {
//       el.classList.remove("in-transit");
//     });
//   }


//let dialogue = document.querySelector(".modal--dialogue");



let savePage = page => {
  console.log("save page")
  db.setItem(savedData, _("main").innerHTML);
}
_("[pb-function='save']").addEventListener("click", savePage, false);

let autoSave = page => {
  //db.setItem(autoSavedData, _("main").innerHTML);
}
let loadAutoSave = page => {
  if (db.getItem(autoSavedData) !== null && db.getItem(autoSavedData) !== undefined) {
    _("main").innerHTML = db.getItem(autoSavedData);
  }
}
// Auto save
setInterval(() => {
  //console.log("Auto saving...")
  autoSave();
}, 5000);

}