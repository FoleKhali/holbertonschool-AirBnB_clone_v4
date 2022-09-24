document.addEventListener('DOMContentLoaded', function () {
    $(function () {
      const myDict = {};
      $('input[type="checkbox"]').click(function () {
        if ($(this).is(':checked')) {
          myDict[$(this).attr('data-id')] = $(this).attr('data-name');
          console.log($(this).attr('data-id'));
          $('.amenities h4').text(Object.values(myDict).join(', '));
        } else if ($(this).is(':not(:checked)')) {
          delete myDict[$(this).attr('data-id')];
          $('.amenities h4').text(Object.values(myDict).join(', '));
        }
      });
    });
  });