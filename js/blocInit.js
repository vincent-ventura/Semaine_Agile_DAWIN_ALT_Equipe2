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
	$("#imgJ1").attr("src", "./img/pirate.png");
	$("#imgJ2").attr("src", "./img/pieuvre.png");
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


function placerPiecesAleatoirement() {
	//valeur limite en quantité des valeurs des pieces
	const 	limite50Qte = 5;
	const	limite10Qte = 14;
	const	limite20Qte = 14;
	const	limite30Qte = 14;
	//compteur pour chaque valeur
	var 	cpt50 = 0,
			cpt10 = 0,
			cpt20 = 0,
			cpt30 = 0;

	// tableau contenant les valeurs des pieces a valoriser
	var valArray = [100, 10, 20, 30, 50];
	var valArrayWithout100 = [10, 20, 30, 50];
	//ensemble contenant les valeurs des pieces a valoriser
	var valSet = new Set(valArray);
	//Fonction renvoyant aleatoire les valeurs des pieces
	function randomVal(include100)
	{
		var tabToHandle = include100 ? valArray : valArrayWithout100;
		var rand = tabToHandle[Math.floor(Math.random()*tabToHandle.length)];
		if (rand === 100 )
		{
			valSet.delete(100);
			updateTab(tabToHandle);
			return 100;
		}
		//PE refactoriser cette partie ?
		if( rand === 50 && cpt50 < limite50Qte)
		{
			cpt50++;
			if( cpt50 === limite50Qte )
			{
				valSet.delete(50);
				updateTab(tabToHandle);
			}
		}
		if( rand === 10 && cpt10 < limite10Qte)
		{
			cpt10++;
			if( cpt10 === limite10Qte )
			{
				valSet.delete(10);
				updateTab(tabToHandle);
			}
		}
		if( rand === 20 && cpt20 < limite20Qte)
		{
			cpt20++;
			if( cpt20 === limite20Qte )
			{
				valSet.delete(20);
				updateTab(tabToHandle);
			}
		}
		if( rand === 30 && cpt30 < limite30Qte)
		{
			cpt30++;
			if( cpt30 === limite30Qte )
			{
				valSet.delete(30);
				updateTab(tabToHandle);
			}
		}
		eval(rand);
		return rand;
	}
	//fonction de MAJ des tableaux de valeurs
	function updateTab(tab)
	{
		if( tab === valArray )
			valArray = Array.from(valSet);
		if( tab === valArrayWithout100)
			valArrayWithout100 = Array.from(valSet);
	}

	//ensemble de valeurs de cases ne devant pas contenir la valeur 100
	// numeros de cases sur la ligne du milieu et la colonne du milieu
	const indexLigneDuMilieu = [21, 22, 23, 25, 26, 27];
	const indexColonneDuMilieu = [3, 10, 17, 31, 38, 45];
	const indexCaseWithout100 = new Set(indexColonneDuMilieu.concat(indexLigneDuMilieu));
	// Il y a 49 cases, on vérifie l'type de chacune et si c'est une piece, on colore la case en gris
	for (var i=0; i<NOMBRE_CASES; i++) {
		(function(i) {
			if (listeCases[i].type === "piece") {
				listeCases[i].valeur = randomVal(!indexCaseWithout100.has(i));
				var piece = new Image();
				switch (listeCases[i].valeur) {
					case 10:
						piece.src = './img/10.png';
						break;
					case 20:
						piece.src = './img/20.png';
						break;
					case 30:
						piece.src = './img/30.png';
						break;
					case 40:
						piece.src = './img/40.png';
						break;
					case 50:
						piece.src = './img/50.png';
						break;
					case 100:
						piece.src = './img/100.png';
						break;
				}
				$("li#"+i).append(piece);
			}
			if (listeCases[i].type === "joueur"){
				var joueur = new Image();
				joueur.src = "./img/pirate.png";
				$("li#"+i).append(joueur);
			}
		})(i);
	}
}

function demarrerPartie() {
	creerPlateau(); // creation du plateau de jeu
	placerPiecesAleatoirement(); // placement de piece de façon aléatoire sur plateau
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