$(function() {
	// déclaration des variables et création des éléments
	var	contenant = $('#menu'),
		titreJeu = $('<h2/>'),
		boutonJouerSeul = $(materializeBtn),
		boutonJouerADeux = $(materializeBtn),
		contenantBoutons = $('<div/>');

	// réinitialiser le contenu
	contenant.empty();

	// modification des éléments
	titreJeu.html('Tresaure hunt');
	boutonJouerSeul.html('Jouer seul');
	boutonJouerADeux.html('Jouer à deux');

	// écouter les événements
	boutonJouerSeul.click(function () {
		jouerSeul();
	});
	boutonJouerADeux.click(function () {
		jouer(0);
	});

	// insertion des éléments
	contenant.append(titreJeu);
	contenantBoutons.append(boutonJouerSeul);
	contenantBoutons.append(boutonJouerADeux);
	contenant.append(contenantBoutons);

	function jouerSeul() {
		// déclaration des variables et création des éléments
		var popUp = $('<div/>');
		let popUpContent = $('<div/>'),
			popUpTitle = $('<h5/>'),
			boutonDebutant = $(materializeBtn),
			boutonAvance = $(materializeBtn),
			boutonExpert = $(materializeBtn),
			fermerPopUp = $('<span/>');

		// modification des éléments

		// attribution des classes
		popUp.addClass('popup');
		popUpContent.addClass('popup-content');
		fermerPopUp.addClass('close');

		// modification du contenu
		fermerPopUp.html('&times');
		popUpTitle.html('Choisissez un niveau de difficulté');
		boutonDebutant.html('Mode débutant');
		boutonAvance.html('Mode avancé');
		boutonExpert.html('Mode expert');

		// écouter les événements
		fermerPopUp.click(function() {
			popUp.remove();
		});
		boutonDebutant.click(function () {
			jouer(1);
		});
		boutonAvance.click(function () {
			jouer(2);
		});
		boutonExpert.click(function () {
			jouer(3);
		});

		// insertion des elements
		popUpContent.append(fermerPopUp);
		popUpContent.append(popUpTitle);
		popUpContent.append(boutonDebutant);
		popUpContent.append(boutonAvance);
		popUpContent.append(boutonExpert);
		popUp.append(popUpContent);
		contenant.append(popUp);
	}

	function jouer(num) {
		$(".popup").remove();
		$(contenant).hide();
		modeJeu = num;
		$("#jeu").show(200);
		demarrerPartie();
	}

});