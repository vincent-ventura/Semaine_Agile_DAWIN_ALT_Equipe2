(function() {
	// déclaration des variables et création des éléments
	var contenant = document.getElementById('menu');
	let titreJeu = document.createElement('h2'),
		boutonJouerSeul = document.createElement('button'),
		boutonJouerADeux = document.createElement('button'),
		contenantBoutons = document.createElement('div'),
		separation = document.createElement('br');

	// réinitialiser le contenu
	contenant.innerHTML = '';

	// modification des éléments
	titreJeu.innerHTML = 'Tresaure hunt';
	boutonJouerSeul.innerHTML = 'Jouer contre l\'ordinateur';
	boutonJouerADeux.innerHTML = 'Jouer à deux';

	// écouter les événements
	boutonJouerSeul.onclick = jouerSeul;
	boutonJouerADeux.onclick = function() {
			jouer(0);
	};

	// insertion des éléments
	contenant.appendChild(titreJeu);
	contenantBoutons.appendChild(boutonJouerSeul);
	contenantBoutons.appendChild(separation);
	contenantBoutons.appendChild(boutonJouerADeux);
	contenant.appendChild(contenantBoutons);

	function jouerSeul() {
		// déclaration des variables et création des éléments
		var popUp = document.createElement('div');
		let popUpContent = document.createElement('div'),
			popUpTitle = document.createElement('h3'),
			boutonDebutant = document.createElement('button'),
			boutonAvance = document.createElement('button'),
			boutonExpert = document.createElement('button'),
			fermerPopUp = document.createElement('span');

		// modification des éléments

		// attribution des classes
		popUp.className = 'popup';
		popUpContent.className = 'popup-content';
		fermerPopUp.className = 'close';

		// modification du contenu
		fermerPopUp.innerHTML = '&times';
		popUpTitle.innerHTML = 'Choisissez un niveau de difficulté';
		boutonDebutant.innerHTML = 'Mode débutant';
		boutonAvance.innerHTML = 'Mode avancé';
		boutonExpert.innerHTML = 'Mode expert';

		// écouter les événements
		fermerPopUp.onclick = function() {
			contenant.removeChild(popUp);
		};
		boutonDebutant.onclick = function() {
			jouer(1);
		}
		boutonAvance.onclick = function() {
			jouer(2);
		}
		boutonExpert.onclick = function() {
			jouer(3)
		}

		// insertion des elements
		popUpContent.appendChild(popUpTitle);
		popUpContent.appendChild(fermerPopUp);
		popUpContent.appendChild(boutonDebutant);
		popUpContent.appendChild(boutonAvance);
		popUpContent.appendChild(boutonExpert);
		popUp.appendChild(popUpContent);
		contenant.appendChild(popUp);
	}

	function jouer(num) {
		$(contenant).hide();
		etatJeu = num;
		$("#container").show(200);
	}
})();