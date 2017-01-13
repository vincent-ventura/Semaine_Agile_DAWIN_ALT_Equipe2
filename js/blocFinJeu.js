// FICHIER RECENSANT TOUTES LES FONCTIONS RELATIVES A LA FIN DU JEU

/*
 * fonction qui verifie si le joueur courant a depassé les 500 points
 */
function verifierFinJeu500Points (joueur) {
	if(joueur.score > 500) { // si 500 points depassés -> finJeu
        var contenu = "Le joueur " + joueur.nom + " a gangé la partie avec " + joueur.score + " points !";
        afficherPopupFinJeu(contenu);
        traitementScoreFinal(joueur.nom, joueur.score);
    }
	else // on change de joueur afin de continuer à jouer
		finDuTour();
}

/*
 * fonction qui verifie si le joueur courant peut encore se deplacer
 */
function verifFinJeuPlusDeCasesAccessibles (){
    casesAccessiblesJoueurs = determinerCasesAccessibles(iJoueurs);

    if(!casesAccessiblesJoueurs.length) { // si aucunes cases accessibles -> finJeu
        var contenu = "Le joueur " + (isJ1Turn ? joueur1.nom : joueur2.nom) + " a gangé la partie car il ne peut plus jouer !";
        afficherPopupFinJeu(contenu);
        traitementScoreFinal(joueur.nom, joueur.score);
    }
}

/*
 * fonction chargée d'affichée la popup de fin de jeu
 */
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