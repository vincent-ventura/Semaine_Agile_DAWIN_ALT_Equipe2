//fonction CHEF dORCHESTRE de MAJ des scores
function mettreAJourScore(joueur) {
	//gerer le comptage des points et bonus
	gererScoreEtBonus(joueur);
	// vérifier si le joueur courant a dépassé les 500 points
	verifierFinJeu500Points(joueur);
}


/*
*DEFINITIONS DES FONCTIONS DE GESTIONS LOGIQUE
* ET DE RENDU GRAPHIQUE DES SCORES ET BONUS
*/


//***** DEBUT Partie GESTION Partie GRAPHIQUE
function scoreJoueurMAJGraphique(j)
{
	$( isJ1Turn ? "#scoreJ1" : "#scoreJ2").text(j.score);
	return j.score;
}

//mettre a jour l'historique des points du joueur dans la partie courante
function historiqueJoueurMAJGraphique(bonusBool)
{
	var ulHistoJoueur = $(isJ1Turn? ".listeP1" : ".listeP2");
	//actualiser une liste des coups avec en haut le dernier coup
	//change la couleur en fonction que ce soit un poit standard ou bonus
	if(bonusBool)
		ulHistoJoueur.prepend('<li class="bonus"> +'+listeCases[iJoueurs].valeur+" x"+multipleBonus+"</li>");
	else
	{
		ulHistoJoueur.prepend('<li class="point"> +'+listeCases[iJoueurs].valeur+"</li>");
	}

	liHistoJoueur = ulHistoJoueur.find('li');
	if(liHistoJoueur.length > 6) { // on garde seulement les 6 derniers points acquis en visuel
		liHistoJoueur.last().remove();
	}
}

function initScores() {
	$("#scoreJ1").text(0);
	$("#scoreJ2").text(0);
	$("ul.listeP1").empty();
	$("ul.listeP2").empty();
}


function gererScoreEtBonus(joueur) {
	var isBonus = true,
		valeurCaseDeplacement = listeCases[iJoueurs].valeur;

	joueur.historiqueScore.push( valeurCaseDeplacement );
	var tailleHistoriqueScore = joueur.historiqueScore.length;
	
	if ( tailleHistoriqueScore > 4 ) {
		for (var i=1; i<6; i++) {
			if( joueur.historiqueScore[tailleHistoriqueScore-i] !== valeurCaseDeplacement )
				isBonus = false;
		}
	} else {
		isBonus = false;
	}

	// on incremente le score du joueur
	joueur.score += isBonus ? 3*valeurCaseDeplacement : valeurCaseDeplacement;
	
	// on reinitialise l'historique dans si le joueur a eu un bonus
	if(isBonus)
		joueur.historiqueScore = [];

	scoreJoueurMAJGraphique(joueur);
	historiqueJoueurMAJGraphique(isBonus);
}