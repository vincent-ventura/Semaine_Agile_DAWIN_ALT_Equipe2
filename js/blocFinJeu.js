function verifierFinJeu500Points (joueur) {
	if(joueur.score > 500) {
        var contenu = "Le joueur " + joueur.nom + " a gangé la partie avec " + joueur.score + " points !";
        afficherPopupFinJeu(contenu);
    }
	else // on change de joueur afin de continuer à jouer
		changerDeJoueur();
}

function verifFinJeuPlusDeCasesAccessibles (){
	var caseDispoExiste = false;

    casesAccessiblesJoueurs = determinerCasesAccessibles(iJoueurs);

    if(!casesAccessiblesJoueurs.length) {
        var contenu = "Le joueur " + (isJ1Turn ? joueur1.nom : joueur2.nom) + " a gangé la partie car il ne peut plus jouer !";
        afficherPopupFinJeu(contenu);
    }
}

function determinerCasesAccessibles(iCase) {
    var colonneJoueur = listeCases[iCase].positionX / TAILLE_CASE; // 5
    var ligneJoueur = listeCases[iCase].positionY / TAILLE_CASE; // 1
    var casesAccessiblesJoueurs = [];

    for (i=0; i<NOMBRE_CASES_PAR_LIGNE; i++) {
        var indiceColonne = colonneJoueur + i*NOMBRE_CASES_PAR_LIGNE;
        if (listeCases[indiceColonne].type === 'piece')
            casesAccessiblesJoueurs.push(indiceColonne);

        if (i !== colonneJoueur) {
            var indiceLigne = ligneJoueur*NOMBRE_CASES_PAR_LIGNE + i;
            if (listeCases[indiceLigne].type === 'piece')
                casesAccessiblesJoueurs.push(indiceLigne);
        }
    }

    result = casesAccessiblesJoueurs.sort(function (a, b) {  return a - b;  });
    return result;
}

function afficherPopupFinJeu(contenu) {
    var finJeuPopupContent = $('<div class="popup-content"/>'),
        title = $('<h5/>'),
        finJeuPopup = $('<div class="popup"/>'),
        boutonRejouer = creerBoutonRejouer(),
        boutonQuitter = creerBoutonQuitter();

    title.html("Fin de la partie");
    
    finJeuPopupContent.append(title);
    finJeuPopupContent.append(contenu);
    finJeuPopupContent.append(boutonRejouer);
    finJeuPopupContent.append(boutonQuitter);

    finJeuPopup.append(finJeuPopupContent);
    $("body").append(finJeuPopup);
}