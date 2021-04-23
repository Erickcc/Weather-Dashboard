//Get the weather:
// https://openweathermap.org/api/one-call-api
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// key = d72a6d46bfeb2c72ac5251b5f7e4df77

function getWeather(lat, lon, cityName) {
    var key = "d72a6d46bfeb2c72ac5251b5f7e4df77";
    var locQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?";
    // Input the latitude, logitude, define language as english, set units as metric and exclude minutely and hourly data, we only want daily
    locQueryUrl = locQueryUrl + "lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + "&lang=en" + "&units=metric" + "&appid=" + key;
    // Create an array that we are going to use to store the data
    var weatherData = new Array();


    fetch(locQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (locRes) {
            // Turn the previously created array into a matrix
            weatherData = createArray(weatherData);
            // Take only the important bits out of the API and store it in a matrix
            weatherData = getUsefulData(locRes, weatherData);
            // Call a function that renders the weather information
            renderInformation(weatherData, cityName);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function getUsefulData(locRes, weatherData) {
    //Get weather info
    //Values gathered:
    // [0] - Icon
    // [1] - temp
    // [2] - wind
    // [3] - humidity
    // [4] - uv index
    for (var i = 0; i < 6; i++) {
        // Commented section that can be used to take the current weather instead of today's weather
        // if (i === 0) {
        //     weatherData[i][0] = locRes.current.weather[0].icon;
        //     weatherData[i][1] = "Temp: " + locRes.current.temp + "°C";
        //     weatherData[i][2] = "Wind: " + locRes.current.wind_speed + " KMH";
        //     weatherData[i][3] = "Humidity: " + locRes.current.humidity + " %";
        //     weatherData[i][4] = locRes.current.uvi;
        // } else {
        //     weatherData[i][0] = locRes.daily[i - 1].weather[0].icon;
        //     weatherData[i][1] = "Temp: " + locRes.daily[i - 1].temp.day + "°C";
        //     weatherData[i][2] = "Wind: " + locRes.daily[i - 1].wind_speed + " KMH";
        //     weatherData[i][3] = "Humidity: " + locRes.daily[i - 1].humidity + " %";
        //     weatherData[i][4] = locRes.daily[i - 1].uvi;
        // }
        
        // Get the daily weather information of today and the next 5 days
        weatherData[i][0] = locRes.daily[i].weather[0].icon;
        weatherData[i][1] = "Temp: " + locRes.daily[i].temp.day + "°C";
        weatherData[i][2] = "Wind: " + locRes.daily[i].wind_speed + " KMH";
        weatherData[i][3] = "Humidity: " + locRes.daily[i].humidity + " %";
        weatherData[i][4] = "UV Index: " + locRes.daily[i].uvi;
    }
    return weatherData;
}

// Create a matrix of 5 rows and 6 columns (6 days, 5 retrieved different data for each day)
function createArray(weatherData) {
    weatherData.length = 6;
    for (var i = 0; i < 6; i++) {
        weatherData[i] = new Array();
        weatherData[i].length = 5;
    }
    return weatherData;
}