$(document).ready(function(){
  //create an accordian
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


});