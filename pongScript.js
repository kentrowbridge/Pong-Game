$(document).ready(function(){
	$(document).keydown(function(key){
		//check bounds of board
		var shift = "10px";//standard shift amount
		//calculate bounds
		if()
		switch(parseInt(key.which, 10)){
			//up arrow
			case 38:
				$("#playerPaddle").animate({top: "-="+shift},"fast");
				break;
			//down arrow
			case 40:
				$("#playerPaddle").animate({top: "+="+shift},"fast");
				break;
		}
	});)
});
