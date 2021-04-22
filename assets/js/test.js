var today = moment();
//moment().subtract(10, 'days').calendar()
var asd = today.format("MM-DD-YYYY");
asd = "(" + asd + ")";
console.log(asd);

asd = today.add(1, 'days').calendar();
console.log(asd);
asd = today.format("MM-DD-YYYY");
console.log(asd);