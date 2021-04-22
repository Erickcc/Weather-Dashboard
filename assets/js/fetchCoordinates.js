// https://openweathermap.org/api/geocoding-api
// key = d72a6d46bfeb2c72ac5251b5f7e4df77

// Get the latitude and logitude:
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

function getCoordinates(cityName, newCity) {
    var key = "d72a6d46bfeb2c72ac5251b5f7e4df77";
    var locQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
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
            if (locRes.length) {
                // console.log(locRes);
                // console.log(locRes.length);
                // console.log(locRes[0].lat);
                // console.log(locRes[0].lon);
                lat = locRes[0].lat;
                lon = locRes[0].lon;
                getWeather(lat, lon, cityName, newCity);
            } else {
                console.error("Invalid input, city does not exist");
            }
        })
        .catch(function (error) {
            console.error(error);
        });

    // console.log(locQueryUrl);
}

