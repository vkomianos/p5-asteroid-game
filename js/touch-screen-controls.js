let controllerPad;
let controllerLeft;
let controllerRight;
let controllerNew;
let controllerPause;

let leftIsPressed;
let rightIsPressed;

document.addEventListener('contextmenu', event => event.preventDefault()); // disable context menu that would appear on long taps

function setupTouchScreenControls()
{
	controllerPad = createImg("./game-assets/game-controller-2.png");
	controllerLeft = createImg("./game-assets/arrow-left.png");
	controllerRight = createImg("./game-assets/arrow-right.png");
	controllerNew = createImg("./game-assets/n-button.png");
	controllerPause = createImg("./game-assets/p-button.png");
	
	controllerLeft.touchStarted(touchLeftPressed);
	controllerLeft.mouseReleased(releasedTouchControls);
	
	controllerRight.touchStarted(touchRightPressed);
	controllerRight.mouseReleased(releasedTouchControls);
	
	controllerNew.mousePressed(newGameTouchPressed);
	controllerPause.mousePressed(pauseGameTouchPressed);
}

function drawTouchScreenControls()
{
	controllerPad.position(100,600);
	controllerLeft.position(120,700);
	controllerRight.position(870,700);
	controllerNew.position(380, 700);
	controllerPause.position(640, 700);
}

function releasedTouchControls()
{
	leftIsPressed = false;
	rightIsPressed = false;
}

function touchLeftPressed()
{
	leftIsPressed = true;
	rightIsPressed = false;
}

function touchRightPressed()
{
	leftIsPressed = false;
	rightIsPressed = true;
}

function getTouchDirectionControl()
{
	if (leftIsPressed)
	{
		return -1;
	}
	
	if (rightIsPressed)
	{
		return 1;
	}
}

function newGameTouchPressed()
{
	startGame = true;
	startOnce = true;
	gameOver = false;
}

function pauseGameTouchPressed()
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
