var mainCardEl = document.querySelector('#main-card');
var secondaryCardEl = document.querySelector('#secondary-card')

var h1El = document.createElement("H1");
var liEl = document.createElement("LI");
var ulEl = document.createElement("UL");
var liTextEl = document.createTextNode("");

var cardEl = document.createElement("DIV");
var rowEl = document.createElement("DIV");
var imgEl = document.createElement("IMG");

var today = moment();

var baseImageLink = "http://openweathermap.org/img/wn/";

// [0] = icon
// [1] = temperature
// [2] = wind speed
// [3] = humidity
// [4] = ultra violet index
// UV index  : low = 0-2.99, moderate = 3-5.99, high = 6 and above
// .classList.add("mystyle");

function renderInformation(weatherData, cityName, newCity){
    var dateVariable = today;
    var currentImageLink;

    while (mainCardEl.firstChild) {
        mainCardEl.removeChild(mainCardEl.lastChild);
    }

    while (secondaryCardEl.childNodes[2]) {
        secondaryCardEl.removeChild(secondaryCardEl.childNodes[2]);
    }

    h1El = document.createElement("H1");
    
    for (var i = 0; i < weatherData[0].length ; i++){
        liEl = document.createElement("LI");
        if (i==0){
            today = moment();
            dateVariable = today.format("MM-DD-YYYY");
            liTextEl = document.createTextNode(cityName + " (" + dateVariable + ")");
            h1El.appendChild(liTextEl);
            
            imgEl = document.createElement("IMG");
            currentImageLink = baseImageLink + weatherData[i][0] + ".png";    
            imgEl.setAttribute("src" , currentImageLink);
            h1El.appendChild(imgEl);
            liEl.appendChild(h1El);

            mainCardEl.appendChild(liEl);
        }else if(i === weatherData[0].length-1){
            var uvIndex = parseFloat(weatherData[0][i].match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/));
            liTextEl = document.createTextNode("UV Index: ");
            liEl.appendChild(liTextEl);

            cardEl = document.createElement("DIV");
            liTextEl = document.createTextNode(uvIndex);
            cardEl.appendChild(liTextEl);
            if(uvIndex < 3){
                cardEl.classList.add("uv-index-low");
            }else if(uvIndex >=3 && uvIndex < 6){
                cardEl.classList.add("uv-index-moderate");
            }
            else{
                cardEl.classList.add("uv-index-high");
            }
            
            liEl.appendChild(cardEl);
            mainCardEl.appendChild(liEl);
        }
        else{
            liTextEl = document.createTextNode(weatherData[0][i]);
            liEl.appendChild(liTextEl);
            mainCardEl.appendChild(liEl);
        }
    }

    // console.log(weatherData[1][0]);
    rowEl = document.createElement("DIV");
    for (var i = 0; i<weatherData.length-1 ; i++){
        cardEl = document.createElement("DIV");
        ulEl = document.createElement("UL");
        for(var j=0; j<5; j++){
            if(j==0){
                liEl = document.createElement("LI");

                today = moment();
                dateVariable = today.add(i+1, 'days').calendar();
                dateVariable = today.format("MM-DD-YYYY");

                liTextEl = document.createTextNode(dateVariable);
                liEl.appendChild(liTextEl);
                liEl.classList.add("list-items");
                ulEl.appendChild(liEl);    

                liEl = document.createElement("LI");
                imgEl = document.createElement("IMG");
                currentImageLink = baseImageLink + weatherData[i+1][j] + ".png";    
                imgEl.setAttribute("src" , currentImageLink);
                liEl.appendChild(imgEl);
                ulEl.appendChild(liEl);

            }else{
                liEl = document.createElement("LI");
                liTextEl = document.createTextNode(weatherData[i+1][j]);
                liEl.appendChild(liTextEl);
                liEl.classList.add("list-items");
                ulEl.appendChild(liEl);
            }
        }
        ulEl.classList.add("secondary-card-ul");
        cardEl.appendChild(ulEl);
        cardEl.classList.add("secondary-card" , "col-lg-2", "col-md-12");
        // secondaryCardEl.appendChild(cardEl);
        rowEl.appendChild(cardEl);
        rowEl.classList.add("row", "justify-content-between");
    }
    secondaryCardEl.appendChild(rowEl);

    console.log("City Name: " + cityName);
    console.log("New city: " + newCity);
}

