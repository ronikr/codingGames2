/**
 * Created by R K on 05/11/2015.
 */

// Global Variables
var gCars = [];
var gIsRaceOn = false;
var gIntervalCars = null;
var ROAD_END = 750;

initGame();

function createCars() {

    var car1 = {color: 'red', left:0,speed: 2};
    var car2 = {color: 'blue', left:0,speed: 3};
    var car3 = {color: 'yellow', left:0,speed: 4};
    ////The push creates many cars, every time making gCars array bigger.
    ////"Regular" placement into array can calibrate values of car properties
    ////every time game is initiated
    //gCars.push(car1);
    //gCars.push(car2);
    //gCars.push(car3);
    ////This is where I would want to create a for loop that ideally would have turned string into variable:
    ////
    ////for (var i = 0; i < gCars.length ; i++){
    ////    gCars[i] = 'car'+(index+1) (turn car + index into a variable)
    ////}
    gCars=[car1,car2,car3];

}



function initGame() {
    pauseRace();
    createCars();


    var road = document.querySelector('.road');
    road.innerHTML = '';
    gCars.forEach( function (car, index){
        var strHTML = '<div class ="car" style="background-color:'+car.color +
            '" onclick="carClicked('+ index + ')"></div>'
        road.innerHTML += strHTML;

    })
    for (var i = 0; i < gCars.length ; i++){

        console.log('in initGame, left = ', gCars[i].left);
    }
}

function startRace() {
    if (gIsRaceOn) return;

    gIsRaceOn = true;
    var elCars = document.querySelectorAll('.car');

    gIntervalCars = setInterval( function() {

        for (var i=0; i< elCars.length; i++){
            var elCar = elCars[i];
            var car = gCars[i];
            car.left += car.speed;
            elCar.style.left = car.left +'px';

            if (car.left >= ROAD_END) {
                pauseRace();
                console.log('Winner: ', car);
            }


        }

    },100);

}

function pauseRace() {
    gIsRaceOn = false;
    if (gIntervalCars){
        clearInterval(gIntervalCars);
        gIntervalCars = null;
    }

}

function carClicked(index) {
    if (gIsRaceOn){

        gCars[index].speed +=2;
    }

}
