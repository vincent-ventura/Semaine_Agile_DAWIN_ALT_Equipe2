function mettreAJourScore(joueur) {
	if(joueur.score !== 0)
		joueur.historiqueScore.push(joueur.score); // sauvegarder le score actuel dans l'historique du joueur
	joueur.score += listeCases[iJoueurs].valeur; // modifier le score du joueur avec la nouvelle valeur

	// mettre jour l'affichage
	$( isJ1Turn ? "#scoreJ1" : "#scoreJ2").text(joueur.score);

	// vérifier si le joueur courant a dépassé les 500 points
	verifierFinJeu500Points(joueur);
}