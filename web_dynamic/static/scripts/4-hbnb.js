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
      $('button').click(function () {
        listAmeny = Object.keys(myDict);
        datas = { amenities: listAmeny };
        console.log(listAmeny);
        datas = JSON.stringify(datas);
        $('SECTION.places').empty();
        $.ajax({
          url: 'http://0.0.0.0:5001/api/v1/places_search/',
          contentType: 'application/json',
          type: 'POST',
          data: datas,
          success: function (data) {
            data.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            });
            for (const elem of Object.values(data)) {
              $.ajax({
                url: 'http://0.0.0.0:5001/api/v1/users/' + elem.user_id,
                contentType: 'application/json',
                type: 'GET',
                success: function (dataname) {
                  $('SECTION.places').append(
                    '<article> <div class="title">' +
                      '<h2>' + elem.name + '</h2>' +
                      '<div class="price_by_night">' + elem.price_by_night + '</div> </div>' +
                      '<div class="information"> <div class="max_guest">' +
                      '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
                      '<br />' + elem.max_guest + ' Guests' + '</div>' +
                      '<div class="number_rooms">' +
                      '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
                      '<br />' + elem.number_rooms + ' Bedrooms' + '</div>' +
                      '<div class="number_bathrooms">' +
                      '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
                      '<br />' + elem.number_bathrooms + ' Bathroom' + '</div>' + '</div>' +
                      '<div class="user">' + '<strong>' + 'Owner: ' + dataname.first_name + ' ' + dataname.last_name + '</strong>' + '</div>' +
                      '</div>' + '<div class="description">' + elem.description + '</div>' +
  '</article>'
                  );
                }
              });
            }
          }
        });
      });
    });
  });