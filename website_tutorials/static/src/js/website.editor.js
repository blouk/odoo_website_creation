(function() {
    'use strict';

    var website = openerp.website;

    website.ready().done(function() {
        website.snippet.options.rotation = website.snippet.Option.extend({

            start: function() {
                var self = this;
                this.$el.find(".js-minus-5").on('click', function() {

                    self.rot_minus_5();
                    return false;
                });
                this.$el.find(".js-plus-5").on('click', function() {
                    self.rot_plus_5();
                    return false;
                });
                this.$el.find(".js-reset").on('click', function() {
                    self.reset_rot();
                    return false;
                });

                this._super();
            },

            rot_minus_5: function() {
                var self = this;
                self.$target.attr('style', '');
                self.$target.attr('style', 'ms-transform: rotate(-5deg);-webkit-transform: rotate(-5deg); transform: rotate(-5deg);');
            },

            rot_plus_5: function() {
                var self = this;
                self.$target.attr('style', '');
                self.$target.attr('style', 'ms-transform: rotate(5deg);-webkit-transform: rotate(5deg); transform: rotate(5deg);');
            },

            reset_rot: function() {
                var self = this;
                self.$target.attr('style', 'ms-transform: rotate(0deg);-webkit-transform: rotate(0deg); transform: rotate(0deg);');
            }

        });
    });
})();
