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
	verifFinJeuPlusDeCasesAccessibles();

	if (modeJeu === 0 || isJ1Turn) {
		clicAutorise = true; // on reactive le clic après avoir changé de joueur
	} else {
		deplacerIA(modeJeu);
	}
}

function deplacerIA(modeJeu) {
	let iCase;
	switch (modeJeu) {
		case 1:
			iCase = choisirCaseIADebutant();
			break;
		case 2:
			iCase = choisirCaseIAAvance();
			break;
		default:
			iCase = choisirCaseIAExpert();
			break;
	}
	window.setTimeout(function() {deplacerJoueurs(iCase);}, 500);
}

function choisirCaseIADebutant() {
	var casesAccessibles = determinerCasesAccessibles(iJoueurs),
		randomCase = Math.floor(Math.random() * casesAccessibles.length);
	return casesAccessibles[randomCase];
}

function choisirCaseIAAvance() {
	var casesAccessiblesJoueur = determinerCasesAccessibles(iJoueurs),
		casesAccessiblesCase,
		caseTrouvee = false,
		indiceCase;

	while(!caseTrouvee) {
		var maxValeur = 0;
		casesAccessiblesJoueur.some(function(iCase) {
			if (listeCases[iCase].valeur === 100) {
				indiceCase = iCase;
				maxValeur = listeCases[iCase].valeur;
				return true;
			}
			else {
				if (listeCases[iCase].valeur > maxValeur) {
					indiceCase = iCase;
					maxValeur = listeCases[iCase].valeur;
				}
				return false;
			}
		});

		if (maxValeur === 100) {
			return indiceCase;
		}

		casesAccessiblesCase = determinerCasesAccessibles(indiceCase);
		var isCentAround = casesAccessiblesCase.some(function(iCase) {
			return listeCases[iCase].valeur === 100;
		});

		if(!isCentAround || casesAccessiblesJoueur.length < 2) {
			caseTrouvee = true;
		} else {
			casesAccessiblesJoueur.slice(indiceCase, 1);
		}
	}
	return indiceCase;
}

function choisirCaseIAExpert() {
	var casesAccessiblesJoueur = determinerCasesAccessibles(iJoueurs),
		casesAccessiblesCase,
		indiceMaxDifference,
		maxDifference = null,
		maxValeurAdversaire;

	casesAccessiblesJoueur.forEach(function(iCaseJoueur) {
		var valeurJoueur = listeCases[iCaseJoueur].valeur;
		maxValeurAdversaire = 0;
		determinerCasesAccessibles(iCaseJoueur).forEach(function(iCaseAdversaire) {
			if (listeCases[iCaseAdversaire].valeur > maxValeurAdversaire) {
				maxValeurAdversaire = listeCases[iCaseAdversaire].valeur;
			}
		});
		if (!maxValeurAdversaire) {
			return;
		}

		if (maxDifference === null || maxDifference < valeurJoueur - maxValeurAdversaire) {
			maxDifference = valeurJoueur - maxValeurAdversaire;
			indiceMaxDifference = iCaseJoueur;
		}
	});

	return indiceMaxDifference;
}

function deplacerJoueurs(iCase) {
	var deplacement = determinerSensDeplacement(iCase);
	listeCases[iJoueurs].type = 'caseVide';

	var img = $("li#" + iJoueurs + " img"); // on récupère l'image du joueur
	var imgCaseDest = $("li#" + iCase + " img");

	img.css("z-index", 99999);
	if (deplacement.sens == 1)
		img.animate({'left':deplacement.distance},'slow');
	else {
		img.animate({'top':deplacement.distance},'slow');
	}
	img.css("z-index", 1);

	imgCaseDest.hide(600, function () {
		imgCaseDest.attr("src", img.attr("src"));
		img.hide();
		imgCaseDest.show();

		iJoueurs = iCase;
		listeCases[iJoueurs].type = 'joueur';
		
		if(isJ1Turn) {
			imgCaseDest.attr("src", './img/' + theme + '/joueur2.png');
			mettreAJourScore(joueur1);
		} else {
			imgCaseDest.attr("src", './img/' + theme + '/joueur1.png');
			mettreAJourScore(joueur2);
		}
	});
}

function jouerTour(iCase) {
	if (isJ1Turn || modeJeu === 0) {
		if( deplacementValide(iCase) ) {
			deplacerJoueurs(iCase);
		} else {
			clicAutorise = true; // on reactive le clic
		}
	}
}

function positionClic( x, y ) {
	var ligne = Math.floor(y / TAILLE_CASE),
		colonne = Math.floor(x / TAILLE_CASE);

	return ligne*NOMBRE_CASES_PAR_LIGNE + colonne;
}