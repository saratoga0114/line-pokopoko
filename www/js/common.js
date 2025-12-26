$(document).ready(function() {
    $("img.lazy").lazyload({
        effect: "fadeIn",
        effect_speed: 1000,
        load: function(e){
            $(this).css('width', '100%');
            $(this).css('height', 'auto');
        }
    });
});
