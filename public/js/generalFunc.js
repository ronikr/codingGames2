/**
 * Created by R K on 02/12/2015.
 */

function sendGameStartedJSON(gameName,action) {

    var newGame = {game: gameName, action:action};
    $.ajax({
        type: "POST",
        url: '../api/admin',
        data: newGame,
        success: function () {
            console.log('Added!');
        }
    });
}