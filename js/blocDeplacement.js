function deplacementValide(iCase) {
	return (
		listeCases[iCase].type === "piece" && // return true si la pièce de destination est une piece ET
		( listeCases[iCase].positionX === listeCases[iJoueurs].positionX || // que la piece soit sur la meme ligne que le joueur OU
			listeCases[iCase].positionY === listeCases[iJoueurs].positionY ) // que la piece soit sur la meme colonne que le joueur
		);
}

function determinerSensDeplacement(iCase) {
	var deplacement = {
		sens: null, // 1 horizontal, 2 vertical
		distance: null
	};
	var isHorizontal = false;
	if ( listeCases[iCase].positionY == listeCases[iJoueurs].positionY )
		isHorizontal = true;

	if (isHorizontal) {
		deplacement.sens = 1;
		deplacement.distance = (iCase - iJoueurs) * TAILLE_CASE;
	}
	else {
		deplacement.sens = 2;
		deplacement.distance = ( (Math.floor(listeCases[iCase].positionY / TAILLE_CASE)) - (Math.floor(listeCases[iJoueurs].positionY / TAILLE_CASE)) ) * TAILLE_CASE;
	}

	return deplacement;
}

function changerDeJoueur() {
	isJ1Turn = !isJ1Turn;
	clicAutorise = true; // on reactive le clic après avoir changé de joueur
}

function deplacerJoueurs(iCase) {
	var deplacement = determinerSensDeplacement(iCase);
	listeCases[iJoueurs].type = 'caseVide';

	var img = $("li#" + iJoueurs + " img"); // on récupère l'image du joueur
	var imgCaseDest = $("li#" + iCase + " img");

	if (deplacement.sens == 1)
  		img.animate({'left':deplacement.distance},'slow');
  	else {
  		img.animate({'top':deplacement.distance},'slow');
  	}

	imgCaseDest.hide(600, function () {
		imgCaseDest.attr("src", img.attr("src"));
  		img.hide();
  		imgCaseDest.show();

		iJoueurs = iCase;
		listeCases[iJoueurs].type = 'joueur';

		if(isJ1Turn) {
			imgCaseDest.attr("src", "./img/pieuvre.png");
			mettreAJourScore(joueur1);
		} else {
			imgCaseDest.attr("src", "./img/pirate.png");
			mettreAJourScore(joueur2);
		}
	});
}

function allerA (iCase) {
	if( deplacementValide(iCase) ) {
		deplacerJoueurs(iCase);
	} else {
		clicAutorise = true; // on reactive le clic
	}
}

function positionClic( x, y ) {
	var ligne = Math.floor(y / TAILLE_CASE),
		colonne = Math.floor(x / TAILLE_CASE);

	return ligne*NOMBRE_CASES_PAR_LIGNE + colonne;
}
