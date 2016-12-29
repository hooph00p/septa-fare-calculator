$(document).ready(function () {
    var state = {
        data: {},
        cost: 0
    };

    function update() {
        // Object used to store state
        var updating = {
            zone: $('.septa-widget [name="zone"]').val(),
            type: $('.septa-widget [name="type"]').val(),
            purchase: $('.septa-widget [name="purchase"]:checked').val(),
            trips: $('.septa-widget [name="trips"]').val()
        };

        console.log('State change:', updating);

        /**
         * Cost calculation:
         * Find the zone, find the fare, then use a multiplier
         * to determine the purchasing increment.
         * 
         * Iterating through everything because it's simpler.
         */
        state.data.zones.forEach(function (zone) {
            if (zone.zone == updating.zone) {
                zone.fares.forEach(function (fare) {
                    if (fare.type == updating.type) {
                        var multiplier = 1;
                        while (multiplier * fare.trips < updating.trips) { multiplier++ }
                        state.cost = fare.price * multiplier;
                        state.current = fare;
                        $('.septa-widget #cost').text("$" + state.cost.toFixed(2));

                    }
                });
            }
        });

        /**
         * Helper text:
         * Switch on info for the corresponding fields.
         */
        $('.septa-widget #purchase-helper').text(state.data.info[updating.purchase]);
        $('.septa-widget #type-helper').text(state.data.info[updating.type]);
    }

    // Listen to all of our widget inputs
    $('.septa-widget input, .septa-widget select').change(update);

    // Get the fares data, throw that in our state object
    $.ajax({
        url: './fares.json',
        success: function (response) {
            state.data = JSON.parse(response);
            update();
        }
    })
});