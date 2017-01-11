// On crée les variables pour le canvas
var canvas = document.getElementById('plateau');
var context = canvas.getContext('2d');

// On définit des variables
var largeurPlateau = canvas.width, // Largeur max = largeur du canvas
	hauteurPlateau = canvas.height, // Hauteur max = hauteur du canvas
	nombreCases = 49, // Le nombre de cases total est égal aux nombres de cases sur la largeur multipliés par le nombre de cases sur la hauteur
	nombreCasesParLigne = 7, // Nombre de case pour chaque ligne du plateau
	tailleCase = largeurPlateau/nombreCasesParLigne, // Taille d'une case du plateau
	listeCases = [], // Contient un tableau avec la liste des cases
	iJoueurs = Math.floor(nombreCases / 2), // Position des joueurs dans la liste des cases (init au milieu du plateau)
	listeCanvas = [];

function Joueur(nom) {
	this.score = 0;
	this.nom = nom;
} 

var joueur1 = new Joueur("Joueur 1"),
	joueur2 = new Joueur("Joueur 2");

// On créé une fonction pour crée chaque case du plateau
function creerPlateau() {
	context.fillStyle = "white"; // Le canvas a un fond blanc
	context.fillRect(0, 0, largeurPlateau, hauteurPlateau); // On utilise la totalité du canvas pour créer nos cases

	var colonne = 0,
		ligne = 0; // On utilise ces variables pour changer les colonnes et lignes des différentes cases crées, on commence à 0 x 0 pour la première case

	// Pour chaque case du plateau :
	for (var i = 0; i < nombreCases; i++) {
		// On crée un carré de bordure noire de taille tailleCase*tailleCase
		context.fillStyle = (i%2 === 0 ? 'white' : 'black');
		context.fillRect(tailleCase * colonne, tailleCase * ligne, tailleCase, tailleCase);

		// On ajoute un objet à chaque case avec un type et les positions
		listeCases[i] = {
			numero: i,
			type: "casevide",
			positionX: tailleCase * colonne + 1, //la pièce a une diagonale legerement plus petit que la case
			positionY: tailleCase * ligne + 1,
			//pe determiner la ligne et colonne courante
		};

		// Après avoir créé la case, on passe à la colonne suivante
		colonne++;

		// Si on arrive à la fin de la ligne, on passe à la ligne suivante
		if (colonne === nombreCasesParLigne) {
			colonne = 0;
			ligne++;
		}
	}
}

creerPlateau();

var nombreObstacles = listeCases.length-1, // On veut 48 obstacles sur le plateau
	listearmes = [];

// Création de la fonction qui retourne un nombre aléatoire entre 0 et 48
function randomnumber() {
	var rand = Math.floor(Math.random() * (nombreCases - 1));
	return rand;
}

for (var i = 0; i < nombreObstacles; i++) {
	var numerocasealeatoire = randomnumber();

	if (listeCases[numerocasealeatoire].type !== "casevide") {
		i--;
	} else {
		listeCases[numerocasealeatoire].type = "piece";
		listeCases[nombreObstacles].type = "piece";
	}
}

listeCases[iJoueurs].type = "joueur";

// Il y a 49 cases, on vérifie l'type de chacune et si c'est une piece, on colore la case en gris
for (var i = 0; i < nombreCases; i++) {
	(function(i) {
		if (listeCases[i].type === "piece") {
			var canvas = new Image();
			canvas.src = './img/10.png';
			canvas.addEventListener('load', function() {
				context.drawImage(canvas, listeCases[i].positionX, listeCases[i].positionY, 58, 58);
			}, false);
			listeCanvas[i] = canvas;
		}
		if (listeCases[i].type === "joueur"){
			var canvas = new Image();
			canvas.src = "http://zupimages.net/up/15/31/m3d1.png";
			canvas.addEventListener('load', function() {
			context.drawImage(canvas, listeCases[i].positionX, listeCases[i].positionY);
			}, false);
			listeCanvas[i] = canvas;
		}
	})(i);
}

function deplacementValide( iCase ) {
	return ( 
		listeCases[iCase].type === "piece" && // return true si la pièce de destination est une piece ET
		( listeCases[iCase].positionX === listeCases[iJoueurs].positionX || // que la piece soit sur la meme ligne que le joueur OU
			listeCases[iCase].positionY === listeCases[iJoueurs].positionY ) // que la piece soit sur la meme colonne que le joueur
		); 
}

function deplacerJoueurs(iCase) {
	// Mettre à jour les cases
	listeCases[iJoueurs].type = 'casevide';
	iJoueurs = iCase;
	listeCases[iJoueurs].type = 'joueur';

	// faire disparaitre la piece située sur la case de destination
	context.clearRect(listeCases[iCase].positionX, listeCases[iCase].positionY, tailleCase-2, tailleCase-2);

	// effectuer le déplacement

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

canvas.addEventListener('click', function (e) {
	allerA( positionClic(e.offsetX, e.offsetY) );
});
