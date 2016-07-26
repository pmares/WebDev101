var Slides = {
  container : $('#slides'),
  totalSlides : 0,
  currentSlide : 1,
  previousSlide: $('#previous-slide'),
  nextSlide: $('#next-slide'),

  init : function(totalSlides) {

    if ( !totalSlides ) throw new Error('Please pass the total number of slides.');

    Slides.totalSlides = totalSlides;
    Slides.loadContent();

    var each = Slides.container.children('div');

    Slides.keyPress();
    Slides.buttonClick();

    if (location.hash) {
      Slides.setSlideFromHash();
      Slides.updateHash( Slides.currentSlide );
    }

    Slides.animate();

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

    for ( var i = 1; i <= Slides.totalSlides; i++ ) {
      var slide_number = Slides.pad(i, 3);
      var slide_file = 'slides/' +  slide_number + '.html'
      var slide = $('<div class="slide" id="slide-' + slide_number + '"></div>')
        .load(slide_file);
      slide.appendTo(Slides.container);
      slide.hide();
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
    if ( Slides.currentSlide >= Slides.totalSlides) return;
    Slides.updateHash( ++Slides.currentSlide );
    Slides.animate();
  },

  prev : function() {
    if ( Slides.currentSlide <= 1 ) return;
    Slides.updateHash( --Slides.currentSlide );
    Slides.animate();
  },

  animate : function() {
    $('.slide').hide();
    var slide_number = Slides.pad(Slides.currentSlide, 3);
    this.replaceCSS(slide_number);
    $('#slide-' + slide_number).show();
  },

  replaceCSS: function(slide_number) {
    var oldLink = document.getElementById("slide-style");

    var newLink = document.createElement("link");
    newLink.setAttribute("id", "slide-style");
    newLink.setAttribute("rel", "stylesheet");
    newLink.setAttribute("type", "text/css");
    newLink.setAttribute("href", "css/" + slide_number + ".css");

    document.getElementsByTagName("head").item(0).replaceChild(newLink, oldLink);

  },

  updateHash : function(slideNumber) {
    // Update current Slides and hash.
    location.hash = '#slide-' + Slides.pad(slideNumber, 3);
  }
};

  // All right; let's do this.
Slides.init(11);
