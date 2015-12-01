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
            '<div class ="gameImage" id="'+value.id+'" onclick="gameClicked(id)">' +
            '<img src="' + value.picture +
            '" title="'+ value.description+'">' +
            '</div>' +
                '<div class="gameInfo">'+value.description+
            '</div>' +
            '</div>'
    })

    elGames.innerHTML = str;

})

function gameClicked (id){

    $.getJSON('api/games/'+id, function (game) {

        var elDarkenDiv = document.querySelector('.darkenScreen');
        elDarkenDiv.style.display="block";
        var elPopUp = document.querySelector('#popUp');
        elPopUp.style.display="flex";
        elPopUp.innerHTML = '';
        var str ='';
        var d = new Date(game.publishedAt);
        var dateStr=d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
        str = '<div class="topRow">' +
            '<div id="gameName">'+ game.name+'</div>'+
            '<div id="contributor"> By: '+ game.by+'</div>'+
            '<div id="liveSince"> Live since :'+ dateStr +'</div>'+
            '<div id="closePopUp"> &#10006 </div>'+
            '</div>';
        elPopUp.innerHTML = str;




        //var elGames = document.querySelector("#listGames");
        //elGames.innerHTML = '';
        //var str = '';
        //$.each(games, function (key, value) {
        //    str +=
        //        '<div class="gameContainer">' +
        //        '<div class="gameName">'+value.name+
        //        '</div>'+
        //        '<div class ="gameImage" onclick="gameClicked('+key+')">' +
        //        '<img src="' + value.picture +
        //        '" title="'+ value.description+'">' +
        //        '</div>' +
        //        '<div class="gameInfo">'+value.description+
        //        '</div>' +
        //        '</div>'
        //})
        //
        //elGames.innerHTML = str;

    })

}