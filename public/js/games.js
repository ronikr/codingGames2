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
                '<div class="gameName">'+value.name+
                '</div>'+
            '<div class ="gameImage"><img src="' + value.picture +
            '" title="'+ value.description+'">' +
            '</div>' +
                '<div class="gameInfo">'+value.description+
            '</div></div>'
    })

    elGames.innerHTML = str;

})

