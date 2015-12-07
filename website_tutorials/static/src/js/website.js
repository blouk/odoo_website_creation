(function() {
    'use strict';
    var website = openerp.website;
    var qweb = openerp.qweb;

    if (!website.snippet) website.snippet = {};

    website.add_template_file('/website_tutorials/static/src/xml/template.xml');

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


    website.snippet.animationRegistry.last_products = website.snippet.Animation.extend({
        selector: ".website_products",
        start: function(editable_mode) {
            var self = this;

            if (editable_mode) {
                this.$target.find('.container').attr('contentEditable', 'false');
                return;
            }

            $.ajax({
                url: '/website/action/get_products',
                method: 'GET',
                self: self

            }).done(function(data) {
                var self = this.self;
                self.$target.find('.product_container').empty().append(qweb.render('website_tutorials.last_products', {
                    'products': data
                }));
            });
        },
        stop: function() {
            var self = this;
            this.$target.fadeTo('slow', 0.33);
        }
    });

})();
