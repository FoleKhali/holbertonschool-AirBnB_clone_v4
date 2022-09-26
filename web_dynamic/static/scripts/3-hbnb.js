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
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }

    });
     
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: '{}',
      dataType: 'json',
      contentType: 'application/json',
      // On success we call funcition "data" y hacemos un for para "appendiar"
      // toda la info que haya en "data" que seria todos los places
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          $('section.places').append(`
          <article>
              <div class="title_box">
                  <h2>${data[i].name}</h2>
                  <div class="price_by_night">${data[i].price_by_night}</div>
              </div>
              <div class="information">
                  <div class="max_guest"> ${data[i].max_guest} Guest</div>
                      <div class="number_rooms"> ${data[i].number_rooms} Bedrooms</div>
                      <div class="number_bathrooms"> ${data[i].number_bathrooms} Bathrooms</div>
                  </div>
                  <div class="user">
                  </div>
                      <div class="description">${data[i].description}</div>
          </article>`);
        }
      }
    });
  });