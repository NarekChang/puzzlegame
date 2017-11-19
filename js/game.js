$(document).ready(function() {

	function getRandomArbitrary(min, max) {
	    return (Math.random() * (max - min) + min);
	}

	function renderCellWrapper(){

		$("#score, #result").html(0);

		$(".cell-wrapper").remove();

		$('body').prepend('<style>.cell{background-image: url(images/bg_' + Math.round(getRandomArbitrary(1, 5)) + '.jpg)!important;</style>');

		var $cellWrapper = $('<div class="cell-wrapper"/>');
		$(".game-container").append( $cellWrapper );


		var gameContainerWidth = $(".cell-wrapper").width();
		$(".cell-wrapper").height( gameContainerWidth );

		var cellWidth = -(gameContainerWidth/3),

		arrayBgPos = ["0 0",  "0 " + cellWidth, "0 " + 2*cellWidth, cellWidth + " 0", cellWidth + " " + cellWidth, cellWidth + " " + 2*cellWidth, 2*cellWidth + " 0", 2*cellWidth + " " + cellWidth],
		correctPos = ["0 0",  "0 1", "0 2", "1 0", "1 1", "1 2", "2 0", "2 1"];

		for (var i = 1; i < 9; i++) {

			var left, top, col, row;

			if(i<=3){
				col=0;
				row = i;
			}
			if(i>=4){
				col = 1;
				row = i-3;				
			}
			if(i>=7){
				col = 2;
				row = i-6;				
			}

			left = cellWidth-(row*cellWidth);
			top = col*(-cellWidth);

			var n = 8 - i,
			rand = Math.round(getRandomArbitrary(0, n)),

			$cell = $('<span class="cell" data-correct-pos="' + correctPos[rand] + '" data-row="' + (row-1) + '" data-col="' + col + '" style="left:' + left + 'px;top:' + top + 'px;background-position:' + arrayBgPos[rand] + ';background-size:' + gameContainerWidth + 'px" />');

			$(".cell-wrapper").append( $cell );

			arrayBgPos.splice(rand, 1);
			correctPos.splice(rand, 1);
		}

		$cell = $('<span class="cell empty" data-correct-pos="2 2" data-row="' + 2 + '" data-col="' + 2 + '" style="left:' + (-2*cellWidth) + 'px;top:' + (-2*cellWidth) + 'px;" />');

		$(".cell-wrapper").append( $cell );
	}

	renderCellWrapper();

	$(".start-game").on("click", function(){renderCellWrapper();});

	function checkCell(){
		var correctLenght = 0;
		$(".cell").each(function(){
			var 
			correctPos = $(this).data("correct-pos"),
			col = $(this).data("col"),
			row = $(this).data("row"),
			pos = row + " " + col;

			if(correctPos == pos){
				correctLenght = correctLenght+1;
				if (correctLenght==9) {
					$(".result-block-wrap").removeClass("hide");
				}
			}
		});
	}

	$(".cell").live("click", function(){

		var 
		current_cell   = $(this),
		current_left   = current_cell.css("left"),
		current_top    = current_cell.css("top"),
		current_col    = current_cell.data("col"),
		current_row    = current_cell.data("row"),
		col_step_minus = ((current_col - 1)>-1) ? (current_col - 1) : 8,
		col_step_plus  = ((current_col + 1)<3) ? (current_col + 1) : 8,
		row_step_minus = ((current_row - 1)>-1) ? (current_row - 1) : 8,
		row_step_plus  = ((current_row + 1)<3) ? (current_row + 1) : 8;

		$(".cell").each(function(){
			if((($(this).data("col")==current_col && row_step_plus!=8 && $(this).data("row")==row_step_plus) || ($(this).data("col")==current_col && row_step_minus!=8 && $(this).data("row")==row_step_minus) || ($(this).data("row")==current_row && col_step_plus!=8 && $(this).data("col")==col_step_plus) || ($(this).data("row")==current_row && col_step_minus!=8 && $(this).data("col")==col_step_minus)) && $(this).hasClass("empty")){
				
				var 
				empty_cell = $(this),
				empty_left = empty_cell.css("left"),
				empty_top  = empty_cell.css("top"),
				empty_col  = empty_cell.data("col"),
				empty_row  = empty_cell.data("row");

				current_cell.css({
					"left" : empty_left,
					"top" : empty_top,
				})
				.data("col", empty_col)
				.data("row", empty_row);

				empty_cell.css({
					"left" : current_left,
					"top" : current_top
				})
				.data("col", current_col)
				.data("row", current_row);


				var score = +$("#score").html()+1;
				$("#score, #result").html(score);
			}

			checkCell();
		});

	});
});