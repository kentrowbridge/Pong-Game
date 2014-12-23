$(document).ready(function(){
	//boundary values in px
	var topLimit = 60;
	var botLimit = 610;
	//var leftLimit = ;
	//var rightLimit = ;
	//ball calculations
	//pixel boudnaries of paddle
	var playerRight = $("#playerPaddle").offset().left + $("#playerPaddle").width();
	var compLeft = $("#compPaddle").offset().left
	//X velocity

	//Y velocity

	//paddle movement
	$("#pongBoard").mousemove(function(mouse){
		var paddleCenter = $("#playerPaddle").height()/2;
		var topBound = topLimit + paddleCenter;//lowest pixel value for center of paddle
		var botBound = botLimit - paddleCenter;//highest pixel value for center of paddle
		//if mouse is outside those bounds, dont change anything
		if(mouse.pageY < topBound){
			//snap to the top
			$("#playerPaddle").css("top", ""+topLimit+paddleCenter);
			$("#compPaddle").css("top", ""+topLimit+paddleCenter);
			return;
		}
		if(mouse.pageY > botBound){
			$("#playerPaddle").css("top", ""+botLimit-paddleCenter);
			$("#compPaddle").css("top", ""+botLimit-paddleCenter);
			return;
		}
		//set new height to center paddle at mouse Y coordinate
		$("#playerPaddle").css("top", ""+mouse.pageY-paddleCenter-topLimit);
		$("#compPaddle").css("top", ""+mouse.pageY-paddleCenter-topLimit)
	});


});
