var mainCardEl = document.querySelector('#main-card');
var secondaryCardEl = document.querySelector('#secondary-card')

var h1El = document.createElement("H1");
var liEl = document.createElement("LI");
var ulEl = document.createElement("UL");
var liTextEl = document.createTextNode("");

var cardEl = document.createElement("DIV");
var rowEl = document.createElement("DIV");



// [0] = icon
// [1] = temperature
// [2] = wind speed
// [3] = humidity
// [4] = ultra violet index

// .classList.add("mystyle");
function renderInformation(weatherData){
    var searchInputVal = document.querySelector('#search-input').value;
    while (mainCardEl.firstChild) {
        mainCardEl.removeChild(mainCardEl.lastChild);
    }

    // h1El = document.createElement("H1");
    
    for (var i = 0; i < weatherData[0].length ; i++){
        liEl = document.createElement("LI");
        if (i==0){
            liTextEl = document.createTextNode(searchInputVal);
            liEl.appendChild(liTextEl);
            mainCardEl.appendChild(liEl);
        }else{
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
        for(var j=0; j<4; j++){
            liEl = document.createElement("LI");
            liTextEl = document.createTextNode(weatherData[i+1][j]);
            liEl.appendChild(liTextEl);
            liEl.classList.add("list-items");
            ulEl.appendChild(liEl);
        }
        ulEl.classList.add("secondary-card-ul");
        cardEl.appendChild(ulEl);
        cardEl.classList.add("secondary-card" , "col-2");
        // secondaryCardEl.appendChild(cardEl);
        rowEl.appendChild(cardEl);
        rowEl.classList.add("row", "justify-content-between");
    }
    secondaryCardEl.appendChild(rowEl);
}
