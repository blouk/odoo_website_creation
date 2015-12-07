(function() {
    'use strict';


    var website = openerp.website;
   
    website.snippet.options.snippet_handler = website.snippet.Option.extend({

        start: function() {
            this._super();
        },
        set_degree: function(type, data) {
            var self = this;
            if(type != 'click') return;
            self.$target.attr('style','');
            self.$target.attr('style','ms-transform: rotate('+data+'deg);-webkit-transform: rotate('+data+'deg); transform: rotate('+data+'deg);');

        }
    });
})();
