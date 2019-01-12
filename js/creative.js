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
  $('#requriments-form').submit(function (event) {

    event.preventDefault();

    var $form = $(this);
    term = $form.find("input[name='age']").val(),
      url = 'http://35.237.252.145:3000/requriments';

    var posting = $.post(url, { s: term });

    posting.done(function (data) {
      addDishToTable('period-one-table', data)
    });

  })
})(jQuery);

function addDishToTable(tableID, dietTable) {

  let tableRef = document.getElementById('period-one-table').getElementsByTagName('tbody')[0];

  dietTable.forEach((dishDay, dayIndex) => {
    let newRow = document.getElementById('d'+(dayIndex+1));

    dishDay.forEach(dish => {
      let newDish = newRow.insertCell(-1);
      let dishName = document.createTextNode(dish);
      newDish.appendChild(dishName);
    })
  });

}


