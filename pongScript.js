$(document).ready(function(){
	var $player = $("#playerPaddle");
	var $computer = $("#compPaddle");
	var $board = $("#pongBoard");	
	var $ball = $(".ball");

	var animation;
	var intervalspd = 10;
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
		console.log("animation running");
		//horizontal bounds		
		if (xVel < 0) {//ball is moving left
			if($ball.position().left <= $player.width()){//ball hits left wall
				if(hitPlayer()){
					xVel = -xVel;
				} else {
					alert("Out of bounds left");
					clearInterval(animation);
					animation = false;
				}
			}
		} else if (xVel > 0) {//ball moving right
			if(($ball.position().left + $ball.width()) >= ($board.width() - $computer.width())){//ball hits right wall
				if(hitComp()){
					xVel = -xVel;
				} else {
					alert("Out of bounds right");
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
	};

	function hitPlayer(){
		if($ball.position().top >= $player.position().top &&
			$ball.position().top <= ($player.position().top + $player.height() - $ball.height())){		
			return true;
		} else {
			return false;
		}
	}

	function startAnimation(){
		//XY Velocity in pixels per cycle
		xVel = (Math.random()*5);
		yVel = (Math.random()*5);
		xPos = (Math.random()*($board.width()/2))+($board.width()/4);
		yPos = Math.random()*$board.height();
		$ball.css("top", yPos);
		$ball.css("left", xPos);
		//start ball animation
		animation = setInterval(ballAnimation, intervalspd);
	}

	function hitComp(){
		if($ball.position().top >= $computer.position().top &&
			$ball.position().top <= ($computer.position().top + $computer.height() - $ball.height())){
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
			$player.css("top", ""+topBound);
			$computer.css("top", ""+topBound);
			return;
		}
		if(mouse.pageY > botBound){
			//snap to the bottom
			$player.css("top", ""+botBound);
			$computer.css("top", ""+mouse.pageY);
			return;
		}
		//set new height to center paddle at mouse Y coordinate
		$player.css("top", ""+mouse.pageY-paddleCenter-topLimit);
		$computer.css("top", ""+mouse.pageY-paddleCenter-topLimit);
	});

	$(document).click(function(){
		if(!animation){
			startAnimation();
		} else {
			clearInterval(animation);
			animation = false;
		}
	});
});
