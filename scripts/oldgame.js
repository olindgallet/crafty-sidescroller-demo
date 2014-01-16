$(document).on('ready', function(){
   var GAME_WIDTH  = 950;
   var GAME_HEIGHT = 500;
   
   Game = {
	  init: function() {
			Crafty.init(GAME_WIDTH, GAME_HEIGHT);
			Crafty.canvas.init();
			Crafty.background("black");

			Crafty.c('Actor', {
				init: function() {
					this.requires('2D, Canvas');
				}
			});
 
			// A Tree is just an Actor with a certain color
			Crafty.c('Tree', {
				init: function() {
					this.requires('Actor, Color')
					.color('rgb(20, 125, 40)')
					.attr({
						w: 50,
						h: 50
					});
				},
				
				at: function(x, y){
					this.attr({
						x: x,
						y: y
					});
				}
			});
			
			/*
				Ground Tile
			 */
			Crafty.c('Ground', {
				init: function() {
					this.requires('Actor, Color')
					.color('rgb(220, 125, 40)')
					.attr({
						w: 50,
						h: 50
					})
				},
				
				at: function(x, y){
					this.attr({
						x: x,
						y: y
					});
				}
			});
						
			
			// A Player is just an Actor with a certain color
			Crafty.c('Player', {

				init: function() {
					this.requires('Actor, Color, Twoway, Gravity, Keyboard')
					.color('rgb(120, 125, 40)')
					.attr({
						w: 50,
						h: 50
					})
					.gravity('Ground');
				},
				
				at: function(x, y){
					this.attr({
						x: x,
						y: y
					});
				},
				
				set_speed: function(speed, jump_height) {
					this.twoway(speed, jump_height);
				}
			});
			

		},
		
		draw_stage: function(){
			Crafty.e('Tree').at(100, 100);
				Crafty.e('Tree').at(40, 40);
				
				var x_seed = 0;
				while (x_seed * 50 < GAME_WIDTH){
				  Crafty.e('Ground').at(x_seed * 50, 400);
				  x_seed = x_seed + 1;
				}			
		}, 
		
		play: function() {
			//var ent = Crafty.e("2D, DOM, Image").image("images/playersprite.png");
			var player = Crafty.e('Player').at(120,120);
			player.set_speed(2, 5);
		}
	}
	Game.init();
	Game.draw_stage();
	Game.play();
});