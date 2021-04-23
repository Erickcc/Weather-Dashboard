var storedNames = ["history0", "history1", "history2", "history3", "history4", "history5", "history6"
    , "history7", "history8", "history9"];

var savedItems = new Array();
savedItems.length = 10;
var i = 0;

// Function that stores values locally
function storeValue(cityName, cityIsPresent) {
    // Updates our array with the locally stored information
    for (var i = 0; i < savedItems.length; i++) {
        savedItems[i] = localStorage.getItem(storedNames[i]);
    }
    // If we click on a previously browsed city (clicking on a label) then don't
    // create a new variable, just move that label to the first place of the array
    // and push the rest of the elements in the array 1 position further
    if (cityIsPresent) {
        for (var i = 0; i < savedItems.length; i++) {
            if (cityName === savedItems[i]) {
                savedItems.unshift(savedItems[i]);
                savedItems.splice(i + 1, 1);
                break;
            }
        }
    } else {
    // If we input a new city, then add a new city in the first position in the array,
    // Push the rest of the elements 1 position away and delete the last element (We capped stored elements to 10)
        savedItems.unshift(cityName);
        savedItems.pop();
    }
    // Locally store our updated array
    for (var i = 0; i < storedNames.length; i++) {
        localStorage.setItem(storedNames[i], savedItems[i]);
    }
}