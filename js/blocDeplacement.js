/******* FICHIER GERANT LES FONCTIONS RELATIVES AU DEPLACEMENT DES JOUEURS ****************/

/*
 * retourne true si la case d'indice iCase est une case
 * sur laquelle le joueur peut se deplacer :
 * type "piece" et située sur la ligne OU colonne du joueur
 */
function deplacementValide(iCase) {
	return (
		listeCases[iCase].type === "piece" && // return true si la pièce de destination est une piece ET
		( listeCases[iCase].positionX === listeCases[iJoueurs].positionX || // que la piece soit sur la meme ligne que le joueur OU
			listeCases[iCase].positionY === listeCases[iJoueurs].positionY ) // que la piece soit sur la meme colonne que le joueur
		);
}

/*
 * determine le sens de deplacement du joueur à partir de 
 * l'indice de la case de destination
 * objet retourné de ce type :
 				{
 					sens: 1 pour horizontal, 2 pour vertical
					distance: distance à parcourir en pixel pour rejoindre la case
 				}
 */
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

/*
 * Fonction gérant la fin d'un tour
 */
function finDuTour() {
	isJ1Turn = !isJ1Turn; // on change de joueur
	verifFinJeuPlusDeCasesAccessibles(); // on vérifie si le nouveau joueur peut se deplacer == FIN JEU

	// On reactive le clic ou bien on lance l'IA
	if (modeJeu === 0 || isJ1Turn) {
		clicAutorise = true;
	} else {
		deplacerIA(modeJeu);
	}
}

/*
 * Fonction appelant le déplacement de l'IA
 * suivant le mode de jeu choisi (1: debutant, 2:avancé, 3:expert)
 */
function deplacerIA(modeJeu) {
	var iCase;
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
	setTimeout(function() {
		// on deplace le joueur controlé par l'IA apres avoir attendu
		// 500ms pour ne pas etre trop brusque
		deplacerJoueur(iCase);
	}, 500);
}

/*
 * Determine la case sur laquelle l'IA doit se déplacer
 * en mode debutant
 */
function choisirCaseIADebutant() {
	var casesAccessibles = determinerCasesAccessibles(iJoueurs), // toutes les cases situées sur la meme ligne ou colonne que le joueur
		randomCase = Math.floor(Math.random() * casesAccessibles.length); // on choisi au hasard la case sur laquelle se deplacer
	return casesAccessibles[randomCase];
}

/*
 * Determine la case sur laquelle l'IA doit se déplacer
 * en mode avancé :
 * recherche de la meilleur case accesible tout en ne permettant pas
 * à l'adversaire d'aller sur la case 100 au tour suivant
 */
function choisirCaseIAAvance() {
	var casesAccessiblesJoueur = determinerCasesAccessibles(iJoueurs), // cases situées sur la meme ligne / colonne que le joueur
		caseTrouvee = false, // in
		indiceCase;

	while(!caseTrouvee) {
		// on cherche d'abord la plus grande valeur située sur les cases accessibles par le joueur
		var maxValeur = 0;
		casesAccessiblesJoueur.some(function(iCase) {
			// dans le cas où la valeur 100 est acessible on coupe cours au parcours des cases accessible
			if (listeCases[iCase].valeur === 100) {
				indiceCase = iCase;
				maxValeur = listeCases[iCase].valeur;
				return true;
			}
			// sinon on vérifie si la case a une valeur supérieur que la valeur max actuelle
			else {
				if (listeCases[iCase].valeur > maxValeur) {
					indiceCase = iCase;
					maxValeur = listeCases[iCase].valeur;
				}
				return false;
			}
		});

		// si le 100 est accessible ou que l'on a un seul choix de deplacement, on retourne sa position
		if (maxValeur === 100 || casesAccessiblesJoueur.length < 2) {
			return indiceCase;
		}

		var casesAccessiblesCase = determinerCasesAccessibles(indiceCase); // cases situées sur la meme ligne que la case ciblée
		// on vérifie ensuite qu'en allant sur la case contenant la plus haute valeur,
		// l'adversaire ne pourra pas avoir la valeur 100 au prochain tour
		var isCentAround = casesAccessiblesCase.some(function(iCase) {
			return listeCases[iCase].valeur === 100;
		});

		if(!isCentAround) {
			caseTrouvee = true; // on a trouve la case que l'IA cherchait et on peut terminer notre boucle
		} else {
			casesAccessiblesJoueur.slice(indiceCase, 1); // on recommence la recherche en supprimant l'option courante des possibilités de déplacement
		}
	}
	return indiceCase;
}

/*
 * Determine la case sur laquelle l'IA doit se déplacer
 * en mode expert :
 * recherche de la plus haute différence :
 * MeilleurScoreQueJePeuxAtteindre - MeilleurScoreQuePourraAtteindreMonAdversaireAuProchainTour
 */
