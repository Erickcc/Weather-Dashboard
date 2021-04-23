var searchFormEl = document.querySelector('#search-form');
var searchBtnEl = document.querySelector('#search-btn');
var searchHistoryEl = document.querySelector('#search-history');

// Function that listens to the form button/enter and calls for subsecuent functions
function handleSearchFormSubmit(event) {
  event.preventDefault();
  var searchInputVal = document.querySelector('#search-input').value;
  //If no value was inputted, send an error to the console
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  //If a value is inputted, then format the city name to always have capital letters at the beggining of a word
  // And let the rest of the letters be lowercase
  searchInputVal = toTitleCase(searchInputVal);
  // Call a function that uses an API to look for the latitude and longitude of a city by its name
  getCoordinates(searchInputVal);
}

// Function that listens to clicks on the previous inquired cities
function historyElements(event) {
  event.stopPropagation();
  // Get the text that is stored inside the label (The city's name)
  var textEl = event.target.textContent;
  // Remove white spaces and break lines
  textEl = textEl.trim();
  // Format text
  textEl = toTitleCase(textEl);
  // If the target doesnt have an ID, then it is a label, if it has a label we are clicking the parent element
  // We only want to listen to the children elements
  if (!event.target.id) {
  // Call a function that uses an API to look for the latitude and longitude of a city by its name  
    getCoordinates(textEl);
   } 
}

//Taken from  https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
// Formats the input in such a way that only the first letter of each word in the string is a capital letter and the rest are 
// lowercase letters
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Display locally stored labels on the LHS of the page
displayHistorySearch();

// Listen to button clicks, form submits and clicks on labes (Previous inquired cities)
searchHistoryEl.addEventListener('click', historyElements);
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
searchBtnEl.addEventListener('click', handleSearchFormSubmit);
