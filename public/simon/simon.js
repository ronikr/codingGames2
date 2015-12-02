/**
 * Created by R K on 24/11/2015.
 */
var gState = {
    seq: '',
    currTurn: {
        isUserTurn: false,
        playedNotesCount: 0
    }
}


var gSounds = {
    optionString: 'egabd',
    e: new Audio('audio/e.mp3'),
    g: new Audio('audio/g.mp3'),
    a: new Audio('audio/a.mp3'),
    b: new Audio('audio/b.mp3'),
    d: new Audio('audio/d.mp3')
}

function extendSeq(seq) {
    var index = randomInteger(0, 5);
    var char = gSounds.optionString.substr(index, 1);
    seq += char;
    return seq;
}

//**************Test**********************
//for (var i = 1; i <= 5; i++) {
//    console.log(extendSeq(gState.seq));
//}


function playSeq() {
    var elBtnPlay = document.querySelector(".btn-play");
    elBtnPlay.style.visibility = 'hidden';
    var elStatus = document.querySelector(".gameStatus strong");
    elStatus.innerHTML =' Listen';
    gState.isUserTurn = false;
    var i = 0;
    var intervalPlaySeq = setInterval(function () {
        playNote(gState.seq.substr(i, 1));
        lightKey(gState.seq.substr(i, 1));
        i++;
        if (i === gState.seq.length) {
            clearInterval(intervalPlaySeq);
            gState.isUserTurn = true;
            var elStatus = document.querySelector(".gameStatus strong");
            elStatus.innerHTML ='<strong> Play</strong>';
        }
    }, 2000);
}


function lightKey(key) {
    var elCelToLight = document.querySelector('.note-' + key);
    elCelToLight.classList.add("lit");
    setTimeout(function () {
        elCelToLight.classList.remove("lit");
    }, 1000)

}

function playNote(char) {
    var audio = gSounds[char];
    audio.play();
}


function noteClicked(note) {
    if (!gState.isUserTurn)  return;
    gState.playedNotesCount++;
    var elNotesPlayed = document.querySelector('.notesPlayed');
    elNotesPlayed.innerHTML = ''+gState.playedNotesCount;
    playNote(note);
    lightKey(note);
    if (note !== gState.seq.substr(gState.playedNotesCount-1,1)){
        handleLoss();
        return;
    }
    if (gState.playedNotesCount === gState.seq.length){
        gState.isUserTurn = false;
        var elMaxNotesPlayed = document.querySelector('.maxPlayed');
        elMaxNotesPlayed.innerHTML = ''+gState.playedNotesCount;
        gState.playedNotesCount =0;
        gState.seq = extendSeq(gState.seq);
        playSeq();
    }
};


function handleLoss(){
    var elYouLose = document.querySelector('.youLose');
    elYouLose.innerHTML = 'You Lose!';
    initGame();
}

function initGame(){
    var elBtnPlay = document.querySelector(".btn-play");
    elBtnPlay.style.visibility = 'visible';
    gState.isUserTurn = false;
    gState.playedNotesCount = 0;
    gState.seq = '';
    gState.seq = extendSeq(gState.seq);
}

initGame();