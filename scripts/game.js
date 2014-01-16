$(document).on('ready', function(){
	var GAME_WIDTH      = 950;
	var GAME_HEIGHT     = 500;
	var GAME_BACKGROUND = "black";
   
    
	function Sidescroller() {}
	
	Sidescroller.prototype.init = function(){
		Crafty.init(GAME_WIDTH, GAME_HEIGHT);
		Crafty.canvas.init();
		Crafty.background(GAME_BACKGROUND);

		/**
		 * An Actor
		 */
		Crafty.c('Actor', {
			init: function() {
				this.requires('2D, Canvas');
			}
		});
		
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
			DEFAULT_WALK_SPEED: 2,
			DEFAULT_JUMP_SPEED: 2,
			RUNNING_SPEED: 5,
			RUNNING_JUMP_SPEED: 3,
			
			run_frames: 0,
		
			init: function() {
				this.requires('Actor, Color, Twoway, Gravity, Keyboard')
				.color('rgb(120, 125, 40)')
				.attr({
					w: 50,
					h: 50
				})
				.gravity('Ground')
				.twoway(this.DEFAULT_WALK_SPEED, this.DEFAULT_JUMP_SPEED)
				.bind('EnterFrame', function(){
		
					if (this.isDown('LEFT_ARROW') || this.isDown('RIGHT_ARROW')){
						
						this.accelerate();
						
					} 
					
				})
				.bind('KeyUp', function(e){
					if (e.key == Crafty.keys['LEFT_ARROW'] || e.key == Crafty.keys['RIGHT_ARROW']){
						this.walk_default_speed();
					}
				});
			},
			
			at: function(x, y){
				this.attr({
					x: x,
					y: y
				});
			},
			
			walk_default_speed: function(){;
				this.removeComponent('Twoway', false);
				this.addComponent('Twoway');
				this.run_frames = 0;
				//this.twoway(this.DEFAULT_WALK_SPEED, this.DEFAULT_JUMP_SPEED);
			},
			
			accelerate: function(){
				this.run_frames = this.run_frames + 1;
				if (this.run_frames == 60){
					this.removeComponent('Twoway', false);
					this.addComponent('Twoway');
					this.twoway(this.RUNNING_SPEED, this.RUNNING_JUMP_SPEED);
				}
			}
		});
    };
		
	/** Begin Tree **/	 
	function Tree(){
		this.tree = Crafty.e('Tree');
	};
	
	Tree.prototype.draw = function(x, y){
		this.tree.at(x, y);
	};				
	/** End Tree **/
	
	/** Begin Ground **/
	function Ground(){}
	
	Ground.prototype.draw = function(){
		var x_seed = 0;
		while (x_seed * 50 < GAME_WIDTH){
			Crafty.e('Ground').at(x_seed * 50, 400);
			x_seed = x_seed + 1;
		}			
	}
	
	/** End Ground **/
	
	/** Begin Player **/
	function Player(){
		this.player = Crafty.e('Player');
	};
	
	Player.prototype.draw = function(x, y){
		this.player.at(x, y);
	};
	/** End Player **/
	
	Sidescroller.prototype.init();
	Ground.prototype.draw();
	
	var player = new Player();
    player.draw(50, 50);
});