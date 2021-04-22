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

  getCoordinates(searchInputVal);
  // console.log(searchInputVal);
}

function historyElements(event) {
  event.stopPropagation();
  var textEl = event.target.textContent;
  textEl = textEl.trim();
  console.log(textEl);
  // console.log(event.target.id);
  if (!event.target.id){
    console.log("Clicked on an element");
    getCoordinates(textEl);
  }else{
    console.log("Clicked on the parent element");
  }
}


searchHistoryEl.addEventListener('click', historyElements);
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
searchBtnEl.addEventListener('click', handleSearchFormSubmit);
