// FICHIER REGROUPANT LES VARIABLES TRANSVESES A PLUSIEURS BLOCS AINSI QUE DES CONSTRUCTEURS D OBJETS //

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
var   DIMENSION_COTE_PLATEAU = 448, // Largeur max = largeur du canvas
	  NOMBRE_CASES = 49, // Le nombre de cases total est égal aux nombres de cases sur la largeur multipliés par le nombre de cases sur la hauteur
	  NOMBRE_CASES_PAR_LIGNE = 7, // Nombre de case pour chaque ligne du plateau
	  TAILLE_CASE = DIMENSION_COTE_PLATEAU/NOMBRE_CASES_PAR_LIGNE; // Taille d'une case du plateau

// On initialise nos variables globales
var listeCases = [], // Contient un tableau avec la liste des cases
	iJoueurs, // Position des joueurs dans la liste des cases (init au milieu du plateau)
	plateau = $("#plateau"), // on récupère l'élément représentant notre plateau de jeu
	joueur1, // on déclare le joueur1
	joueur2, // on déclare le joueur2
	isJ1Turn, // on déclare une variable indiquant à qui est le tour : true -> joueur1, false -> joueur2
	clicAutorise = false, // variable définissant si oui ou non le clic est autorisé
	modeJeu, // mode de jeu
			// 0: 1C1, 1:Debutant, 2:Avancé, 3:Expert
	finJeuPopup = $("#finJeuPopup"), // popup de fin de jeu
	materializeBtn = '<button class="btn"/>',
	theme = 'pirate', // theme par defaut
	historiqueMeilleursScores = [], // tableau sauvegardant les 5 meilleurs scores {joueur: xx, valeur: xxx}
	multipleBonus = 3; // multiplicateur de points lors des bonus

/*
 * Changement du theme du jeu (les anges / pirates)
 */
function changerTheme() {
    // on change la valeur de notre theme
    theme = theme === 'pirate' ? 'ange' : 'pirate';
    // on actualise le fond d'écran de notre page
    var imageUrl = "./img/" + theme + "/background.jpg";
    $('body').css("background-image", 'url('+imageUrl+')');
}

/*
 * fonction retournant un bouton rejouer
 * utilisée dans une popup et sur le jeu lui meme
 */
function creerBoutonRejouer() {
    var boutonRejouer = $(materializeBtn);
    boutonRejouer.html("Rejouer");

	boutonRejouer.click(function () {
        rejouerPartie();
    });

    return boutonRejouer;
}

/*
 * fonction  retournant un bouton quitter
 * utilisée dans une popup et sur le jeu lui meme
 */
function creerBoutonQuitter() {
	var boutonQuitter = $(materializeBtn);
    boutonQuitter.html("Quitter");

	boutonQuitter.click(function () {
        quitterPartie();
    });

    return boutonQuitter;
}

/*
 * fonction integrant notre popup d'aide
 */
function afficherPopupAide() {
    var popupContent = $('<div class="popup-content"/>'),
        popup = $('<div class="popup"/>'),
		fermerPopUp = $('<span/>');

    var aideEnLigne = "<div id=\"help\">\
		<center><h4>Aide Utilisateur</h4></center>\
		<center><h5>But: </h5></center>\
		<p> Le but est d\’acquérir le plus de connaissance possible au travers des bescherelles disposés sur la grille. Le premier spécimen qui ramasse plus de 500 connaissances gagne et la partie est terminée.</p>\
		<center><h5>Comment Jouer ?</h5></center>\
		<p> Honneur aux femmes, Nabilla commence au centre de la grille. Nous avons 5 types de bescherelle, 1 qui vaut 100 connaissances, 14 qui valent 10 connaissances, 14 qui valent 20 connaissances, 14 qui valent 30 connaissances et 5 qui valent 50 connaissances.\
		Ramassez donc les meilleurs bescherelles pour distancer votre adversaire ! Mais attention des combos sont possibles ! Ramassez cinq mêmes types de bescherelles d\’affilé pour obtenir un bonus délirant ! Pour vous déplacer il vous suffit de cliquer sur le bescherelle que vous souhaitez ramasser, mais le déplacement est uniquement autorisé en ligne ou en colonne !\
		</p>\
		<center><h5>Affichage du score: </h5></center>\
		<p>L\’historique des scores est affiché en bas du menu ainsi que sous le plateau de jeu lorsque la partie est lancée. Le score de chaque joueur au cours de la partie est indiqué à gauche et à droite de la grille.\
		</p>\
	</div>";
   	fermerPopUp.addClass('close');
	fermerPopUp.html('&times');
	fermerPopUp.click(function() {
		popup.remove();
	});

   	popupContent.append(fermerPopUp);
    popupContent.append(aideEnLigne);

    popup.append(popupContent);
    $("body").append(popup);
}
