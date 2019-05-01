// Query shorthand:
// _(".element");
// _All(".elements");

// TEST MODE 
_("html").classList.add("editing--mode");
_(".drawer").classList.add("drawer--fixed-header", "drawer--is-visible");

// move UI Outside of main
function moveFromMain(){
  console.log(_(".pb-template-contentWrapper"));
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
  _All(`.pb-template-contentWrapper [pb-template-level^='row']`).forEach((element, index) => {
    _(".pb-template-contentWrapper").appendChild(element);
  });
  _All(`.pb-template-contentWrapper [pb-template-level^='column']`).forEach((element, index) => {
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
  _All("[pb-template-level='section'], [pb-template-level='row'], [pb-template-level='column']").forEach((item, index) => {
  
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
  //Create elements, set the dragMenu as source
  // let findContent = button.getAttribute("pb-template-add");
  // let theContent = pbCreateContent.querySelector(`[pb-template^='${findContent}']`);
  // The createContent wrapper (on drag, pb-templates in this section are referenced)
  
  let dragMenu = document.querySelector(".drawer .drawer__body");
  //let pbCreateContentButtons = dragMenu.querySelectorAll("[pb-template-add]");
  let containers = Array.prototype.slice.call(_("main"));
  //let containers = [dragMenu, _("main")];
  console.log(containers);
  //[dragMenu, containers], 
  
  var createOnDrop = dragula([dragMenu, containers], {
    isContainer: function (el) {
      return false; // only elements in drake.containers will be taken into account
    },
    moves: function (el, source, handle, sibling) {
      if (handle.getAttribute("pb-template-level") && source === dragMenu) {
        return true; // elements are always draggable by default
      }
    },
    accepts: function (el, target, source, sibling) {
      if (el.getAttribute("pb-template-level") === "section" && target.classList.contains("site-main")) {
        return true; // elements can be dropped in any of the `containers` by default
      } else if (el.getAttribute("pb-template-level") === "row" && target.getAttribute("pb-template") === "section") {
        return true; // elements can be dropped in any of the `containers` by default
      } else if (el.getAttribute("pb-template-level") === "column" && target.getAttribute("pb-template") === "row") {
        return true; // elements can be dropped in any of the `containers` by default
      }
    },
    invalid: function (el, handle) {
      return false;
      //return false; // don't prevent any drags from initiating by default
    },
    direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
    copy: true,                       // elements are moved by default, not copied
    copySortSource: true,             // elements in copy-source containers can be reordered
    revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
    removeOnSpill: false,              // spilling will `.remove` the element, if this is true
    //mirrorContainer: document.body,    // set the element that gets mirror elements appended
    ignoreInputTextSelection: true     // allows users to select input text, see details below
  });

  createOnDrop.containers.push(_("main"));

  createOnDrop.on('drag', function (el) {
    console.log("moving");
    console.log(containers);
    console.log(el);
    el.classList.add("in-transit");
  }).on('out', function (el) {
    el.classList.remove("in-transit");
    //dragCreate(el);
  }).on('drop', function (el, container, source) {
    if (source === dragMenu) {
     dragCreate(el, createOnDrop, containers); 
    }
  });

  
}

function dragOrder() {
  let containers = Array.prototype.slice.call(_("main"));
  var reorder = dragula([containers], {
    isContainer: function (el) {
      return false; // only elements in drake.containers will be taken into account
    },
    moves: function (el, source, handle, sibling) {
      if (handle.classList.contains("fa-move")) {
        return true; // elements are always draggable by default
      }
    },
    accepts: function (el, target, source, sibling) {
      if (el.getAttribute("pb-template-level") === "section" && target.classList.contains("site-main")) {
        return true; // elements can be dropped in any of the `containers` by default
      } else if (el.getAttribute("pb-template-level") === "row" && target.getAttribute("pb-template") === "section") {
        return true; // elements can be dropped in any of the `containers` by default
      } else if (el.getAttribute("pb-template-level") === "column" && target.getAttribute("pb-template") === "row") {
        return true; // elements can be dropped in any of the `containers` by default
      }
    },
    invalid: function (el, handle) {
      return false;
      //return false; // don't prevent any drags from initiating by default
    },
    direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
    copy: true,                       // elements are moved by default, not copied
    copySortSource: true,             // elements in copy-source containers can be reordered
    revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
    removeOnSpill: false,              // spilling will `.remove` the element, if this is true
    //mirrorContainer: document.body,    // set the element that gets mirror elements appended
    ignoreInputTextSelection: true     // allows users to select input text, see details below
  });

  reorder.containers.push(_("main"));

  reorder.on('drag', function (el) {
    console.log("moving");
    console.log(containers);
    console.log(el);
    el.classList.add("in-transit");
  }).on('out', function (el) {
    el.classList.remove("in-transit");
  }).on('drop', function (el, container, source) {
    hoverState();
  });
  
}

function dragCreate (el, drake, containers) {
  let pbTemplateAdd = el.getAttribute("pb-template-add");
  let pbCreateContent = _(".pb-template-contentWrapper");
  let pbTemplate = pbCreateContent.querySelector(`[pb-template^='${pbTemplateAdd}']`);
  //console.log(pbTemplate);
  let pbReplace = pbTemplate.cloneNode(true);
  pbReplace.innerHTML = pbReplace.innerHTML + `<h1 class="fa-move">${pbTemplateAdd}</h1>`;
  el.parentNode.replaceChild(pbReplace, el);
  drake.containers.push(pbReplace);
  console.log(drake.containers);
  //reorder();
  hoverState();
  dragOrder();
}