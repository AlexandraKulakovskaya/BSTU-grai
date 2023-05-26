$.getScript('js/url.min.js');

var nav, logo, logoHeight, logoImg, logoImgHeight, seasons, seasonImages ;
var isReady = false;
var d = document;


var Cart = {
    // Get data from LocalStorage
    getCartData: function () {
        return JSON.parse(localStorage.getItem("cart"));
    },
    // Put data to LocalStorage
    setCartData: function (o) {
        localStorage.setItem("cart", JSON.stringify(o));
        return false;
    },

    getItemCount: function () {
        let count = 0;
        let cartData = Cart.getCartData();
        if (cartData != null || cartData != undefined) {
            Object.getOwnPropertyNames(cartData).forEach(function (val) {
                count += Number(parseInt(cartData[val][2]));
            });
        }
        return count;
    },
    getItemSum: function () {
        let sum = 0;
        let cartData = Cart.getCartData();
        if (cartData != null || cartData != undefined) {
            Object.getOwnPropertyNames(cartData).forEach(function (val) {
                sum += parseFloat(cartData[val][1]) * Number(parseInt(cartData[val][2]));
            });
        }
        return Number(parseFloat(sum.toFixed(2)));
    },
    // Add to cart
    addToCart: function (e) {
        e.disabled = true; // Block button while proccess adding

        let cartData = Cart.getCartData() || {}, // Get data from cart and create new one if it hasn't been created
            itemId = this.getAttribute('data-id'), // ID of good
            itemTitle = this.getAttribute('data-title'), // Good's name
            itemPrice = this.getAttribute('data-price'); // Good's cost

        if (cartData.hasOwnProperty(itemId)) { // Add one more if it good have been at card before
            cartData[itemId][2] += 1;

        } else { // Add new one good if this one hasn't been at cart
            cartData[itemId] = [itemTitle, itemPrice, 1];
        }

        if (!Cart.setCartData(cartData)) { // Update data at LocalStorage
            e.disabled = false; // enable button LocalStorage
        }
        UpdateCartText();
        return false;
    },

    // Open card with goods
    openCart: function (e) {
        let cartData = Cart.getCartData(),
            totalItems = '';
        cartCont = d.getElementById("cart-content");

        // generate data if cart has goods
        if (cartData != null || cartData != undefined) {
            totalItems = '<table class="shopping-list"><thead><tr><th scope="col" class="border-0"><p>Наименование</p></th><th scope="col" class="border-0"><p>Цена</p></th><th scope="col" class="border-0"><p>Количество</p></th><th scope="col" class="border-0"><p>Удалить</p></th></tr></thead>';
            totalItems += '<tbody>';
            Object.getOwnPropertyNames(cartData).forEach(function (val) {

                totalItems += '<tr>';
                totalItems += '<th scope="row"><figure class="shopping-list-wrapper"><a href="catalog-item.html?item=' +
                    val + '"><img src="assets/catalog/catalog' + val + '.jpg"></a><figcaption><p>' +
                    cartData[val][0] + '</p></figcaption></figure></th>';

                totalItems += '<td class="align-middle">' + cartData[val][1] + ' BYN</td>';
                totalItems += '<td class="align-middle"><div class="input-amount"><span class="down"><i class="fas fa-minus-square"></i></span><input disabled type="number" min="1" max="99" id="count" value="' +
                    cartData[val][2] + '" data-id="' + val + '"/><span class="up"><i class="fas fa-plus-square"></i></span></td></div></td>';
                totalItems += '<td class="align-middle"><div class="input-amount"><span class="remove"><i class="fas fa-trash-alt"></i></span></div></td>';

                totalItems += '</tr>';
            });
            totalItems += '<tr><td class="itog">Итого:</td><td id="cart-sum"><strong>' + Cart.getItemSum() + ' BYN<strong></td><td id="cart-count"><strong>' + Cart.getItemCount() + '<strong></td><th></th></tr>';
            totalItems += '</tbody>';
            totalItems += '</table>';


            cartCont.innerHTML = totalItems;
        } else {
            // message if cart is empty
            cartCont.innerHTML = "В корзине пусто.";
        }

        return false;
    },
    clearCart: function (e) {
        cartCont = d.getElementById("cart-content");

        localStorage.removeItem("cart");
        cartCont.innerHTML = "Корзина очищена!";
        UpdateCartText();
    },
    addItem: function (id) {
        let cartData = Cart.getCartData();
        if (cartData != null || cartData != undefined) {
            if (cartData.hasOwnProperty(id))
                cartData[id][2] += 1;
            Cart.setCartData(cartData);
        }
        return false;
    },
    minItem: function (id, count) {
        let cartData = Cart.getCartData();
        if (cartData != null || cartData != undefined) {
            if (cartData.hasOwnProperty(id))
                cartData[id][2] -= 1;
            Cart.setCartData(cartData);
        }
        return false;
    },
    removeItem: function (id) {
        let cartData = Cart.getCartData();
        if (cartData != null || cartData != undefined) {
            delete cartData[id];
            if (isEmpty(cartData)) Cart.clearCart();
            else Cart.setCartData(cartData);
        }
        return false;
    }
};

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

