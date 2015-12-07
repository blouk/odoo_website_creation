(function() {
    'use strict';
    var website = openerp.website;

    website.snippet.animationRegistry.website_snippet = website.snippet.Animation.extend({
        selector: ".website_snippet",
        i: 0,
        animate_time: 0,

        colors: ['#FFB30C', '#58EC00', '#0087EC', '#EEEEEE', '#FF5A00'],
        start: function(editable_mode) {
            if (!editable_mode) {
                this.loop_animation();
            }
        },
        loop_animation: function() {
            var self = this;
            window.clearInterval(self.animate_time);

            self.animate_time = window.setInterval(
                function() {
                    self.$target.find('.container').animate({
                        backgroundColor: self.colors[(self.i++) % self.colors.length]
                    });
                }, 500
            );

        },
        stop: function() {
            var self = this;
            self.$target.find('.container').clearQueue();
            self.$target.find('.container').stop();
            window.clearInterval(self.animate_time);
        }
    });

})();
