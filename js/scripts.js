var Slides = {
  container : $('#slides'),
  totalSlides : '',
  translateAmount : 0,
  currentSlide : 1,
  slideWidth : '',
  previousSlide: $('#previous-slide'),
  nextSlide: $('#next-slide'),


  init : function(totalSlides) {
    var each;

    if ( !totalSlides ) throw new Error('Please pass the total number of slides.');
    Slides.totalSlides = totalSlides;

    Slides.loadContent();

    each = Slides.container.children('div');

    // Determine the width of our canvas
    Slides.slideWidth = each.width() + ( parseInt( each.css('margin-right'), 10 ) );

    Slides.keyPress();
    Slides.buttonClick();

    if (location.hash) {
      Slides.setSlideFromHash();
      Slides.updateHash( Slides.currentSlide );
      Slides.animate();
    }

  },

  setSlideFromHash: function() {
    var i = location.hash.substring(7);
    if (Number(i)) {
      Slides.currentSlide = Number(i);
    }
  },

  pad : function(num, size) {
      var s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
  },

  loadContent : function() {
    Slides.container.hide();
    for ( var i = 1; i < Slides.totalSlides; i++ ) {
      $('<div id="#slide-' + Slides.pad(i, 3) + '"></div>')
        .load('slides/' + Slides.pad(i, 3) + '.html')
        .appendTo(Slides.container);
    }
    Slides.container.show();
  },

  buttonClick : function() {
    Slides.previousSlide.click(function(){
       Slides.prev();
    });

    Slides.nextSlide.click(function(){
       Slides.next();
    });
  },

  keyPress : function() {
    $(document.body).keydown(function(e) {
      // if left or right arrow key is pressed
      if ( e.keyCode === 39 || e.keyCode === 37 ) {
        e.preventDefault();
        ( e.keyCode === 39 ) ? Slides.next() : Slides.prev();
      }
    });
  },

  next : function( ) {
    Slides.translateAmount -= Slides.slideWidth;
    Slides.updateHash( ++Slides.currentSlide );
    Slides.animate();
  },

  prev : function() {
    // No more left to go back.
    if ( Slides.translateAmount === 0 ) return;

    Slides.translateAmount += Slides.slideWidth;
    Slides.updateHash( --Slides.currentSlide );
    Slides.animate();
  },

  animate : function() {
    Slides
    .container
    .children()
       .css( '-webkit-transform', 'translateX(' + Slides.translateAmount + 'px)' );
  },

  updateHash : function( direction ) {
    // Update current Slides and hash.
    location.hash = '#slide-' + Slides.pad(Slides.currentSlide,3);
  }
};

  // All right; let's do this.
Slides.init(10);
