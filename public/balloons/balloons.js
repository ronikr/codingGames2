/**
 * Created by R K on 04/11/2015.
 */

// Global Variables
var gBalloons = [];
var gIntervalBalloons;
var gIsGameOn =false;
SCREEN_TOP = 400;



//creates an array of balloons and creates them graphically in the HTML
function createBalloons() {

    var balloon1 = {
        color: "red",
        speed: 4,
        bottom: 0,
        opacity: 1,
        left: "25%"
    }
    var balloon2 = {
        color: "blue",
        speed: 4,
        bottom: 0,
        opacity: 1,
        left: "50%"
    }
    var balloon3 = {
        color: "yellow",
        speed: 4,
        bottom: 0,
        opacity: 1,
        left: "75%"
    }

    gBalloons = [balloon1, balloon2, balloon3];

    console.log('In the create Balloons');

}

function initGame(){

    createBalloons();

    var elDivBalloons = document.querySelector(".balloons");
    elDivBalloons.innerHTML = '';
    var strHTML = '';
    gBalloons.forEach( function (balloon,index){
        strHTML = '<div class="balloon" style="background-color:'+
            balloon.color+'; left:'+balloon.left+' " onclick="balloonClicked('+index+')"></div>';
        console.log(strHTML);
        elDivBalloons.innerHTML +=strHTML;

    })
    console.log('In the initGame');
}

initGame();

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

function startGame() {

    if (gIsGameOn) return;
    gIsGameOn = true;

    var elBalloons  = document.querySelectorAll('.balloon');
    gIntervalBalloons = setInterval(function () {
        // move all balloons
        for (var i=0; i <elBalloons.length; i++){

            var elBalloon = elBalloons[i];
            var balloon = gBalloons[i];
            balloon.bottom += balloon.speed;

            if (balloon.bottom >= SCREEN_TOP){
                pauseGame();
                return;
            }
            elBalloon.style.bottom = balloon.bottom + 'px';



        }

    }, 100);

}

function pauseGame() {
    gIsGameOn = false;
    if (gIntervalBalloons){

        clearInterval(gIntervalBalloons);
        gIntervalBalloons = null;
    }

}

function balloonClicked(index){

    var elBalloons  = document.querySelectorAll('.balloon');
    var balloon = gBalloons[index];
    balloon.opacity = 0;
    var elBalloon = elBalloons[index];
    elBalloon.style.opacity = balloon.opacity;
    console.log("Balloon number clicked ", index);

}