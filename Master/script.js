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
                    console.log(data.name);
                    window.localStorage.setItem('history',JSON.stringify(history))

                    addRow(city);
                }

                console.log(data.name);
                console.log(data.main.temp);
                console.log(data.main.humidity);
                console.log(data.wind.speed);
            
                // create html content for current weather
                var card = $('<div>').addClass('card')
                var city = $('h3').addClass()
            }
        });              
    }

    function weatherForecast(city) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=374a9e846e70146d664eee11c467da0b",
            dataType: "json",
            success: function(data) {
                // overwrite existing search content 
            
                // loop over all forecasts (by 3-hour increments)
            
                // merge and add to page   
            }
        });
    }

    function getUvIndex(lat,lon) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=374a9e846e70146d664eee11c467da0b&lat=" + lat + "&lon=" + lon,
            dataType: "json",
            success: function(data) {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                // add uv index to card
                // change color of uv index based on number, green yellow or red
            }
        });
    }
})