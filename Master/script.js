// apiKey = '374a9e846e70146d664eee11c467da0b'; 
// pseudo code
// get url for current weather, 5-day forecast and uv index
// create dynamic html and input object data so it presents on page
// city searches are added to history, an li
// current weather includes city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// uv index includes a color that indicates whether the conditions are favorable, moderate, or severe
// 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// clicking on city in history brings up current and future conditions for that city
// upon opening dashboard the last city searched is presented


$(document).ready(function() {
    
    $('#search-button').click(function(){
        var city = $('#search-value').val();
        $("#search-value").val("");
        currentWeather(city);
    });
          
    var history = JSON.parse(window.localStorage.getItem('history')) || [];


    function currentWeather(city) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=374a9e846e70146d664eee11c467da0b",
            dataType: "json",
            success: function(data) {
                // history of search
                if (history.indexOf(city) === -1){
                    history.push(data.name)
                    // console.log(data.name);
                    window.localStorage.setItem('history',JSON.stringify(history))
                }
                // console.log(data);
               
                // console.log(data.name);
                // console.log(data.main.temp);
                // console.log(data.main.humidity);
                // console.log(data.wind.speed);
                // console.log(data.weather[0].icon);
                // clear old search
                $('#today').empty();

                // create html content for current weather
                var currentDate = moment().format('l')
                var card = $('<div>').addClass('card');
                var city = $('<h3>').addClass('card-text').text(data.name + " (" + currentDate + ")");
                // var time = $('h4').addClas('card-text').text(data.list[i].dt_txt);
                var cardBody = $('<div>').addClass('card-body');
                var img = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
                var wind = $('<p>').addClass('card-text').text('Wind Speed: ' + data.wind.speed + 'MPH');
                var humidity = $('<p>').addClass('card-text').text('Humidity: ' + data.main.humidity + '%');
                var temp = $('<p>').addClass('card-text').text('Temperature: ' + data.main.temp + '°F'); 

                //  append to card
                city.append(img);
                cardBody.append(city, temp, humidity, wind);
                card.append(cardBody);
                $("#today").append(card);

                // weatherForecast();
                showUvIndex(data.coord.lat, data.coord.lat);
            }
        });              
    }

    

    function weatherForecast(city) {
        $.ajax({
            type: 'GET',
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + '&units=imperial&appid=374a9e846e70146d664eee11c467da0b',
            dataType: 'json',
            success: function(data) {
                $("#forecast").append($("<div>").text("5 day Forecast: "))
                


            }
        });
    }

  
    function showUvIndex(lat,lon) {

        $.ajax({
            type: 'GET',
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=374a9e846e70146d664eee11c467da0b&lat=" + lat + '&lon=' + lon,
            dataType: 'json',
            success: function(data) {
                
                console.log(data);
                console.log(data.value);
                var uvValue = $('<p>').addClass('card-text').text('UV Index: ');
                var btn = $('<p>').addClass('btn btn-sm').text(data.value);
                
                // change color depending on uv value
                if (data.value <= 2) {
                    btn.css('background-color', 'green');
                    btn.css('margin-bottom', '0');
                }
                else if (data.value >= 8) {
                    btn.css('background-color', 'red');
                    btn.css('margin-bottom', '0');
                }
                else {
                    btn.css('background-color', 'yellow');
                    btn.css('margin-bottom', '0');
                }
                
                $("#today .card-body").append(uvValue.append(btn));
            }
        });
    }

    
})