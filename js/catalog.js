var loadedItems = 0;
var itemsToLoad = 12;
var cell2x1 = [];
var itemBox;

$(function () {

    isReady = true;
    nav = $('#navigation');
    logo = $('#logo');
    logoHeight = $('#logo').height();

    logoImg = $('#logo img');
    logoImgHeight = logoImg.height();

    if ($(window).width() <= 768)
        CheckHeaderAnim();


    LoadItems();

    $(".btn-ellipse-1").bind('click', function () {
        LoadItems();
    });
    CheckWindowWidth();
});
