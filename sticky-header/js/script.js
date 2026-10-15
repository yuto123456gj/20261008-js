$(function() {
    var navPos = $("nav").offset().top;
    $(window).scroll(function() {
        if ($(window).scrollTop() > navPos) {
            $("nav").css("position", "fixed");
        } else {
            $("nav").css("position", "static");
        }
    });
});