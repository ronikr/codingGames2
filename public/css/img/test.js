$(function(){
    $('.css-toggle')
        .next().hide()
        .end().click(function(e){
            e.preventDefault();

            if($(this).data('toggle') == 1) {
                $(this).data('toggle', 0).html('Show CSS').next().slideUp();
            } else if(!$(this).data('toggle') || $(this).data('toggle') == 0) {
                $(this).data('toggle', 1).html('Hide CSS').next().slideDown();
            }
        });
});