function UpdateCartText() {
    let cartText = $("#navigation ul.menubar > li:last-child() > a");
    let cartTextBurger = $("#navigation ul.burger-list > li:last-child() > a");
    let cartStr;

    if (Cart.getItemCount() > 0)
        cartStr = "Корзина (" + Cart.getItemCount() + ")";
    else
        cartStr = "Корзина";

    cartText.text(cartStr);
    cartTextBurger.text(cartStr);
}

function OpenCheckoutForm() {

    let checkoutForm = $("div.order-wrapper");

    if (Cart.getItemCount() > 0)
        checkoutForm.fadeIn("fast");
    addEvent(d.querySelector("div.order-wrapper"), 'click', CloseCheckoutForm);

}

function CloseCheckoutForm() {
    let checkoutForm = d.querySelector("div.order-wrapper");
    if (event.target == checkoutForm)
        $(checkoutForm).fadeOut("fast");
}



// Crossbrowsers setting event
function addEvent(elem, type, handler, bubbling = false) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handler, bubbling);
    } else {
        elem.attachEvent('on' + type, function () {
            handler.call(elem);
        });
    }
    return false;
};

// FORM MESSAGE
$(document).on('submit', '#contact-form', function (e) {
    e.preventDefault();
    $.ajax(function () {
        $("#contacts-success-wrapper").fadeIn("fast", function () {
            window.setTimeout(function () {
                $("#contacts-success-wrapper").fadeOut("slow");
            }, 2000);
        });
    });
});

$(document).on('focus',".form-group input", function() {
    $("label[for='" + this.id + "']").addClass("active");
});
$(document).on('blur',".form-group input", function() {
    if(this.value === "")
        $("label[for='" + this.id + "']").removeClass("active");
});

$(document).on('focus',".form-group textarea", function() {
    $("label[for='" + this.id + "']").addClass("active");
});
$(document).on('blur',".form-group textarea", function() {
    if(this.value === "")
        $("label[for='" + this.id + "']").removeClass("active");
});

//ORDER MESSAGE
$(document).on('submit', '#order-form', function (e) {
    e.preventDefault();
    $(function () {
        $("#order-success-wrapper").fadeIn("fast", function () {
            window.setTimeout(function () {
                $("#order-success-wrapper").fadeOut("slow");
            }, 1000);
        });
    })
});


