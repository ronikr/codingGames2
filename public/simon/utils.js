/**
 * Created by R K on 09/11/2015.
 */
function randomInteger(minRange, maxRange) {
    var randomInt = Math.floor(((Math.random() * (maxRange - minRange)) + minRange));
    return randomInt;
}

function randomFloat(minRange, maxRange, percision) {
    var randomFloat = ((Math.random() * (maxRange - minRange)) + minRange);
    randomFloat = Math.round(randomFloat * 100) / 100;
    return randomFloat;
}

//***************Tests***************
//var x = 1;
//while (x !== 0){
//    var x= parseFloat(prompt("Enter float"));
//    var y= parseFloat(prompt("Enter float"));
//    var z= parseInt(prompt("Enter decimals"));
//    alert(randomFloat(x,y,z));
//}