function choisirCaseIAExpert() {
	var casesAccessiblesJoueur = determinerCasesAccessibles(iJoueurs),
		indiceMaxDifference,
		maxDifference = null,
		maxValeurAdversaire;

	casesAccessiblesJoueur.forEach(function(iCaseJoueur) { // on parcours toutes les possibilités de deplacement
		var valeurJoueur = listeCases[iCaseJoueur].valeur;
		maxValeurAdversaire = 0; // on init la valeur max de l'adversaire à zero

		// on regarde la meilleure case que pourra atteindre l'adversaire au prochain tour
		determinerCasesAccessibles(iCaseJoueur).forEach(function(iCaseAdversaire) {
			if (listeCases[iCaseAdversaire].valeur > maxValeurAdversaire) {
				maxValeurAdversaire = listeCases[iCaseAdversaire].valeur;
			}
		});

		// si jamais l'adv ne pourrait pas se deplacer au tour suivant on continu notre recherche
		if (!maxValeurAdversaire) {
			return;
		}

		// si la difference actuelle est plus grosse que la precedente
		if (maxDifference === null || maxDifference < valeurJoueur - maxValeurAdversaire) {
			maxDifference = valeurJoueur - maxValeurAdversaire;
			indiceMaxDifference = iCaseJoueur;
		}
	});

	return indiceMaxDifference;
}

/*
 * traite le deplacement du joueur
 */
function deplacerJoueur(iCase) {
	// on recupere le sens de deplacement
	var deplacement = determinerSensDeplacement(iCase);

	//on met à jour le type de nos cases
	listeCases[iJoueurs].type = 'caseVide';
	listeCases[iCase].type = 'joueur';

	var imgJoueur = $("li#" + iJoueurs + " img"); // on récupère l'image du joueur
	var imgCaseDest = $("li#" + iCase + " img"); // on reucupere l'image de la case ciblée

	// animer le deplacement du joueur
	imgJoueur.css("z-index", 99999);
	if (deplacement.sens == 1)
		imgJoueur.animate({'left':deplacement.distance},'slow');
	else {
		imgJoueur.animate({'top':deplacement.distance},'slow');
	}
	imgJoueur.css("z-index", 1);

	// on gere la transition entre les differentes images
	imgCaseDest.hide(600, function () {
		imgCaseDest.attr("src", imgJoueur.attr("src"));
		imgJoueur.hide();
		imgCaseDest.show();

		iJoueurs = iCase; // on modifie l'indice de la case du joueur

		// on met à jour le score du joueur et on met a jour le score
		if(isJ1Turn) {
			mettreAJourScore(joueur1);
			imgCaseDest.attr("src", './img/' + theme + '/joueur2.png');
		} else {
			mettreAJourScore(joueur2);
			imgCaseDest.attr("src", './img/' + theme + '/joueur1.png');
		}
	});
}

/*
 * lance le deroulement d'un nouveau tour apres le clic du joueur
 * en verifiant que la case sur laquelle il a cliquée est autorisée
 */
function jouerTour(iCase) {
	if (isJ1Turn || modeJeu === 0) {
		if( deplacementValide(iCase) ) { // si le deplacement est valide
			deplacerJoueur(iCase);
		} else {
			clicAutorise = true; // on reactive le clic
		}
	}
}

/*
 * retourne l'indice de la case sur laquelle le joueur a cliquée
 * a partir des coordonnées du clic
 */
function positionClic( x, y ) {
	var ligne = Math.floor(y / TAILLE_CASE),
		colonne = Math.floor(x / TAILLE_CASE);

	return ligne*NOMBRE_CASES_PAR_LIGNE + colonne;
}

/*
 * fonctions retournant le tableau de tous les indices de cases (du tableau listeCases)
 * accessibles (de type piece) depuis la position actuelle du joueur
 */
function determinerCasesAccessibles(iCase) {
    var colonneJoueur = listeCases[iCase].positionX / TAILLE_CASE; // 5
    var ligneJoueur = listeCases[iCase].positionY / TAILLE_CASE; // 1
    var casesAccessiblesJoueurs = [];

    for (i=0; i<NOMBRE_CASES_PAR_LIGNE; i++) {
        var indiceColonne = colonneJoueur + i*NOMBRE_CASES_PAR_LIGNE;
        if (listeCases[indiceColonne].type === 'piece')
            casesAccessiblesJoueurs.push(indiceColonne);

        if (i !== colonneJoueur) {
            var indiceLigne = ligneJoueur*NOMBRE_CASES_PAR_LIGNE + i;
            if (listeCases[indiceLigne].type === 'piece')
                casesAccessiblesJoueurs.push(indiceLigne);
        }
    }

    result = casesAccessiblesJoueurs.sort(function (a, b) {  return a - b;  });
    return result;
}