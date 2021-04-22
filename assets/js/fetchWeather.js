//Get the weather:
// https://openweathermap.org/api/one-call-api
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// key = d72a6d46bfeb2c72ac5251b5f7e4df77

function getWeather(lat, lon) {
    var key = "d72a6d46bfeb2c72ac5251b5f7e4df77";
    var locQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?";
    locQueryUrl = locQueryUrl + "lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + "&lang=en" + "&units=metric" + "&appid=" + key;
    var weatherData = new Array();


    fetch(locQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (locRes) {
            console.log(locRes);
            weatherData = createArray(weatherData);
            weatherData = getUsefulData(locRes, weatherData);
            renderInformation(weatherData);
        })
        .catch(function (error) {
            console.error(error);
        });





    console.log(locQueryUrl);
}

function getUsefulData(locRes, weatherData) {
    //Get weather info
    //Values needed:
    // Icon
    // temp
    // wind
    // humidity
    // uv index
    for (var i = 0; i < 6; i++)
        if (i === 0) {
            weatherData[i][0] = locRes.current.weather[0].icon;
            weatherData[i][1] = "Temp: " + locRes.current.temp + "°C";
            weatherData[i][2] = "Wind: " + locRes.current.wind_speed + " KMH";
            weatherData[i][3] = "Humidity: " + locRes.current.humidity + " %";
            weatherData[i][4] = locRes.current.uvi;
        } else {
            weatherData[i][0] = locRes.daily[i - 1].weather[0].icon;
            weatherData[i][1] = "Temp: " + locRes.daily[i - 1].temp.day + "°C";
            weatherData[i][2] = "Wind: " + locRes.daily[i - 1].wind_speed + " KMH";
            weatherData[i][3] = "Humidity: " + locRes.daily[i - 1].humidity + " %";
            weatherData[i][4] = locRes.daily[i - 1].uvi;
        }
    return weatherData;
}

function createArray(weatherData) {
    weatherData.length = 6;
    for (var i = 0; i < 6; i++) {
        weatherData[i] = new Array();
    }
    return weatherData;
}