(function() {
    'use strict';


    var website = openerp.website;
    var qweb = openerp.qweb;


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


    website.snippet.animationRegistry.snow = website.snippet.Animation.extend({
        //coming from http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect
        selector: "#canvas",
        angle: 0,
        canvas: {},
        mp: 50,
        particles: [],
        ctx: {},
        W: 0,
        H: 0,

        start: function() {
            var self = this;
            self.canvas = document.getElementById("canvas");
            self.ctx = self.canvas.getContext("2d");
            $(window).resize(function() {
                self.resize_handler();

            });
            self.resize_handler();
            self.build_particles();
            setInterval(self.draw, 33, self);

        },

        resize_handler: function() {
            var self = this;
            self.W = $('#wrapwrap').width();
            self.H = $('#wrapwrap').height();
            self.canvas.width = self.W;
            self.canvas.height = self.H;
            self.$target.css('width', self.W);
            self.$target.css('height', self.H);


        },

        build_particles: function() {
            var self = this;
            for (var i = 0; i < self.mp; i++) {
                self.particles.push({
                    x: Math.random() * self.W, //x-coordinate
                    y: Math.random() * self.H, //y-coordinate
                    r: Math.random() * 4 + 1, //radius
                    d: Math.random() * self.mp //density
                });
            }
        },

        draw: function(self) {

            if (!self) var self = this;

            self.ctx.clearRect(0, 0, self.W, self.H);

            self.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            self.ctx.beginPath();
            for (var i = 0; i < self.mp; i++) {
                var p = self.particles[i];
                self.ctx.moveTo(p.x, p.y);
                self.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            }
            self.ctx.fill();
            self.update();
        },


        update: function() {
            var self = this;
            self.angle += 0.01;
            for (var i = 0; i < self.mp; i++) {
                var p = self.particles[i];
                //Updating X and Y coordinates
                //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
                //Every particle has its own density which can be used to make the downward movement different for each flake
                //Lets make it more random by adding in the radius
                p.y += Math.cos(self.angle + p.d) + 1 + p.r / 2;
                p.x += Math.sin(self.angle) * 2;

                //Sending flakes back from the top when it exits
                //Lets make it a bit more organic and let flakes enter from the left and right also.
                if (p.x > self.W + 5 || p.x < -5 || p.y > self.H) {
                    if (i % 3 > 0) //66.67% of the flakes
                    {
                        self.particles[i] = {
                            x: Math.random() * self.W,
                            y: -10,
                            r: p.r,
                            d: p.d
                        };
                    } else {
                        //If the flake is exitting from the right
                        if (Math.sin(self.angle) > 0) {
                            //Enter from the left
                            self.particles[i] = {
                                x: -5,
                                y: Math.random() * self.H,
                                r: p.r,
                                d: p.d
                            };
                        } else {
                            //Enter from the right
                            self.particles[i] = {
                                x: self.W + 5,
                                y: Math.random() * self.H,
                                r: p.r,
                                d: p.d
                            };
                        }
                    }
                }
            }


        },
        stop: function() {

        }
    });


})();
