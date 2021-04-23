var searchFormEl = document.querySelector('#search-form');
var searchBtnEl = document.querySelector('#search-btn');
var searchHistoryEl = document.querySelector('#search-history');

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var searchInputVal = document.querySelector('#search-input').value;
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  searchInputVal = toTitleCase(searchInputVal);
  getCoordinates(searchInputVal, true);
  // console.log(searchInputVal);
}

function historyElements(event) {
  event.stopPropagation();
  var textEl = event.target.textContent;
  textEl = textEl.trim();
  textEl = toTitleCase(textEl);
  console.log(textEl);
  // console.log(event.target.id);
  if (!event.target.id){
    console.log("Clicked on an element");
    getCoordinates(textEl, false);
  }else{
    console.log("Clicked on the parent element");
  }
}

//Taken from  https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

displayHistorySearch();
searchHistoryEl.addEventListener('click', historyElements);
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
searchBtnEl.addEventListener('click', handleSearchFormSubmit);
