// On définit des variables
var largeurPlateau = 546, // Largeur max = largeur du canvas
	hauteurPlateau = 546, // Hauteur max = hauteur du canvas
	nombreCases = 49, // Le nombre de cases total est égal aux nombres de cases sur la largeur multipliés par le nombre de cases sur la hauteur
	nombreCasesParLigne = 7, // Nombre de case pour chaque ligne du plateau
	tailleCase = largeurPlateau/nombreCasesParLigne, // Taille d'une case du plateau
	listeCases = [], // Contient un tableau avec la liste des cases
	iJoueurs = Math.floor(nombreCases / 2), // Position des joueurs dans la liste des cases (init au milieu du plateau)
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
				positionX: tailleCase * colonne, //la pièce a une diagonale legerement plus petit que la case
				positionY: tailleCase * ligne,
        valeur: 0
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

 //c'est quoi cette partie de code qui pue !!! Je pense pouvoir le refactoriser
//sans rétrograder le code. A voir avec les collegues demain.
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


//valeur limite en quantité des valeurs des pieces
const limite50Qte = 5;
const	limite10Qte = 14;
const	limite20Qte = 14;
const	limite30Qte = 14;
//compteur pour chaque valeur
var cpt50 = 0,
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
	const tabToHandle = include100?this.valArray:this.valArrayWithout100;
	const rand = tabToHandle[Math.floor(Math.random()*tabToHandle.length)];
	if (rand === 100 )
	{
		this.valSet.delete(100);
		updateTab(tabToHandle);
		return 100;
	}
	//PE refactoriser cette partie ?
	if( rand === 50 && cpt50 < limite50Qte)
	{
		cpt50++;
		if( cpt50 === limite50Qte )
		{
			this.valSet.delete(50);
			updateTab(tabToHandle);
		}
	}
	if( rand === 10 && cpt10 < limite10Qte)
	{
		cpt10++;
		if( cpt10 === limite10Qte )
		{
			this.valSet.delete(10);
			updateTab(tabToHandle);
		}
	}
	if( rand === 20 && cpt20 < limite20Qte)
	{
		cpt20++;
		if( cpt20 === limite20Qte )
		{
			this.valSet.delete(20);
			updateTab(tabToHandle);
		}
	}
	if( rand === 30 && cpt30 < limite30Qte)
	{
		cpt30++;
		if( cpt30 === limite30Qte )
		{
			this.valSet.delete(30);
			updateTab(tabToHandle);
		}
	}
	eval(rand);
	return rand;
}
//fonction de MAJ des tableaux de valeurs
function updateTab(tab)
{
	if( tab === this.valArray)
		this.valArray = Array.from(this.valSet);
	if( tab === this.valArrayWithout100)
		this.valArrayWithout100 = Array.from(this.valSet);
}

//ensemble de valeurs de cases ne devant pas contenir la valeur 100
// numeros de cases sur la ligne du milieu et la colonne du milieu
const indexLigneDuMilieu = [21, 22, 23, 25, 26, 27];
const indexColonneDuMilieu = [3, 10, 17, 31, 38, 45];
const indexCaseWithout100 = new Set(indexColonneDuMilieu.concat(indexLigneDuMilieu));

// Il y a 49 cases, on vérifie l'type de chacune et si c'est une piece, on colore la case en gris
for (var i=0; i<nombreCases; i++) {
	(function(i) {
		if (listeCases[i].type === "piece") {
			listeCases[i].valeur = randomVal(!indexCaseWithout100.has(i));
			var piece = new Image();
			piece.src = './img/10.png';
			$("li#"+i).append(piece);
		}
		if (listeCases[i].type === "joueur"){
			var joueur = new Image();
			joueur.src = "./img/pion.png";
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

	if (deplacement.sens == 1)
  		img.animate({'left':deplacement.distance},'slow');
  	else {
  		console.log(deplacement.distance)
  		img.animate({'top':deplacement.distance},'slow');
  	}

	imgCaseDest.hide(600, function () {
		imgCaseDest.attr("src", img.attr("src"));
  		img.removeAttr("src");
  		imgCaseDest.show();
	});

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
