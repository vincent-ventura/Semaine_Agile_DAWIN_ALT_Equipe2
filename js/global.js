/*** FICHIER CONTENANT TOUTES LES VARIABLES GLOBALES UTILISEES DANS PLUSIEURS BLOCS DU JEU **/

/*
 * Constructeur d'un objet Joueur
 */
function Joueur(nom, type) {
	this.score = 0;
	this.nom = nom;
	this.historiqueScore = [];
	this.type = type;
}

/*
 * Constructeur d'un objet Case
 */
function Case(numero, type, posX, posY) {
	this.numero = numero; // numéro de la case (0 - 48)
	this.type = type; // type de la case (caseVide, piece ou joueur)
	this.positionX = posX; // coordonnées en x du coin en haut à gauche de la case
	this.positionY = posY; // coordonnées en y du coin en haut à gauche de la case
	this.valeur = 0; // valeur de la pièce (points)
}

// On initialise nos constantes
var   DIMENSION_COTE_PLATEAU = 546, // Largeur max = largeur du canvas
	  NOMBRE_CASES = 49, // Le nombre de cases total est égal aux nombres de cases sur la largeur multipliés par le nombre de cases sur la hauteur
	  NOMBRE_CASES_PAR_LIGNE = 7, // Nombre de case pour chaque ligne du plateau
	  TAILLE_CASE = DIMENSION_COTE_PLATEAU/NOMBRE_CASES_PAR_LIGNE; // Taille d'une case du plateau

// On initialise nos variables globales
var listeCases = [], // Contient un tableau avec la liste des cases
	iJoueurs = Math.floor(NOMBRE_CASES / 2), // Position des joueurs dans la liste des cases (init au milieu du plateau)
	plateau = $("#plateau"), // on récupère l'élément représentant notre plateau de jeu
	joueur1, // on déclare le joueur1
	joueur2, // on déclare le joueur2
	isJ1Turn, // on déclare une variable indiquant à qui est le tour : true -> joueur1, false -> joueur2
	clicAutorise = true, // variable définissant si oui ou non le clic est autorisé
	etatJeu;