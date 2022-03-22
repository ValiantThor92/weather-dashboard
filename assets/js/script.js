var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var cityTitleEl = document.querySelector("#current-weather-title");

var getCityWeather = function (city) {
    // openweather api url
    var apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a42b1bffc45c35fcb28a1fcc1fc29685&units=imperial";
    // make a request to url
    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
            displayWeather(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function (error) {
    alert("Unable to connect to OpenWeather");
    });
};

var displayWeather = function (weatherData) {
      // format and display data
  $("#current-weather").addClass("border border-secondary border-2");
  $("#current-weather-title").text(weatherData.name + " (" + dayjs(weatherData.dt * 1000).format("MM/DD/YYYY") + ") ")
  .append(`<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`);

    // current temperature
  $("#current-weather-temp").text("Temperature: " + weatherData.main.temp.toFixed(1) + "°F");
    // current  humidity
  $("#current-weather-humidity").text("Humidity: " + weatherData.main.humidity + "%");
    // current  wind speed
  $("#current-weather-wind").text("Wind Speed: " + weatherData.wind.speed.toFixed(1) + " mph");

    // lat&lon to get uvi and 5day forecast
  fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + 
  weatherData.coord.lat + "&lon=" + 
  weatherData.coord.lon + "&appid=a42b1bffc45c35fcb28a1fcc1fc29685&units=imperial")
  .then(function (response) {
    response.json().then(function (data) {
      // display the uv index value
      $("#current-weather-uvi").text("UVI Index: " + data.current.uvi);

        // display 5-day forecast
        displayForecast(data);
    });

  });


};

// event handlers
$("#search").on("click", formSubmitHandler);

var displayForecast = function (data) {
    
}