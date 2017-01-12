function verifierFinJeu500Points (joueur) {
	if(joueur.score > 500)
		alert("Le joueur " + joueur.nom + " a gangé la partie avec " + joueur.score + " points !");
	else // on change de joueur afin de continuer à jouer
		changerDeJoueur();
}

function verifFinJeuPlusDeCasesAccessibles (){
	var caseDispoExiste = false;

    casesAccessiblesJoueurs = determinerCasesAccessiblesJoueur();

    caseDispoExiste = casesAccessiblesJoueurs.some(function (iCase) {
        return listeCases[iCase].type === 'piece';
    });

    if( !caseDispoExiste ){
        alert("Le joueur " + (isJ1Turn ? joueur1.nom : joueur2.nom) + " a gangé la partie car il ne peut plus jouer !"); 
    }
}

function determinerCasesAccessiblesJoueur() {
    var colonneJoueur = listeCases[iJoueurs].positionX / TAILLE_CASE; // 5
    var ligneJoueur = listeCases[iJoueurs].positionY / TAILLE_CASE; // 1
    var casesAccessiblesJoueurs = [];

    for (i=0; i<NOMBRE_CASES_PAR_LIGNE; i++) {
        casesAccessiblesJoueurs.push(colonneJoueur + i*NOMBRE_CASES_PAR_LIGNE);

        if (i !== colonneJoueur)
        casesAccessiblesJoueurs.push(ligneJoueur*NOMBRE_CASES_PAR_LIGNE + i);
    }

    result = casesAccessiblesJoueurs.sort(function (a, b) {  return a - b;  });
    return result;
}