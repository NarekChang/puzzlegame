function ready() {
	function gameContainerRiseze(){
		var gameContainerWidth = document.getElementsByClassName('cell-wrapper')[0].offsetWidth;
		document.querySelector(".cell-wrapper").style.height = gameContainerWidth;
	}

	gameContainerRiseze();

	window.onresize = function(){
		gameContainerRiseze()
	}

	$(".start-game").on("click", function(){
		
		var that = $(this).parent().parent();
		
		that.addClass("hide");
	});
}

document.addEventListener("DOMContentLoaded", ready);