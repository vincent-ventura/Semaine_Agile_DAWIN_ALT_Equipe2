function verifierFinJeu500Points (joueur) {
	if(joueur.score > 500)
		alert("Le joueur " + joueur.nom + " a gangé la partie avec " + joueur.score + " points !");
	else // on change de joueur afin de continuer à jouer
		changerDeJoueur();
}

/*function verfiFinJeu(){
	var caseDispoExiste = false;
    // Recuperer la position courante du pion (joueur)

    var i = 0; // variable incrémentée pour tester si le pion pourra jouer au tour suivant.
    
    for( x=iJoueurs-3; x < iJoueurs+4; x++){
        if(listeCases[x].type == 'caseVide')
            i++;
    }    

    for(y = iJoueurs-(3*NOMBRE_CASES_PAR_LIGNE); y < iJoueurs+(3*NOMBRE_CASES_PAR_LIGNE)+1; y = y+NOMBRE_CASES_PAR_LIGNE){
        if(listeCases[y].type == 'caseVide')
            i++;
    }

    if(i == 12){
        alert("Le joueur " + isJ1Turn ? "1" : "2" + " a gagné"); // Afficher le gagnant de la partie  
    }
}*/