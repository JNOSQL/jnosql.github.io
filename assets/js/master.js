(function($){
  $(document).ready(function(){

    // Change navbar on scroll

    $(window).scroll(function() {
      if ($(document).scrollTop() > 100) {
        $('nav').addClass('shrink');
      } else {
        $('nav').removeClass('shrink');
      }
    });

    // Rolagem macia

    $('a.scroll').click(function(){
      $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
      }, 500);
      return false;
    });

    // Scroll to top

    if ($('#back-to-top').length) {
      var scrollTrigger = 100, // px
      backToTop = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
          $('#back-to-top').addClass('show');
        } else {
          $('#back-to-top').removeClass('show');
        }
      };
      backToTop();
      $(window).on('scroll', function () {
        backToTop();
      });
    }

    // Logo carousel
    $('#myCarousel').carousel({
      interval: 40000
    });

    $('.carousel .item').each(function(){
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      if (next.next().length>0) {
        next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
      }
      else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
    });

  }); // End document ready

})(this.jQuery);
