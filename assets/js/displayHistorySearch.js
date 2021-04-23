var cardEl = document.createElement("DIV");
var liTextEl = document.createTextNode("");
var historyCardEl = document.querySelector('#search-history');
var storedData;

// Locally stored variable names
var storedNames = ["history0", "history1", "history2", "history3", "history4", "history5", "history6"
    , "history7", "history8", "history9"];

// Function that renders the previously searched cities on the LHS of the webpage (Labels)
function displayHistorySearch() {
    // Erase all the existing labels
    while (historyCardEl.firstChild) {
        historyCardEl.removeChild(historyCardEl.lastChild);
    }
    /*
    Look for locally stored variables that have the same names as the ones stored in the "storedNames" array
    If the locally stored value is not null and is not undefined, then manipulate the DOM to add the label with its
    stored text content to the HTML
    Result example:
        <div class="form-group col-12 search-history" id="search-history">
            <div class="alert alert-dark" role="alert">Mexico City</div>
            <div class="alert alert-dark" role="alert">Guadalajara</div>
        </div>
    */
    for (var i = 0; i < storedNames.length; i++) {
        if (localStorage.getItem(storedNames[i]) != "undefined" && localStorage.getItem(storedNames[i]) != "null"
            && localStorage.getItem(storedNames[i]) != null) {
            
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
