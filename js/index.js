
$(function () {
	creerPlateau(); // creation du plateau de jeu
	placerPiecesAleatoirement(); // placement de piece de façon aléatoire sur plateau

	// on commence le jeu en placant un listener sur les clics effectués sur le plateau
	plateau.on('click', function (e) {
		if(clicAutorise) {
			clicAutorise = false; // on désactive le clic pendant le traitement du tour
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;
			allerA(positionClic(x, y));
		}
	});	

});