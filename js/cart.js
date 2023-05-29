$.getScript("js/app.js");

$(function () {

    //$('body').hide().fadeIn(1000);
    UpdateCartText();
    // Open cart

    Cart.openCart();
    addEvent(d.getElementById("checkout"), 'click', OpenCheckoutForm);
    addEvent(d.getElementById("clearcart"), 'click', Cart.clearCart);


    $('.down').click(function () {
        let $input = $(this).parent().find('input');
        let count = parseInt($input.val());
        if (count > 1) {
            Cart.minItem($input.attr('data-id'));
            count--;
            $input.val(count);
            $input.change();

            $('#cart-sum').text(Cart.getItemSum().toFixed(2) + " BYN");
            $('#cart-count').text(Cart.getItemCount());
            UpdateCartText()
        }

        return false;
    });

    $('.up').click(function () {
        let $input = $(this).parent().find('input');
        let count = parseInt($input.val());
        if (count >= 1) {
            Cart.addItem($input.attr('data-id'));
            count++;
            $input.val(count);
            $input.change();

            $('#cart-sum').text(Cart.getItemSum().toFixed(2) + " BYN");
            $('#cart-count').text(Cart.getItemCount());
            UpdateCartText()
        }

        return false;
    });

    $('.remove').click(function () {
        let $input = $('#count');
        console.log($input);
        Cart.removeItem($input.attr('data-id'));
        $input.parent().parent().parent().remove();

        $('#cart-sum').text(Cart.getItemSum().toFixed(2) + " BYN");
        $('#cart-count').text(Cart.getItemCount());
        UpdateCartText()

        return false;
    });

});