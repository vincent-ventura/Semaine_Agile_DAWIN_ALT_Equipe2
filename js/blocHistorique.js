// FICHIER TRAITANT LES FONCTIONS DE L'HISTORIQUE DES SCORE

function traitementScoreFinal(nomJoueur, score) {
	historiqueMeilleursScores.some(function (meilleurScore) {
		if(meilleurScore.valeur < score) {
			historiqueMeilleursScores.push({joueur: nomJoueur, score: score});
			return true;
		}
		return false;
	});
}