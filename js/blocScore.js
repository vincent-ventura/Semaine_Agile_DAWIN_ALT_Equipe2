//fonction CHEF dORCHESTRE de MAJ des scores
function mettreAJourScore(joueur) {
	//gerer le comptage des points et bonus
	handleScoreAndBonus(joueur);
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
	if( liHistoJoueur.length > 6 ) { // on garde seulement les 6 derniers points acquis en visuel
		liHistoJoueur.last().remove();
	}
}
//***** FIN Partie GESTION Partie GRAPHIQUE

//***** DEBUT Partie GESTION Partie LOGIQUE
function scoreJoueurMAJLogique(j, isBonus)
{
	if(listeCases[iJoueurs].valeur !== 0)
		j.historiqueScore.push(listeCases[iJoueurs].valeur); // sauvegarder le point dans l'historique du joueur
	if (isBonus)
	{
		j.score += listeCases[iJoueurs].valeur*multipleBonus;
	}
	else
	{
		j.score += listeCases[iJoueurs].valeur; // modifier le score du joueur avec la nouvelle valeur
	}
}

// incrementer les seuils de declenchements des bonus pour chaque joueur
function incrementerSeuilDeclenchementJ(j)
{
	isJ1Turn? j.seuilDeclenchementBonus++ : j.seuilDeclenchementBonus++;
}

//determiner s'il y a des points bonus ou pas en cours de jeu
const cinqPiecesMemeValeurALaSuite = 4;
function hasBonus(j)
{
	const longueurActuelleScoring = j.historiqueScore.length;
	const predicatBonus = listeCases[iJoueurs].valeur === j.historiqueScore[longueurActuelleScoring-4]
								&&			listeCases[iJoueurs].valeur === j.historiqueScore[longueurActuelleScoring-3]
								&&			listeCases[iJoueurs].valeur === j.historiqueScore[longueurActuelleScoring-2]
								&&			listeCases[iJoueurs].valeur === j.historiqueScore[longueurActuelleScoring-1];

	if (listeCases[iJoueurs].valeur === j.historiqueScore[longueurActuelleScoring-1])
		incrementerSeuilDeclenchementJ(j);
	const predicatBonusGlobal = longueurActuelleScoring > 3 && predicatBonus && j.seuilDeclenchementBonus === cinqPiecesMemeValeurALaSuite;
	if (predicatBonusGlobal)
	{
		j.seuilDeclenchementBonus = 0;
		j.historiqueScore = [];
		return true;
	}
	return false;
}

function initScores() {
	$("#scoreJ1").text(0);
	$("#scoreJ2").text(0);
	$("ul.listeP1").empty();
	$("ul.listeP2").empty();
}

function enregistrerMeilleurScorePartieEnCours()
{
	//joueur1.score > joueur2.score? jeu.highScores.push(joueur1.score) : jeu.highScores.push(joueur2.score);
	joueur1.score > joueur2.score? jeu.highScores = joueur1.score.toString() : jeu.highScores = joueur2.score.toString();
	return jeu.highScores;
}

function enregistrerMeilleurScoreEnLocal()
{
	//localStorage.setItem('myHighScoreObject', JSON.stringify(enregistrerMeilleurScorePartieEnCours()));
	++HIGH_SCORE_DIM;
	localStorage.setItem('myHighScoreObject'+HIGH_SCORE_DIM, enregistrerMeilleurScorePartieEnCours());
}

function accederMeilleurScoreEnLocal()
{
	//return JSON.parse(localStorage.getItem('myHighScoreObject'));
	return localStorage.getItem('myHighScoreObject'+HIGH_SCORE_DIM);
}
//***** FIN Partie GESTION Partie LOGIQUE


//gestion globale des bonus: fonction appelee dans la fontion principale
// (voir en debut de page)
//disons que l'on multiplie X3 la valeur du dernier jeton
const multipleBonus = 3;
function handleScoreAndBonus(j)
{
	//le joueur courant a t il un bonus ?
	const isBonus = hasBonus(j);
	//partie logique
	//mettre a jour le score dans la logique (persistence) joueur
	scoreJoueurMAJLogique(j, isBonus);
	//partie graphique
	// mettre jour l'affichage du score courant du joueur et historique
	scoreJoueurMAJGraphique(j)
	historiqueJoueurMAJGraphique(isBonus);
}
