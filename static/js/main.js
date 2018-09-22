$('.accordion-title').click(function(e) {
    if($(e.target).is('.active')) {
      closeAccordion();
    } else {
      closeAccordion();
      $(this).addClass('active');
      $('.accordion ' + $(this).attr('href')).slideDown(400).addClass('open');
    }
    e.preventDefault();
  });
  
  function closeAccordion() {
    $('.accordion .accordion-title').removeClass('active');
    $('.accordion .accordion-content').slideUp(400).removeClass('open');
  }
$(document).ready(function(){
    var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};
    var hamburgers = document.querySelectorAll(".hamburger");
    var mobilemenu = document.querySelectorAll("#mobile-menu");
    if (hamburgers.length > 0) {
      forEach(hamburgers, function(hamburger) {
        hamburger.addEventListener("click", function() {
          this.classList.toggle("is-active");
          $("#mobile-menu").toggle("is-active");
        }, false);
      });
    }
});