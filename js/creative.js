(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

})(jQuery); // End of use strict

(function ($) {
  reqsForm = document.querySelector('#requriments-form')
  if (reqsForm.addEventListener) {
    reqsForm.addEventListener("submit", function (e) {

      var formValues = $(reqsForm).serializeArray();
      console.log(formValues);
      e.preventDefault();

    }, false);
  }


})(jQuery);


