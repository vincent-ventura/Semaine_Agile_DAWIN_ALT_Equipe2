/*** BLOCINIT : FONCTIONS D'INITIALISATION D'UNE NOUVELLE PARTIE ***/

/*
 * Réinitialisation des variables utilisée pour le déroulement du jeu
 */
 function initialiserJoueurs() {
 	// Initialisation des deux joueurs
 	joueur1 = new Joueur("Joueur 1", 0);
	joueur2 = new Joueur("Joueur 2", modeJeu);
	isJ1Turn = true; // Le joueur 1 est le premier à jouer

	// Inserer les images et noms des joueurs
	$("#imgJ1").attr("src", './img/' + theme + '/joueur1.png');
	$("#imgJ2").attr("src", './img/' + theme + '/joueur2.png');
	$("#nomJ1").text(joueur1.nom);
	$("#nomJ2").text(joueur2.nom);

	initScores();
	initPositionJoueurs();

	// autoriser le clic pour débuter la partie
	clicAutorise = true;
 }

 function initPositionJoueurs() {
 	iJoueurs = Math.floor(NOMBRE_CASES / 2);
 }

/*
 * Création du plateau de jeu (49 cases) 
 */
function creerPlateau() {
	initialiserJoueurs();

	for (var ligne=0; ligne<NOMBRE_CASES_PAR_LIGNE; ligne++) {
		var newLigne = $('<ul/>'); // on cree une nouvelle ligne

		for (var colonne=0; colonne<NOMBRE_CASES_PAR_LIGNE; colonne++) {
			var newCase = $('<li/>'); // on cree une nouvelle case
			i = ligne*NOMBRE_CASES_PAR_LIGNE + colonne; // on calcule son id
			newCase.attr("id", i); // on lui attribut cette id
			newLigne.append(newCase); // on l'integre la nouvelle case à notre ligne

			// on ajoute la case courante à notre liste de cases
			listeCases[i] = new Case(
				i, 
				i !== iJoueurs ? 'piece' : 'joueur', 
				TAILLE_CASE*colonne, 
				TAILLE_CASE*ligne
			);
		}

		plateau.append(newLigne); // on insere la nouvelleligne à notre plateau
	}
}

function placementAleatoireDesPieces() {
	var piecesAPlacer = [
				10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
				20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
				30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
				50, 50, 50, 50, 50,
				100];

	var casesInterditesALaPiece100 = determinerCasesAccessibles(iJoueurs);
	// remplir les cases interdites à la piece 100
	for(i=0; i<casesInterditesALaPiece100.length; i++) {
		var iRandomPiece = Math.floor(Math.random() * (piecesAPlacer.length-1));
		listeCases[casesInterditesALaPiece100[i]].valeur = piecesAPlacer[iRandomPiece];
		piecesAPlacer.splice(iRandomPiece, 1);
	}

	// placer le reste des pieces
	while(piecesAPlacer.length) {
		var iRandomPiece = Math.floor(Math.random() * (piecesAPlacer.length));
		var iPremiereCaseVide = recupererPremiereCaseVide();
		listeCases[iPremiereCaseVide].valeur = piecesAPlacer[iRandomPiece];
		piecesAPlacer.splice(iRandomPiece, 1);
	}

	attribuerImagesAuxCases();
}

function demarrerPartie() {
	creerPlateau(); // creation du plateau de jeu
	placementAleatoireDesPieces(); // placement de piece de façon aléatoire sur plateau
}

function rejouerPartie() {
	plateau.empty();
    demarrerPartie();
    $(".popup").remove();
}

function quitterPartie() {
	plateau.empty();
    $(".popup").remove();
    $("#jeu").hide();
    $("#menu").show(100);
}

/*
 * Fonction retournant la premiere case de valeur 0
 */
function recupererPremiereCaseVide() {
	var iPremiereCaseVide = null;
	listeCases.some(function(c) {
		if(c.valeur === 0 && c.type !== 'joueur') {
			iPremiereCaseVide = c.numero;
			return true;
		} else {
			return false;
		}
	});

	return iPremiereCaseVide;
}

function attribuerImagesAuxCases() {
	for (var i=0; i<NOMBRE_CASES; i++) {
		(function(i) {
			if (listeCases[i].type === "piece") {
				var piece = new Image();
				switch (listeCases[i].valeur) {
					case 10:
						piece.src = './img/' + theme + '/10.png';
						break;
					case 20:
						piece.src = './img/' + theme + '/20.png';
						break;
					case 30:
						piece.src = './img/' + theme + '/30.png';
						break;
					case 40:
						piece.src = './img/' + theme + '/40.png';
						break;
					case 50:
						piece.src = './img/' + theme + '/50.png';
						break;
					case 100:
						piece.src = './img/' + theme + '/100.png';
						break;
				}
				$("li#"+i).append(piece);
			}
			if (listeCases[i].type === "joueur"){
				var joueur = new Image();
				joueur.src = './img/' + theme + '/joueur1.png';
				$("li#"+i).append(joueur);
			}
		})(i);
	}
}