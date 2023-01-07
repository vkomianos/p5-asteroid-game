
let orientationLeft = false;
let orientationRight = false;

if (window.DeviceOrientationEvent) 
		{
			window.addEventListener('deviceorientation', handleOrientation);
			console.log("Device Orientation is enabled");
		} 
		else 
		{
			console.log("Device Orientation is not supported");
		}
	
		function handleOrientation(event) 
		{
			/*
			document.getElementById('x').innerHTML = 'Orientation_a ' + event.alpha;
			document.getElementById('y').innerHTML = 'Orientation_b ' + event.beta;
			document.getElementById('z').innerHTML = 'Orientation_c ' + event.gamma;
			document.getElementById('counter').innerHTML = 'Counter ' + counter++;
			*/
			
			if (event.gamma < -5 )
			{
				orientationLeft = true;
			}
			else if (event.gamma > 5 )
			{
				orientationRight = true;
			}
			else if (event.gamma > -5 && event.gamma < 5)
			{
				orientationLeft = false;
				orientationRight = false;
			}
			
		}
		
		
		function getOrientationControls()
		{
			if (orientationLeft)
			{
				return -1;
			}
	
			if (orientationRight)
			{
				return 1;
			}
		}