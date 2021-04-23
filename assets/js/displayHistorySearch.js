var cardEl = document.createElement("DIV");
var liTextEl = document.createTextNode("");
var historyCardEl = document.querySelector('#search-history');
var storedData;

var storedNames = ["history0", "history1", "history2", "history3", "history4", "history5", "history6"
                    ,"history7", "history8", "history9"];

function displayHistorySearch(){
    while (historyCardEl.firstChild) {
        historyCardEl.removeChild(historyCardEl.lastChild);
    }
    for (var i=0; i <storedNames.length; i++){
        if(localStorage.getItem(storedNames[i]) != "undefined" && localStorage.getItem(storedNames[i]) != "null"
        && localStorage.getItem(storedNames[i]) != null){
            
            storedData = localStorage.getItem(storedNames[i]);
            cardEl = document.createElement("DIV");
            liTextEl = document.createTextNode(storedData);
            cardEl.appendChild(liTextEl); 
            cardEl.classList.add("alert", "alert-dark");
            cardEl.setAttribute("role", "alert");
            historyCardEl.appendChild(cardEl);
        }
    }   
}
