$(document).ready(function () {
    var fares = {};

    function update() {
        console.log('update');
        var zone = $('#zone').val();
        var time = $('#time').val();
        var purchase_method = $('input[name="purchase_method"]').val();
        console.log("zone:", zone);
        console.log("time:", time);
        console.log("purchase_method:", purchase_method);
    }

    $('.septa-widget input').change(update);

    $.ajax({
        url: './fares.json',
        success: function (data) {
            fares = JSON.parse(data);
            update();
        }
    })
});