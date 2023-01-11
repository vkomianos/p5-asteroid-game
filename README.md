Branched from touch-screen-controls

Additions:
- orientation-controls.js

Modification:
- game.html: <script src="js/orientation-controls.js"></script>
- js/game-code.js: function draw() (line 479) -> spaceship.move(getOrientationControls()); 