// HEADER ANIMATION
$(window).scroll(function () {

    if ($(this).scrollTop() > 100) {
        if ($('#arrow-up').is(':hidden')) {
            $('#arrow-up').css({
                opacity: 1
            }).fadeIn('slow');
        }
    } else {
        $('#arrow-up').stop(true, false).fadeOut('fast');
    }

    if (isReady) {
        var top = $(this).scrollTop();
        var isAnimated = false;
        if ($(window).width() > 768) {
            if (top >= 1) {
                if (isAnimated)
                    return false;
                else {
                    nav.animate({
                        'top': '-32px'
                    }, 'fast');
                    logo.animate({
                        'height': '64',
                        'width': '80'
                    }, 'fast');
                    logoImg.animate({
                        'height': '45',
                        'margin-top': '10'
                    }, 'fast');
                    isAnimated = true;
                }
            } else {
                nav.stop(true);
                logo.stop(true);
                logoImg.stop(true);

                nav.animate({
                    'top': '0'
                }, 'fast');
                logo.animate({
                    'height': logoHeight,
                    'width': '130'
                }, 'fast');
                logoImg.animate({
                    'height': logoImgHeight,
                    'margin-top': '15'
                }, 'fast');
            }
        } else {
            CheckHeaderAnim();
        }
    }
});

$(function () {

    isReady = true;
    nav = $('#navigation');
    logo = $('#logo');
    logoHeight = $('#logo').height();

    logoImg = $('#logo img');
    logoImgHeight = logoImg.height();

    if ($(window).width() <= 768)
        CheckHeaderAnim();
});

function CheckHeaderAnim() {
    nav.stop(true);
    logo.stop(true);
    logoImg.stop(true);

    nav.animate({
        'top': '0'
    }, 'fast');
    logo.animate({
        'height': '74',
        'width': '80'
    }, 'fast');
    logoImg.animate({
        'height': '45',
        'margin-top': '10'
    }, 'fast');
}

const seasons = {
  winter: [
    'https://damion.club/uploads/posts/2022-02/1645031929_36-damion-club-p-krasivie-zimnie-kartinki-priroda-40.jpg',
    'https://gagaru.club/uploads/posts/2023-02/1676708280_gagaru-club-p-zimnie-peizazhi-krasivie-kartini-krasivo-6.jpg',
    'https://proprikol.ru/wp-content/uploads/2019/12/krasivye-kartinki-pro-zimu-62.jpg'
  ],
  spring: [
    'https://mirpozitiva.ru/wp-content/uploads/2019/11/1478782975_ptichka_sakura.jpg',
    'https://uprostim.com/wp-content/uploads/2021/04/image034-4.jpg',
    'https://vsegda-pomnim.com/uploads/posts/2022-04/1649130823_61-vsegda-pomnim-com-p-krasivaya-vesennyaya-priroda-foto-71.jpg'
  ],
  summer: [
    'https://mobimg.b-cdn.net/v3/fetch/16/16410d56242cdd30d6c20c26d0740e26.jpeg',
    'https://vsegda-pomnim.com/uploads/posts/2022-04/1649118807_9-vsegda-pomnim-com-p-krasivie-peizazhi-prirodi-leto-foto-9.jpg',
    'https://thypix.com/wp-content/uploads/2018/05/Sommerlandschaft-Bilder-39.jpg'
  ],
  autumn: [
    'https://klike.net/uploads/posts/2022-08/1661232461_j-51.jpg',
    'https://w-dog.ru/wallpapers/9/9/514842286559747/priroda-les-park-derevya-listya-krasochnye-doroga-osen-padenie-cveta-progulka.jpg',
    'https://w-dog.ru/wallpapers/10/12/470823373396813/osen-rechka-bereg-berezy-listya-zheltye.jpg'
  ],
}


function changeImage (event) {
  const season = event.target.dataset.season;
  const seasonImages = document.querySelector('.photo__image').children;
  Array.from(seasonImages).forEach((image, index) => image.src = seasons[season][index]);
  // Array.from(seasonImages).forEach((image, index) => image.src = './assets/seasons/' + season + '/' + (index + 1) + '.jpg');
  
  const buttons = document.querySelector('.photo__buttons').children;
  Array.from(buttons).forEach(button => {
    if (button.dataset.season == season) {
      button.classList.add('button_color');
    } else {
      button.classList.remove('button_color');
    };
  });
  
};

function buttonClick (event) {
  if (event.target.classList.contains('button')) {
    changeImage (event);
  };
};

document.querySelector('.photo__buttons').addEventListener('click', buttonClick);
