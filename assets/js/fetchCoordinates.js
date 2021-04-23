// https://openweathermap.org/api/geocoding-api
// key = d72a6d46bfeb2c72ac5251b5f7e4df77

// Get the latitude and logitude:
// https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

// Function that calls an API that takes a city name as an input and gives us back the latitude and logitude 
// of the city
function getCoordinates(cityName) {
    var key = "d72a6d46bfeb2c72ac5251b5f7e4df77";
    var locQueryUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
    locQueryUrl = locQueryUrl + cityName + "&limit=1&appid=" + key;
    var lat;
    var lon;

    fetch(locQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (locRes) {
            // If the answer has a length, then we got an object back from the API with information
            // Otherwise the city we are looking for doesn't exist and no code will be further executed
            if (locRes.length) {
                // Store the latitude and logitude of the city and call for a function that gets the weather information
                lat = locRes[0].lat;
                lon = locRes[0].lon;
                getWeather(lat, lon, cityName);
            } else {
                console.error("Invalid input, city does not exist");
            }
        })
        .catch(function (error) {
            console.error(error);
        });

    // console.log(locQueryUrl);
}

