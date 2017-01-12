function creerBoutonRejouer() {
    var boutonRejouer = $(materializeBtn);
    boutonRejouer.html("Rejouer");    

	boutonRejouer.click(function () {
        rejouerPartie();
    });

    return boutonRejouer;
}

function creerBoutonQuitter() {
	var boutonQuitter = $(materializeBtn);
    boutonQuitter.html("Quitter");

	boutonQuitter.click(function () {
        quitterPartie();
    });

    return boutonQuitter;
}