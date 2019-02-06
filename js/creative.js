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
    showDayTable();
    var $form = $(this);
    uAge = $form.find("input[name='age']").val(),
    uWeigth = $form.find("input[name='age']").val(),
    uPA = $form.find("select[name='physical-activity']").val(),
    uSexChoice = $form.find("input[name='sexChoice']").val();

    getPreferences();
    
    var url = 'http://35.237.252.145:3000/requriments';

    if(uSexChoice == 0 && uWeigth > 75){
      uWeigth = 75;
    }

    var posting = $.post(url, { age: uAge , weigth: uWeigth, pa: uPA, sex: uSexChoice });

    posting.done(function (data) {
      addDishToTable(data)
    });

  })
})(jQuery);

function addDishToTable(dietTable) {

  let tableRef = document.getElementById('period-one-table').getElementsByTagName('tbody');

  dietTable.forEach((dishDay, dayIndex) => {
    let newRow = document.getElementById('d'+(dayIndex+1));

    if(newRow.childElementCount > 1){

      dishDay.forEach((dish,index) => {
        var changingCell = newRow.getElementsByTagName('td')[index];
        changingCell.innerHTML=dish;
      })

    } else {
      dishDay.forEach(dish => {

        let newDish = newRow.insertCell(-1);
        let dishName = document.createTextNode(dish);
        newDish.appendChild(dishName);
      })
    }

    
  });

  $('#t1').show();
}

function getPreferences(){
  var $form = $(this);

  var prefs = {
    pKurczak : $form.find("input[name='pKurczak']").val(),
    pWieprzowina : $form.find('#pref2').is(':checked') ,
    pJajka : $form.find("input[name='pJajka']").is(':checked') ? 1 : 0,
    pPieczywoRazowe : $form.find("input[name='pPieczywoRazowe']").is(':checked'),
    pPieczywoPszenne : $form.find("input[name='pPieczywoPszenne']").is(':checked'),
    pSłodycze : $form.find("input[name='pSłodycze']").is(':checked'),
    pMusli : $form.find("input[name='pMusli']").is(':checked'),
    pLody : $form.find("input[name='pLody']").is(':checked')
  }
}

function showDayTable(id){
  $('#t1,#t2,#t3,#t4,#t5,#t6').hide();
  $(id).show();
}

