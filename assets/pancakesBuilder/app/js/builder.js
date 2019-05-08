// Query shorthand:
// _(".element");
// _All(".elements");

// TEST MODE 
_("html").classList.add("editing--mode");
_(".drawer").classList.add("drawer--fixed-header", "drawer--is-visible");

let dataSections = "main [data-pb-template-level='section']";
let dataRows = "main [data-pb-template-level='row']"
let dataColumns = "main [data-pb-template-level='column']";

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
  dragDrop();
  
}).then(function() {
  hoverState();
}).then(function() {
  dragOrder();
});

function hoverState() {
  _All("main [data-pb-template-level='section'], main [data-pb-template-level='row'], main [data-pb-template-level='column']").forEach((item, index) => {
  
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
        node.innerText = "Move Me";
        item.appendChild(node);
      }

      if (event.target === item) {
        activeHover(event);
      }
    }
    
    item.addEventListener("mouseover", createHandle, false);
    item.addEventListener("mouseleave", inactiveHover, false);

  });
}


function dragDrop() {
  // Elements that are created on drag start in the drawer sidebar
  let dragMenu = document.querySelector(".drawer .drawer__body");
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
  let sections = _All("main [data-pb-template-level='section']");
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

  
  sections.forEach((section, index) => {
    let keys = Object.entries(section.dataset);

    keys.forEach((key, i) => {
      if (i ===0) {
        prefix = "- ";
      } else {
        prefix = "";
      }
      
      
      const camelToDash = str => str
      .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
      .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`)

      let newkey = camelToDash(key[0]).replace("pb-", "");
      //let newkey = key[0].replace("pb", "").toLowerCase();

      yml += `${indent}${prefix}${newkey}: ${key[1]}\n`; 
      
      
    });
    rows = section.querySelectorAll(dataRows);
    rows.forEach((row, index) => {
      console.log(row);
    });

  });
  textArea.value = yml;
}

dialogueTrigger.addEventListener("click", exportYml, false);