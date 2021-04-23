var storedNames = ["history0", "history1", "history2", "history3", "history4", "history5", "history6"
                    ,"history7", "history8", "history9"];

var savedItems = new Array();
savedItems.length = 10;
var i=0;

function storeValue(cityName, cityIsPresent){
    for (var i = 0; i< savedItems.length; i++){
        savedItems[i] = localStorage.getItem(storedNames[i]);
    }

    if (cityIsPresent){
        for (var i =0; i< savedItems.length; i++){
            if (cityName === savedItems[i]){
                savedItems.unshift(savedItems[i]);
                savedItems.splice(i+1,1);
                break;
            }
        }
        console.log("City not new");
    }else{
        savedItems.unshift(cityName);
        savedItems.pop();
        console.log("City new");
    }
    
    for(var i =0; i<storedNames.length; i++){
        localStorage.setItem(storedNames[i], savedItems[i]);
    }
    // console.log("Saved items length: " + savedItems.length);
    // console.log("Saved items: " + savedItems);
}