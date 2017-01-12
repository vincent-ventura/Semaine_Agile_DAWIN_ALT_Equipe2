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

function changerTheme() {
    theme = theme === 'pirate' ? 'ange' : 'pirate';
    console.log(theme);
    var imageUrl = "./img/" + theme + "/background.jpg";
    $('body').css("background-image", 'url('+imageUrl+')');
    console.log($('body').css("background-image"));
}