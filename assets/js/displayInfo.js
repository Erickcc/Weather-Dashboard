var mainCardEl = document.querySelector('#main-card');
var secondaryCardEl = document.querySelector('#secondary-card');
var historyCardEl = document.querySelector('#search-history');

var h1El = document.createElement("H1");
var liEl = document.createElement("LI");
var ulEl = document.createElement("UL");
var liTextEl = document.createTextNode("");

var cardEl = document.createElement("DIV");
var rowEl = document.createElement("DIV");
var imgEl = document.createElement("IMG");

var today = moment();

var baseImageLink = "https://openweathermap.org/img/wn/";

// [0] = icon
// [1] = temperature
// [2] = wind speed
// [3] = humidity
// [4] = ultra violet index
// UV index  : low = 0-2.99, moderate = 3-5.99, high = 6 and above
// .classList.add("mystyle");

// Function that renders all the information in the webpage
function renderInformation(weatherData, cityName) {
    // moment variable to handle the dates
    var dateVariable = today;
    // variable that is going to be used to store the url of the weather icons
    var currentImageLink;
    // Variable that we use to retrieve the name of the cities from the labels
    var cityBrowser;
    // Control variable that tells us if the city is already present in the browsed cities or if it is a new city
    var cityPresent;

    //LHS of the webpage
    //Loop that loops through all the label elements to find out if the current city is a new one or if we
    //clicked on a city that was stored in the labels that store previously inquired cities
    for (var i = 0; historyCardEl.childNodes[i]; i++) {
        cityBrowser = historyCardEl.childNodes[i].textContent;
        cityBrowser = cityBrowser.trim();
        cityBrowser = toTitleCase(cityBrowser);
        if (cityBrowser == cityName) {
            cityPresent = true;
        }
    }
    // If the city already exists locally, then shift its position in the array, if it is a new city then store the new city
    // and delete the last one (Capped at 10, doesnt delete cities if we dont have 10). Save the information locally
    if (cityPresent) {
        cityPresent = false;
        storeValue(cityName, true);
    } else {
        storeValue(cityName, false);
    }
    // Render all the labels on the LHS of the screen based on the stored values
    displayHistorySearch();


    //RHS
    // Erase today's date weather information
    while (mainCardEl.firstChild) {
        mainCardEl.removeChild(mainCardEl.lastChild);
    }
    // Erase the following 5 days weather information
    while (secondaryCardEl.childNodes[2]) {
        secondaryCardEl.removeChild(secondaryCardEl.childNodes[2]);
    }

    // Loop 6 times to display today's weather info
    h1El = document.createElement("H1");
    for (var i = 0; i < weatherData[0].length; i++) {
        liEl = document.createElement("LI");

        // If i = 0, then display the main weather city name, date and image
        if (i == 0) {
            // Build the time in the main weather section
            today = moment();
            dateVariable = today.format("MM-DD-YYYY");
            liTextEl = document.createTextNode(cityName + " (" + dateVariable + ")");
            h1El.appendChild(liTextEl);
            // Build the weather icon in the main weather section
            imgEl = document.createElement("IMG");
            currentImageLink = baseImageLink + weatherData[i][0] + ".png";
            imgEl.setAttribute("src", currentImageLink);
            h1El.appendChild(imgEl);
            liEl.appendChild(h1El);
            // Display all the previous elements
            mainCardEl.appendChild(liEl);
            // If i = 5, then build the UV index section
        } else if (i === weatherData[0].length - 1) {
            // The UV index variable was stored as "UV Index: ##.##" so we must get rid of all the text and keep the number with the decimal point
            // Remove all the blank spaces and text in the UVIndex stored variable, keep the number in a float format.
            var uvIndex = parseFloat(weatherData[0][i].match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/));
            // We create the "UV Index: " legend and add it to the list item
            liTextEl = document.createTextNode("UV Index: ");
            liEl.appendChild(liTextEl);

            // We create a DIV so that we can give the background surrounding the UV Index number a color
            // We add the UV Index number to the div and give it a class based on the UVIndex number, this class changes
            // The background color in this div
            cardEl = document.createElement("DIV");
            liTextEl = document.createTextNode(uvIndex);
            cardEl.appendChild(liTextEl);
            if (uvIndex < 3) {
                cardEl.classList.add("uv-index-low");
            } else if (uvIndex >= 3 && uvIndex < 6) {
                cardEl.classList.add("uv-index-moderate");
            }
            else {
                cardEl.classList.add("uv-index-high");
            }
            // Append the DIV to the list item
            liEl.appendChild(cardEl);
            mainCardEl.appendChild(liEl);
        }
            // If it is not the title information or the UV index information, add the elements to the main weather card
            // As a regular list item
        else {
            liTextEl = document.createTextNode(weatherData[0][i]);
            liEl.appendChild(liTextEl);
            mainCardEl.appendChild(liEl);
        }
    }

    // Loop the rest of the matrix to display all the cards that contain the future weather information
    rowEl = document.createElement("DIV");
    for (var i = 0; i < weatherData.length - 1; i++) {
        // Create an unordered list for each card, later this unordered list will be appended to a div
        cardEl = document.createElement("DIV");
        ulEl = document.createElement("UL");
        for (var j = 0; j < 5; j++) {
            // If j=0, then build the list item for the future date with the moment library, add the element to the unordered list
            // And then build the image for this date and add it as another list item
            if (j == 0) {
                liEl = document.createElement("LI");
                // Get the future date
                today = moment();
                dateVariable = today.add(i + 1, 'days').calendar();
                dateVariable = today.format("MM-DD-YYYY");
                // Build the date list item and append it
                liTextEl = document.createTextNode(dateVariable);
                liEl.appendChild(liTextEl);
                liEl.classList.add("list-items");
                ulEl.appendChild(liEl);
                // Build the image list item
                liEl = document.createElement("LI");
                imgEl = document.createElement("IMG");
                currentImageLink = baseImageLink + weatherData[i + 1][j] + ".png";
                imgEl.setAttribute("src", currentImageLink);
                // Append the image
                liEl.appendChild(imgEl);
                ulEl.appendChild(liEl);

            } else {
                // If it is not the weather date or the weather icon, then add the information as a regular list item
                liEl = document.createElement("LI");
                liTextEl = document.createTextNode(weatherData[i + 1][j]);
                liEl.appendChild(liTextEl);
                liEl.classList.add("list-items");
                ulEl.appendChild(liEl);
            }
        }
        // Add a class to the unordered list
        ulEl.classList.add("secondary-card-ul");
        // Append the unordered list to the divs
        cardEl.appendChild(ulEl);
        // Add classes to the divs to make them responsive
        cardEl.classList.add("secondary-card", "col-lg-2", "col-md-12");
        // Append the divs to the rows
        rowEl.appendChild(cardEl);
        // Justify content so that the 2 columns that are not being used are used to space the elements between them
        rowEl.classList.add("row", "justify-content-between");
    }
    // Append the row to the main secondary card element
    secondaryCardEl.appendChild(rowEl);
}

