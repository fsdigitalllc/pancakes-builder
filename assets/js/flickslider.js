(function(){
$('.flick-slider').flickity({
  // options
  //adds class to groups of cells for styling
  //could make cells bigger etc.
  groupCells: false,
  //sticky scroll
  freeScroll: false,
  prevNextButtons: true,
  pageDots: false,
  cellAlign: 'left',
  adaptiveHeight: true,
  setGallerySize: true,
  //infinite scroll
  wrapAround: true,
  //add a number instead of true for control over time
  autoPlay: false,
  pauseAutoPlayOnHover: true,
  //enable lightbox on click. DO NOT USE FOR NOW
  fullscreen: false,
  lazyLoad: true
  
  });
});