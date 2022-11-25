# Branch information
Added orientation controls (use on mobile devices). 
- Minor changes on game.html
- Minor changes on js/game-code.html
- New code file: js/orientation-controls.js


![Gameplay](/docs/p5-asteroids-gameplay-compressed.gif)

# P5 asteroids game
Another version of the Asteroids game. Developed for the [Interactive Multimedia course] (https://avarts.ionio.gr/en/studies/undergraduate/courses-descriptions/ava341/) at the Dept. of Audio and Visual Arts, Corfu, Greece. The game is intended to be used by the course students as a template which they can modify to make their own 2D game. The game is developed for PC and browser.



## Gameplay
Player can tilt the phone (or tablet) left/right to move the spaceship and avoid the asteroids. The game becomes more difficult as player keeps playing by adding more asteroids. Asteroids have varying speed. The more asteroids the player survives the greater score he/she gets.

## Project/code structure
The game's code resides in js/game-code.js. It is loaded by game.html and it depends on js/p5.min.js as the P5 library is used for graphics and input operations. It is organized in 4 classes of which 3 are tied to the game entities (Asteroid, AsteroidSwarm, SpaceShip) and one (SpaceShipLives) is used to display player's lives.

Classes:
- Asteroid
- AsteroidSwarm
- SpaceShip
- SpaceShipLives

The code has 5 functions outside of classes, that are used to control game operations such as the loading (preload()), the setup, the update of the game view/state (draw()), the player input (keyPressed()), and the display of messages (showMessages()).

Functions:
- preload()
- setup()
- draw()
- keyPressed()
- showMessages()

See js/game-code.js for more information.

The folder game-assets contains the images and sounds used in the game.

Get the [repository] (https://github.com/vkomianos/p5-asteroids-game.git).

## Play online (for mobile devices)
https://users.ionio.gr/~vkomianos/projects/p5-asteroids-game-touch-and-orientation-controls/game.html


## Libraries used
The game uses the [p5 javascript library] (https://p5js.org/) and the [v1.5.0] (https://github.com/processing/p5.js/releases/download/v1.5.0/p5.min.js)is included in this project.
