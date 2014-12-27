$(document).ready(function(){
	//boundary values in px
	var topLimit = Math.floor($("#pongBoard").offset().top);
	var botLimit = Math.floor(topLimit+$("#pongBoard").height());
	//ball calculations
	//pixel boudnaries of board
	var leftBound = Math.floor($("#pongBoard").offset().left);
	var rightBound = Math.floor($("#pongBoard").offset().left + $("#pongBoard").width());

	//XY Velocity in pixels per cycle
	var xVel = 10;
	var yVel = 0;

	//start ball animation, once every 0.1s	
	var count= 0;
	var ball = $(".ball");
	var animation = setInterval(ballAnimation, 10);

	/*
	 * Function that handles the movement of the ball
	 */
	function ballAnimation(){
		//ball is moving left
		// if (xVel < 0) {
		// 	console.log("Ball is moving left");
		// 	if(ball.offset().left <= leftBound){//ball hits left wall
		// 		console.log("Hit left wall");
		// 		xVel = -xVel;//reverse x vector
		// 	}
		// } else if (xVel > 0) {//ball moving right
		// 	console.log("Ball moving right");
		// 	if((ball.offset().left + ball.width()) >= rightBound){//ball hits right wall
		// 		console.log("Hit right wall");
		// 		xVel = -xVel;//reverse x vector
		// 	}
		// }
		var nextX = ball.offset().left + xVel;
		var nextY = ball.offset().top+yVel;
		ball.css("left", ""+nextX);
		console.log("It moved");

	};

	//paddle movement
	$(document).mousemove(function(mouse){
		var paddleCenter = $("#playerPaddle").height()/2;
		var topBound = topLimit + paddleCenter;//lowest pixel value for center of paddle
		var botBound = botLimit - paddleCenter;//highest pixel value for center of paddle
		//if mouse is outside those bounds, dont change anything
		if(mouse.pageY < topBound){
			//snap to the top
			$("#playerPaddle").css("top", ""+topBound);
			$("#compPaddle").css("top", ""+topBound);
			return;
		}
		if(mouse.pageY > botBound){
			//snap to the bottom
			$("#playerPaddle").css("top", ""+botBound);
			$("#compPaddle").css("top", ""+mouse.pageY);
			return;
		}
		//set new height to center paddle at mouse Y coordinate
		$("#playerPaddle").css("top", ""+mouse.pageY-paddleCenter-topLimit);
		$("#compPaddle").css("top", ""+mouse.pageY-paddleCenter-topLimit);
	});
	$(document).click(function(){
		clearInterval(animation);
	});
});
