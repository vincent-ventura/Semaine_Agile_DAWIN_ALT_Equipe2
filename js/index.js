// On définit des variables
var largeurPlateau = 546, // Largeur max = largeur du canvas
	hauteurPlateau = 546, // Hauteur max = hauteur du canvas
	nombreCases = 49, // Le nombre de cases total est égal aux nombres de cases sur la largeur multipliés par le nombre de cases sur la hauteur
	nombreCasesParLigne = 7, // Nombre de case pour chaque ligne du plateau
	tailleCase = largeurPlateau/nombreCasesParLigne, // Taille d'une case du plateau
	listeCases = [], // Contient un tableau avec la liste des cases
	iJoueurs = Math.floor(nombreCases / 2), // Position des joueurs dans la liste des cases (init au milieu du plateau)
	listeCanvas = [],
	plateau = $("#plateau");

function Joueur(nom) {
	this.score = 0;
	this.nom = nom;
} 

var joueur1 = new Joueur("Joueur 1"),
	joueur2 = new Joueur("Joueur 2");

// On créé une fonction pour crée chaque case du plateau
function creerPlateau() {

	for (var ligne=0; ligne<nombreCasesParLigne; ligne++) { // pour chaque ligne
		var newLigne = $('<ul/>');

		for (var colonne=0; colonne<nombreCasesParLigne; colonne++) { // pour chaque colonne
			var newCase = $('<li/>');
			i = ligne*nombreCasesParLigne + colonne;
			newCase.attr("id", i);
			newLigne.append(newCase);

			// On ajoute un objet à chaque case avec un type et les positions
			listeCases[i] = {
				numero: i,
				type: "casevide",
				positionX: tailleCase * colonne + 1, //la pièce a une diagonale legerement plus petit que la case
				positionY: tailleCase * ligne + 1,
				//pe determiner la ligne et colonne courante
			};
		}
		plateau.append(newLigne);
	}
}

creerPlateau();

// Création de la fonction qui retourne un nombre aléatoire entre 0 et 48
function randomnumber() {
	var rand = Math.floor(Math.random() * (nombreCases - 1));
	return rand;
}

for (var i=0; i<nombreCases-1; i++) {
	var numerocasealeatoire = randomnumber();

	if (listeCases[numerocasealeatoire].type !== "casevide") {
		i--;
	} else {
		listeCases[numerocasealeatoire].type = "piece";
		listeCases[nombreCases-1].type = "piece";
	}
}

listeCases[iJoueurs].type = "joueur";

// Il y a 49 cases, on vérifie l'type de chacune et si c'est une piece, on colore la case en gris
for (var i=0; i<nombreCases; i++) {
	(function(i) {
		if (listeCases[i].type === "piece") {
			var piece = new Image();
			piece.src = './img/10.png';
			$("li#"+i).append(piece);
		}
		if (listeCases[i].type === "joueur"){
			var joueur = new Image();
			joueur.src = "http://zupimages.net/up/15/31/m3d1.png";
			$("li#"+i).append(joueur);
		}
	})(i);
}

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
		deplacement.distance = (iCase - iJoueurs) * tailleCase;
	}
	else {
		deplacement.sens = 2;
		console.log(Math.floor(listeCases[iCase].positionX / tailleCase));
		deplacement.distance = ( (Math.floor(listeCases[iCase].positionY / tailleCase)) - (Math.floor(listeCases[iJoueurs].positionY / tailleCase)) ) * tailleCase; 
	}

	return deplacement;
}


function deplacerJoueurs(iCase) {
	var deplacement = determinerSensDeplacement(iCase); 
	// Mettre à jour les cases
	listeCases[iJoueurs].type = 'casevide';

	// effectuer le déplacement
	var img = $("li#" + iJoueurs + " img"); // on récupère l'image du joueur
	var imgCaseDest = $("li#" + iCase + " img");
	/*imgCaseDest.hide(600, function () {
		imgCaseDest.attr("src", img.attr("src"));
		img.removeAttr("src");
		imgCaseDest.show(600);
	});*/

	if (deplacement.sens == 1)
  		img.animate({'left':deplacement.distance},'slow');
  	else {
  		console.log(deplacement.distance)
  		img.animate({'top':deplacement.distance},'slow');
  	}

	iJoueurs = iCase;
	listeCases[iJoueurs].type = 'joueur';
}

function allerA( iCase ) {
	if( deplacementValide(iCase) ) {
		deplacerJoueurs(iCase);
	}
}

function positionClic( x, y ) {
	var ligne = Math.floor(y / tailleCase),
		colonne = Math.floor(x / tailleCase);

	return ligne*nombreCasesParLigne + colonne;
}

plateau.on('click', function (e) {
	var x = e.pageX - this.offsetLeft;
	var y = e.pageY - this.offsetTop;
	allerA( positionClic(x, y) );
});