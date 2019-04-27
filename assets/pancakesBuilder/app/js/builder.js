// Query shorthand:
// _(".element");
// _All(".elements");

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

  
}

var promise1 = new Promise(function(resolve, reject) {
  //resolve(moveFromMain());
});

promise1.then(function() {
  listeners();
}).then(function() {

});

function listeners() {
  console.log("listeners activated");
_(".toggleDrawer").addEventListener("click", () => {
    //_('html').classList.toggle("editing--mode");
  });
  _(".drawer__close-btn").addEventListener("click", () => {
    //_('html').classList.toggle("editing--mode");
  });
}

function closeCallback() {
  // in drawer.js, add callback function on close or open to do things like save data
}
