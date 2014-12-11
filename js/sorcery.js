//C'est sale les gros fichier ^^

$( function() {

	var Joueur = function (id, nom, prenom, pseudo, mail, passw, exp, vie, niveau, force){
		this.id = id;
		this.no = nom;
		this.prenom = prenom;
		this.pseudo = pseudo;
		this.mail = mail;
		this.passw = passw;
		this.exp = exp;
		this.vie = vie;
		this.niveau = niveau;
		this.force = force;
	};

	var Monstre = function(id, nom, vie, force) {
		this.id = id;
		this.nom = nom;
		this.vie = vie;
		this.force = force;
	};

	var Objet = function(id, nom, type){
		this.id = id;
		this.nom = nom;
		this.type = type;
	};




	var lesObjets = [];
	var lesMonstres = [];
	var joueur = new Joueur(null,'noName','noName','noName',null,null,0,100,1,5);
	var map = $("#map img");

	var size = $( window ).height();
	var largeur = $( window ).width();
	var lvlup = 20;
	var attaquer;
	var isStarted = false;
	var battleStarted = false;
	var prompted = false;
	var poped = false;

	var monsterlife;
	var defaultlife;
	var percent;
	var poison;

	var error = $('#error');
	var chapters = $("section");
	var status = $("#status");
	var battle = $("#battles");

	

	var container = $(".container");
	container.height(size);


	$('#battlezone').hide();
	$('*[target=inventaire]').toggle();
	map.hide();
	status.hide();
	error.hide();
	

	setInterval(function(){
		if(battleStarted){
			var popornot = Math.floor((Math.random() * 3) + 0);
			if(poped){
				$('#battlezone').fadeIn(400);
				monsterpop();
				poped = false;
			}
		}
	}, 1000);

	if(!isStarted){
		startGame();
		loadMonstre();
		loadObjet();
		$('#playerlife').html('PV : ' + joueur.vie);
	}

	$(document).on("click", "section button[id]", function() {
		var id = $(this).attr("id");
		switch(id){
			case 'nothing':
				$('#error p').html('Il n\'y a rien ici !');
				error.show();
			break;
			case 'eat':

			break;
			case 'clue1':
				$('#error p').html('Indice 1');
				error.show();
			break;
			case 'clue2':
				$('#error p').html('Indice 1');
				error.show();
			break;
			case 'hit':
				$('#error p').html('Rrrrrrh Attention aux prisonniers !!! ');
				error.show();
				hit(Math.floor((Math.random() * 50) + 1));
			break;
			case 'poison':
				$('#error p').html('Arrrrgh du poison !!! ');
				error.show();
				poison = setInterval(function(){
					hit(1);
				}, 1000);
			break;
		}
	});

	$(document).on("click", "#clues .clue", function() {
		var id = $(this).attr("id");
		var img = $('<img/>');
		img.attr({
			src: 'img/'+id+'.png',
			alt: id
		});
		switch(id){
			case 'clue1':
				$('#error p').html(img);
				error.show();
			break;
			case 'clue2':
				$('#error p').html(img);
				error.show();
			break;
		}
	});


	$(document).on("click", "section button[go]", function() {
		// alert($(this).attr("go"));
		if($(this).attr("door")){
			$('#error p').html('Vous avez besoin d\'une clé !');
			error.show();
		}
		else if($(this).attr("go") == "exit"){
			gotoSection($(this).attr("go"));
			endGame();
			clearInterval(attaquer);
		}
		else if($(this).attr("go") == "death"){
			gotoSection($(this).attr("go"));
			endGame();
			clearInterval(attaquer);
		}else if($(this).attr("go") == "start"){
			status.show();
			gotoSection($(this).attr("go"));
		}
		else{
			gotoSection($(this).attr("go"));
		}
	} );

	function action(action){
		switch(action){
			case 'reset':
				joueur = new Joueur(null,'noName','noName','noName',null,null,0,100,1,5);
				inventaire = null;
				lvlup = 20;
				$('#lvl span').html(1);
				$('#xp span').html(0);
				$('#items').html('');
				$('#playerlife').html('PV : ' + joueur.vie);
				clepop('next');
				battleStarted = false;
				poped = false;
			break;
		}
	}

	$(document).on("click", "#inventaire", function() {
		$('*[target=inventaire]').fadeToggle({
			easing : 'swing',
			duration : 600
		});	
	});

	$(document).on("click", "#items .key", function() {
		var key = $(this).attr('id');
		var door = $('section button').attr('door');
		if(key == door){
			gotoSection($('section button[door]').attr("go"));
			$(this).remove();
		}	
	});
	
	$(document).on("click", "#items .item", function() {
		use($(this).attr("id"));
		$(this).remove();
	} );

	$(document).on("click", "#resume", function() {
		error.hide();
	});

	$(document).on("click", "#battles .hit", function() {
		monsterlife = monsterlife - joueur.force;
		percent = (monsterlife/defaultlife)*100; 
		$(this).next('#life').css("width", percent+'%');
		if(percent <= 0){
			poped = true;
			$('#battlezone').fadeOut(400);
			clearInterval(attaquer);
			potionpop();
			joueur.exp = defaultlife * 1,37;
			$('#xp span').html(joueur.exp);
			if(joueur.exp > lvlup){
				lvlup = lvlup * 1.79;
				joueur.niveau = joueur.niveau + 1;
				$('#lvl span').html(joueur.niveau);
			}
		}
	} );
	
	function gotoSection(key) {
		var chapter = chapters.filter("#" + key);
		chapter.css("background-image", "url(img/bg/wall.jpg)");
		var currentChapter = $("section");

		slide(chapter, currentChapter);
		container.append(chapter);
		
		if(key !='intro' && key !='death'){
			map.attr({
				id: key,
				src: 'img/map/'+key+'.png',
				alt: key
			});
			map.show();
		}
	}
	
	function use(id){
		switch (id){
			case 'Vin':
				joueur.vie = joueur.vie + 20;
			break;
			case 'Potion':
				joueur.vie = joueur.vie + 20;
			break;
			case 'Remontant':
				joueur.vie = joueur.vie + 20;
			break;
		}
		$('#playerlife').html('PV : ' + joueur.vie);
	}
	
	function hit(pv) {
		//alert(joueur.vie - pv);
		joueur.vie = joueur.vie - pv;
		$('#playerlife').html('PV : ' + joueur.vie);
		if(joueur.vie <= 0){
			endGame();
			gotoSection('death');
		}
	}
	
	function startGame() {
		isStarted = true;
		chapters.not("#intro").remove();
		$("#intro").css("background-image", "url(img/bg/intro.jpg)");
	}
	
	function endGame() {
		$('#battlezone').hide();
		clearInterval(attaquer);
		clearInterval(poison);
		battleStarted = false;
		map.hide();
		status.hide();
		$('*[target=inventaire]').hide();
	}

	function slide(chapter, currentChapter){
		//alert(currentChapter.text())
	

		var largeur = $(document).width();
		var hauteur = $(document).height();
		var direction = Math.floor((Math.random() * 4) + 1);

		if(chapter.attr('id') == 'hall'){
			battleStarted = true;
			poped = true;
		}

		if(chapter.has('action')){
			action($('action').attr('name'));
		}

		//alert(largeur);
		switch(direction){
			case 1:
				currentChapter/*.css({left:'0px'})*/.animate({left:'-'+largeur+'px'}, 1300);
				chapter.css({left: largeur+'px'}).animate({left:'0px'}, 1300).queue(function(){
					currentChapter.css({left:'0px'});
					currentChapter.remove();
					$(this).dequeue();
				});
			break;
			case 2:
				currentChapter.animate({left:largeur+'px'}, 1300);
				chapter.css({left: '-'+largeur+'px'}).animate({left:'0px'}, 1300).queue(function(){
					currentChapter.css({left:'0px'});
					currentChapter.remove();
					$(this).dequeue();
				});
			break;
			case 3:
				currentChapter.animate({top:'-'+hauteur+'px'}, 1300);
				chapter.css({top: hauteur+'px'}).animate({top:'0px'}, 1300).queue(function(){
					currentChapter.css({top:'0px'});
					currentChapter.remove();
					$(this).dequeue();
				});
			break;
			case 4:
				currentChapter.animate({top:hauteur+'px'}, 1300);
				chapter.css({top: '-'+hauteur+'px'}).animate({top:'0px'}, 1300).queue(function(){
					currentChapter.css({top:'0px'});
					currentChapter.remove();
					$(this).dequeue();
				});
			break;
		}
	}

	function loadObjet(){
		$.ajax({
		type: "GET",
		url : 'php/load.php',
		data : 'loadObjets=true',
		timeout: 3000,
		dataType: 'json',
       	 // Le type de données à recevoir, ici, du HTML.
       	success: function(data) {
       		//alert(data);
       	
          	$.each(data.objets, function(key, val) {
				//alert(val.id + ' - ' + val.nom+ ' - ' + val.typenom);
				var objet = new Objet(val.id, val.nom, val.typenom);
				lesObjets.push(objet);

			});
			//alert(lesObjets[6].nom);
      	},
        error: function(jqXHR, textStatus, errorThrown){
			alert(textStatus);
			alert(errorThrown);
		}

		});
	}

	function loadMonstre(){
		$.ajax({
		type: "GET",
		url : 'php/load.php',
		data : 'loadMonstre=true',
		timeout: 3000,
		dataType: 'json',
       	 // Le type de données à recevoir, ici, du HTML.
       	success: function(data) {
			$.each(data.monster, function(key, val) {
				//alert(val.id + ' - ' + val.nom+ ' - ' + val.vie+ ' - ' + val.strength);
				var monstre = new Monstre(val.id, val.nom, val.vie, val.strength);
				lesMonstres.push(monstre);					
			});
      	},
        error: function(jqXHR, textStatus, errorThrown){
			alert(textStatus);
			alert(errorThrown);
		}

		});
	}

	function loadJoueur(pseudo, mdp){
		$.ajax({
		type: "GET",
		url : 'php/load.php',
		data : 'loadJoueur=true&pseudo='+pseudo+'&passw='+passw+'',
		timeout: 3000,
		dataType: 'json',
       	 // Le type de données à recevoir, ici, du HTML.
       	success: function(data) {
          //alert(data); 
          joueur = new Joueur(data.joueur.id, data.joueur.nom, data.joueur.prenom,
           data.joueur.pseudo, data.joueur.mail, data.joueur.passw, data.joueur.exp,
            data.joueur.vie, data.joueur.niveau, data.joueur.strength);
      	},
        error: function(jqXHR, textStatus, errorThrown){
			alert(textStatus);
			alert(errorThrown);
		}

		});
	}

	function saveJoueur(nom,prenom,pseudo,mail,passw,vie,exp,niveau,force){
		$.ajax({
		type: "GET",
		url : 'php/save.php',
		data : 'saveJoueur=true&nom='+nom+'&prenom='+prenom+'&pseudo='+pseudo+'&mail='+
		mail+'&passw='+passw+'&vie='+vie+'&exp='+exp+'&niveau='+niveau+'&force='+force+'', 
		timeout: 3000,
       	 // Le type de données à recevoir, ici, du HTML.
        error: function(jqXHR, textStatus, errorThrown){
			alert(textStatus);
			alert(errorThrown);
		}

		});
	}

	function updateJoueur(id,nom,prenom,pseudo,mail,passw,vie,exp,niveau,force){
		$.ajax({
		type: "GET",
		url : 'php/update.php',
		data : 'upJoueur=true&id='+id+'&nom='+nom+'&prenom='+prenom+'&pseudo='+pseudo+'&mail='+mail+'&passw='+passw+'&vie='+vie+'&exp='+exp+'&niveau='+niveau+'&force='+force+'', 
		//data : 'upInventaire=true&id=2&idObjet=8',
        
		timeout: 3000,
		dataType: 'text',
       	 // Le type de données à recevoir, ici, du HTML.
        error: function(jqXHR, textStatus, errorThrown){
			alert(textStatus);
			alert(errorThrown);
		}

		});
	}


	function monsterpop(){
		var nb_monstre = Math.floor((Math.random() * (lesMonstres.length-1)) + 0);
		$('#battlezone h2').html(lesMonstres[nb_monstre].nom);
		$('#monstre img').attr({
			src : 'img/monsters/'+lesMonstres[nb_monstre].nom+'.jpg',
			alt : lesMonstres[nb_monstre].nom
		});

		$('#monstre span').attr({
			id : lesMonstres[nb_monstre].nom,
		});

		$('#monstre #life').attr({
			life : lesMonstres[nb_monstre].vie
		});
		$('#monstre #life').css('width', '100%');

		monsterlife = lesMonstres[nb_monstre].vie;
		defaultlife = lesMonstres[nb_monstre].vie;

		attaquer = setInterval(function(){
			hit(lesMonstres[nb_monstre].force);
		}, 1500);

	}

	function clepop(id){
		$('#items').append('<li class="key" id="'+id+'"><img src="img/items/key.jpg" alt="key"></li>');			
	}

	function potionpop(){
		var pop = Math.floor((Math.random() * 10) + 0);
		if(pop%2 == 0){
			var nb_item = Math.floor((Math.random() * (lesObjets.length-1)) + 0);
			if(lesObjets[nb_item].type == "potion"){
				$('#error p').html('Vous avez trouvé une potion !');
				error.show();
				$('#items').append('<li class="item" id="'+lesObjets[nb_item].nom+'"><img src="img/items/'+
					lesObjets[nb_item].nom+'.jpg" alt="'+lesObjets[nb_item].nom+'"></li>');
			}
		}				
}

} );