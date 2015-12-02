// TODO: use ajax to get the file server/games.json
// Create the list

$.getJSON('api/games', function (games) {
    console.log(games);
    var elGames = document.querySelector("#listGames");
    elGames.innerHTML = '';
    var str = '';
    $.each(games, function (key, value) {
        str +=
            '<div class="gameContainer">' +
            '<div class="gameName">' + value.name +
            '</div>' +
            '<div class ="gameImage" id="' + value.id + '" onclick="gameClicked(id)">' +
            '<img src="' + value.picture +
            '" title="' + value.description + '">' +
            '</div>' +
            '<div class="gameInfo">' + value.description +
            '</div>' +
            '</div>'
    })

    elGames.innerHTML = str;

})

function gameClicked(id) {

    $.getJSON('api/games/' + id, function (game) {

        var elDarkenDiv = document.querySelector('.darkenScreen');
        elDarkenDiv.style.display = "block";
        var elPopUp = document.querySelector('#popUp');
        elPopUp.style.display = "flex";
        elPopUp.innerHTML = '';
        var str = '';
        var d = new Date(game.publishedAt);
        var dateStr = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
        str = '<div class="topRow">' +
            '<div id="gameName">' + game.name + '</div>' +
            '<div id="contributor"> By: ' + game.by + '</div>' +
            '<div id="liveSince"> Live since :' + dateStr + '</div>' +
            '<div id="closePopUp" onclick="closePopUp()"> &#10006 </div>' +
            '</div>' +
            '<div class="imageContainer"> <img src ="' + game.picture + '">' +
            '</div>' +
            '<div class="gameInfo"><div class="description"> ' + game.description + '</div>' +
            '<div > Rating: </div>' +
            '<div class="rating" data-rate-value=6></div></div>' +
            '<div class="checkItOut"><a href="' + game.url + '" > Check it Out !</a></div>'
        elPopUp.innerHTML = str;

        var options = {
            max_value: 5,
            step_size: 1,
            change_once: true,
            initial_value: game.rate
            //symbols: {},
            //selected_symbol_type: 'utf8_star', // Must be a key from symbols
            //convert_to_utf8: false,
            //cursor: 'default',
            //readonly: false,
            //ajax_method: 'POST',
            //url: 'api/games/'
        }
        $(".rating").rate(options);
        //$(".rating").rate("setValue");

    })


}

function closePopUp() {
    console.log('in the close');
    $(".darkenScreen").css("display", "none");
    $('#popUp').css("display", "none");

}

