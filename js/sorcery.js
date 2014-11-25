$( function() {
	/*Centre les éléments*/
	var size = $( window ).height();
	var container = $(".container");
	container.height(size);
	var centerY = (size / 4);// - ($(".section").height() / 2);
	$(".section").css("top", centerY);


	var isStarted;
	var chapters = $("section");
	var status = $("#status");
	//var buttons = $(".section button");

	if(!isStarted){
		startGame();
	}
	

	$(document).on("click", "section button", function() {
		gotoSection($(this).attr("go"));
	} );
	
	
	function gotoSection(key) {
		var chapter = chapters.filter("#" + key);
		chapter.css("background-image", "url(img/"+key+".jpg");
		var currentChapter = $("section");

		slide(chapter, currentChapter);

		container.append(chapter);	
	}
	
	function getLife() {
		//...
	}
	
	function setLife(v) {
		//...
	}
	
	function loseOneLife() {
		//...
	}
	
	function startGame() {
		isStarted = true;
		chapters.not("#intro").remove();
		$("#intro").css("background-image", "url(img/intro.jpg)");
		$("#intro").css("background-position", "center");
	}
	
	function endGame() {
		//...
	}

	function slide(chapter, currentChapter){
		//alert(currentChapter.text())
	

		var largeur = $(document).width();
		var hauteur = $(document).height();

		var direction = Math.floor((Math.random() * 4) + 1);

		//alert(largeur);
		switch(direction){
			case 1:
				chapter.css({left: largeur+'px'}).animate({left:'0px'}, 1000).queue(function(){
					currentChapter.remove();
					$(this).dequeue();
				});
			break;
			case 2:
				chapter.css({left: '-'+largeur+'px'}).animate({left:'0px'}, 1000).queue(function(){
					currentChapter.remove();
					$(this).dequeue();
				});
			break;
			case 3:
				chapter.css({top: hauteur+'px'}).animate({top:'0px'}, 1000).queue(function(){
					currentChapter.remove();
					$(this).dequeue();
				});
			break;
			case 4:
				chapter.css({top: '-'+hauteur+'px'}).animate({top:'0px'}, 1000).queue(function(){
					currentChapter.remove();
					$(this).dequeue();
				});
			break;
		}
	}
} );
