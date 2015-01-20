$(document).ready(function(){
	var $player = $("#playerPaddle");
	var $computer = $("#compPaddle");
	var $board = $("#pongBoard");	
	var $ball = $(".ball");

	var animation;
	var intervalspd = 10;
	var difficulty = "hard";//easy-medium-hard range
	//The units of the velocity values are pixels/ms
	//old and new values of paddle velocity
	//TODO
	//XY Velocity in pixels per cycle
	var xVel;
	var yVel;
	var xPos;
	var yPos;
	$ball.css("top", yPos);
	$ball.css("left", xPos);
	//start ball animation
	var animation;
	//boundary values in px
	var topLimit = Math.floor($board.offset().top);
	var botLimit = Math.floor(topLimit+$board.height());
	//ball calculations
	startAnimation();
	/*
	 * Function that handles the movement of the ball
	 */
	function ballAnimation(){
		getBounds();
		//horizontal bounds		
		if (xVel < 0) {//ball is moving left
			if($ball.position().left <= $player.width()){//ball hits left wall
				if(hitPlayer()){
					//once ball hits player bounce off with respect to paddle velocity
					yVel += Math.random()*2;
					xVel = -xVel;
				} else {
					clearInterval(animation);
					animation = false;
				}
			}
		} else if (xVel > 0) {//ball moving right
			if(($ball.position().left + $ball.width()) >= ($board.width() - $computer.width())){//ball hits right wall
				if(hitComp()){
					yVel += Math.random()*2;
					xVel = -xVel;
				} else {
					clearInterval(animation);
					animation = false;
				}
			}
		}

		// //vertical bounds
		if (yVel < 0) {//ball is moving up
			if($ball.position().top <= 0){//ball hits left wall
				yVel = -yVel;//reverse x vector
			}
		} else if (yVel > 0) {//ball moving down
			if(($ball.position().top + $ball.height()) >= $board.height()){//ball hits right wall
				yVel = -yVel;//reverse x vector
			}
		}
		//move ball
		$ball.css("left", $ball.position().left+xVel);
		$ball.css("top", $ball.position().top+yVel);

		moveComputer(difficulty);
	};

	function moveComputer(diff){
		var centerDiff = ($computer.position().top + $computer.height()/2) - ($ball.position().top + $ball.height()); 
		var paddleSpeed = 0;
		switch(diff){
			case "easy":
				paddleSpeed = 3;
				break;
			case "hard":
				paddleSpeed = 10;
				break;
			default://medium default
				paddleSpeed = 6;
				break;
		}
		//move the paddle
		if(centerDiff > 0){
			//ball is above paddle
			if($computer.position().top < paddleSpeed){
				$computer.css("top", 0);
			} else {				
				$computer.css("top", $computer.position().top - paddleSpeed);
			}
		} else if(centerDiff < 0){
			//ball is below paddle
			if(($board.height() - ($computer.position().top + $computer.height())) < paddleSpeed){
				$computer.css("top", $board.height() - $computer.height());
			} else {				
				$computer.css("top", $computer.position().top + paddleSpeed);
			}
		}
	}

	function startAnimation(){
		//XY Velocity in pixels per cycle
		xVel = (Math.random())+2;
		yVel = (Math.random())+2;
		xPos = (Math.random()*($board.width()/2))+($board.width()/4);
		yPos = Math.random()*$board.height();
		$ball.css("top", yPos);
		$ball.css("left", xPos);
		//start ball animation
		animation = setInterval(ballAnimation, intervalspd);
	}

	function hitPlayer(){
		if($ball.position().top >= $player.position().top - $ball.height()/2 &&
			$ball.position().top <= ($player.position().top + $player.height() - ($ball.height()/2))) {		
			return true;
		} else {
			return false;
		}
	}

	function hitComp(){
		if($ball.position().top >= $computer.position().top + $ball.height()/2 &&
			$ball.position().top <= ($computer.position().top + $computer.height() - ($ball.height()/2))) {
			return true;
		} else {
			return false;
		}
	}

	//function used to make sure the ball will react only with present window size
	function getBounds(){
		//boundary values in px
		topLimit = Math.floor($("#pongBoard").offset().top);
		botLimit = Math.floor(topLimit+$("#pongBoard").height());
		//ball calculations
		//pixel boudnaries of board
		leftBound = Math.floor($("#pongBoard").offset().left);
		rightBound = Math.floor($("#pongBoard").offset().left + $("#pongBoard").width());
	}
	//paddle movement
	$(document).mousemove(function(mouse){
		var paddleCenter = $player.height()/2;
		var topBound = topLimit + paddleCenter;//lowest pixel value for center of paddle
		var botBound = botLimit - paddleCenter;//highest pixel value for center of paddle
		//if mouse is outside those bounds, dont change anything
		if(mouse.pageY < topBound){
			//snap to the top
			$player.css("top", ""+0);
			return;
		}
		if(mouse.pageY > botBound){
			//snap to the bottom
			$player.css("top", ""+$board.height() - $player.height());
			return;
		}
		//set new height to center paddle at mouse Y coordinate
		$player.css("top", ""+mouse.pageY-paddleCenter-topLimit);
	});

	$(document).click(function(){
		if(!animation){
			startAnimation();
		} else {
			clearInterval(animation);
			animation = false;
		}
	});

	$(document).keypress(function(keyEvent){
		if(keyEvent.keyCode == 32){
			console.log("spacebar pressed");
		}
	});
});
