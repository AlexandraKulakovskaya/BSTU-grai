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
    CheckWindowWidth();
});

$(function () {
    itemBox = d.querySelectorAll('.cart-add')
    for (var i = 0; i < itemBox.length; i++) {
        addEvent(itemBox[i], 'click', Cart.addToCart);
    }
    CheckWindowWidth();
})
