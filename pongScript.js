$(document).ready(function(){
	//boundary values in px
	var topLimit = 60;
	var botLimit = 610;
	//ball calculations
	//pixel boudnaries of paddle
	var leftPaddle = $("#playerPaddle").offset().left + $("#playerPaddle").width();
	var rightPaddle = $("#compPaddle").offset().left

	//X velocity pixels per cycle
	var xVel = 0;
	//Y velocity pixels per cycle
	var yVel = 0;
	var ballAnimation = function(){
		var xPos = $(".ball").offset()
	}

	setInterval(ballAnimation(),100);
	//paddle movement
	$(document).mousemove(function(mouse){
		var paddleCenter = $("#playerPaddle").height()/2;
		console.log("Mouse Y: "+mouse.pageY);
		var topBound = topLimit + paddleCenter;//lowest pixel value for center of paddle
		var botBound = botLimit - paddleCenter;//highest pixel value for center of paddle
		//if mouse is outside those bounds, dont change anything
		if(mouse.pageY < topBound){
			console.log("above");
			//snap to the top
			$("#playerPaddle").css("top", ""+topBound);
			$("#compPaddle").css("top", ""+topBound);
			return;
		}
		if(mouse.pageY > botBound){
			console.log("below");
			//snap to the bottom
			$("#playerPaddle").css("top", ""+botBound);
			$("#compPaddle").css("top", ""+botBound);
			return;
		}
		//set new height to center paddle at mouse Y coordinate
		$("#playerPaddle").css("top", ""+mouse.pageY-paddleCenter-topLimit);
		$("#compPaddle").css("top", ""+mouse.pageY-paddleCenter-topLimit)
	});


});
