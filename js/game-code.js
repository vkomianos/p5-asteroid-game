
		class Asteroid
		{
			/*
				Use to represent the asteroid objects
			*/
			constructor()
			{
				this.x;
				this.asteroidSpeed;
				this.y;
				
				this.exploded = false;
				
				this.minSpeed = 6;
				this.maxSpeed = 12;
				
				this.image = asteroidImage;
				this.explosionSound = createAudio("game-assets/explosion-05.wav");
				this.explosionImage = loadImage("game-assets/explosion-2.png");
				this.load();
			}
			
			load()
			{
				/*
					Asteroids are re-used
					When an asteroid falls of the screen (see if in display()) load() is called
				*/
				this.x = Math.floor(Math.random() * 1270); // random X position
				this.asteroidSpeed = Math.floor(Math.random() * (this.maxSpeed - this.minSpeed + 1) + this.minSpeed); // random speed between min and max speed
				this.y = 0;
				
				this.image = asteroidImage;
				this.exploded = false;
			}
			
			display() 
			{
				image(this.image, this.x, this.y+= this.asteroidSpeed); // each time an asteroid is displyed its position is updated (asteroids fall [y is increased])
				if (this.y > 591) // asteroid is dissappeared and load() is called to load again the asteroid 
				{
					this.load();
					return true;
				}
			}
			
			explode()
			{
				if (!this.exploded) // each asteroid can explode only once
				{
					this.exploded = true;
					this.image = this.explosionImage; // change the asteroid image with explosion
					this.explosionSound.play(); // explosion sound
					
					return true; // if explode returns true player loses a life
				}
			}
		}
		
		class AsteroidSwarm
		{
			/*
				This class handles the asteroid objects
			*/
			constructor()
			{
				this.increaseDifficulty = 0; // as difficulty is increased more asteroids will be coming
				this.asteroids = []; // keeps the Asteroid instances
				this.asteroidsPassed = 0; // it is also used for score
			}
			
			reset()
			{
				this.asteroids.length = 0;
				this.asteroidsPassed = 0;
				this.increaseDifficulty = 0;
			}
			
			addNewAsteroids(howMany)
			{
				for (let i = 0; i < howMany; i++)
				{
					let asteroid = new Asteroid();
					this.asteroids.push(asteroid);
				}
			}
			
			handleAsteroids()
			{
				for (let i = 0; i < this.asteroids.length; i++)
				{
					if (this.asteroids[i].display()) // display() returns true if an asteroid falls of the canvas
					{
						this.asteroidsPassed++; // and the asteroid's passage is completed
					}
				}
				
				this.handleDifficulty();
			}
			
			handleDifficulty()
			{
				// add asteroids as difficulty increases
				if (this.asteroids.length < (this.asteroidsPassed/20))
					this.addNewAsteroids(1);
			}
			
			checkForCollision(spaceship)
			{
				// not very precise yet 
				for (let i = 0; i < this.asteroids.length; i++)
				{
					if (Math.abs(this.asteroids[i].x - spaceship.x) < 50 && this.asteroids[i].y >= 420 && this.asteroids[i].y <= 500)
					{
						return this.asteroids[i].explode();
					}
				}
			}	
		}
		
		class SpaceShip
		{
			x = 640; // X position
			y = 420; // Y position
				
			constructor()
			{
				this.image = loadImage("game-assets/spaceship-2.png");
				this.engineSound = createAudio("game-assets/engine.wav");
			}
			
			display()
			{
				image(this.image, this.x, this.y);
			}
			
			move(move)
			{
				if (this.x > 40 && move < 0) // chech that will not get out of the left barrier
				{
					this.x += (move*10);
				}

				if (this.x < 1160 && move > 0) // chech that will not get out of the right barrier
				{
					this.x += (move*10);
				}
			}
			
			startEngineSound()
			{
				this.engineSound.play();
				this.engineSound.loop();
			}
			
			stopEngineSound()
			{
				this.engineSound.stop();
			}
		}
		
		class SpaceShipLives
		{	
			/*
				Show how many lives are left
			*/
			constructor()
			{
				this.lives = [];
				this.livesLeft = 3; // initial number of lives
				
				for (let i = 0; i < this.livesLeft; i++)
				{
					let live = loadImage("game-assets/spaceship-miniature.png");
					this.lives[i] = live;
				}
			}
			
			display()
			{
				this.showLives(this.livesLeft);
			}
			
			showLives(livesLeft)
			{
				for (let i = 0; i < livesLeft; i++)
				{
					image(this.lives[i], (i*40+10), 20); // defining the position of displayed objects
				}
			}
			
			reduceOneLive()
			{
				this.livesLeft--;
			}
			
			reset()
			{
				this.livesLeft = 3;
			}
		}
		
		/*
			Global variables to be used by our game
		*/
		let spaceShipLives; // object of class SpaceShipLives
		let background; // background-image
		let spaceship; // object of class SpaceShip
		let asteroidImage; // load the image once
		let asteroidSwarm; // object of class AsteroidSwarm
		let startGame = false;
		let startOnce = true;
		let gameOver = false;
		let paused = false;
		
		/*
			P5 functions preload(), setup(), draw() and keyPressed() are used
		*/
		function preload() 
		{
			background = loadImage("game-assets/moon-bg.jpg");		// load the background-image
			asteroidImage = loadImage("game-assets/asteroid-2.png"); // load once and the pass to Asteroid so that will not load each time an Asteroid is created
			spaceship = new SpaceShip();
		}
		
		function setup() 
		{
			spaceShipLives = new SpaceShipLives();
			createCanvas(1280, 591); // canvas size tied to the background-image
			asteroidSwarm = new AsteroidSwarm(); // it is going to handle the asteroids
			
			setupTouchScreenControls();
		}
		
		function draw() 
		{
			/*
				Checking game state, drawing our game's frames, getting input
			*/
			
			image(background, 0, 0);
			spaceship.display();
			spaceShipLives.display();
						
			showMessages(); // displays messages (if needed) depending on the game state
			
			drawTouchScreenControls();
			
			if (startGame && !gameOver && startOnce) // begin a new game
			{
				asteroidSwarm.reset();
				asteroidSwarm.addNewAsteroids(2);
				spaceship.startEngineSound();
				spaceShipLives.reset();
				startOnce = false;
			}
			
			if (gameOver) // game over
			{
				spaceship.stopEngineSound();
			}
			
			if (!gameOver && startGame && !paused) // while the game is played
			{
				asteroidSwarm.handleAsteroids(); // handle the asteroids
				
				if (asteroidSwarm.checkForCollision(spaceship)) // chech for collisions - if any then reduceOneLive
				{	
					spaceShipLives.reduceOneLive();
				}
				
				if (spaceShipLives.livesLeft == 0) // defines the player loses 
					gameOver = true;
				
				if (keyIsDown(37)) // left arrow is pressed
				{
					spaceship.move(-1);
				}
				
				if (keyIsDown(39)) // right arrow is pressed
				{
					spaceship.move(1);
				}
				
				spaceship.move(getTouchDirectionControl()); // get the touch controls - if any
				spaceship.move(getOrientationControls()); // get the orientation controls - if any
			}
		}
				
		function keyPressed()
		{
			if (keyCode == 78) // n is pressed - New game
			{
				startGame = true;
				startOnce = true;
				gameOver = false;
			}
			
			if (keyCode == 80) // p for pause is pressed
			{
				if (startGame && !gameOver && !paused)
					paused = true;
				else if (startGame && !gameOver && paused)
					paused = false;
					
				if (paused)
					spaceship.stopEngineSound();
					
				if (!paused)
					spaceship.startEngineSound();
			}
		}

		function showMessages()
		{
			textSize(20);
			text("Score: " + asteroidSwarm.asteroidsPassed, 30, 120); // Score is shown
		
			if (!startGame)
				rect(280, 280, 680, 120); // rectangle (window) to show the message to start game
				
			if (gameOver)
				rect(280, 220, 680, 180); // rectangle (window) to show the message game over and start game
		
			textSize(50);
			if (!startGame || gameOver) // provide instructions
			{
				text('Press N to start a new game.', 300, 300, 800, 200);
				textSize(25);
				text('Use the left and right arrows to avoid the asteroids.', 340, 360, 800, 200);
			}
			
			if (gameOver)
			{
				textSize(50);
				text('Game over!', 500, 280);
			}
			
			if (paused)
			{
				textSize(50);
				text('Game paused!', 500, 280);
			}
		}
	
