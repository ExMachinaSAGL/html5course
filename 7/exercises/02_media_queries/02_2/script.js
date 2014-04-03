window.addEventListener('load', function(e) {

	var wrapper = document.querySelector("#wrapper header");
	var section = document.querySelector("section div");
	var aside = document.querySelector("aside div");

	window.addEventListener('resize', function(e){
		 
		wrapper.textContent = wrapper.clientWidth + "px";

		// sarebbe ad esempio possibile caricare asincronamente una serie di risorse
		// per ottimizzare la visualizzazione a questa dimensione
		// evitando di caricare risorse non necessarie
		if (window.matchMedia('all and (min-width: 768px)').matches) {
			
			section.textContent = "{ height: 400px; width: 64.583333%; float: left; }";
			aside.textContent = "{ height: 400px; width: 64.583333%; float: left; }";
			
		}
		else if (window.matchMedia('all and (min-width: 480px) and (max-width: 767px)').matches) {
			section.textContent = "{ height: 200px; width: auto; }";
			aside.textContent = "{ height: 200px; width: auto; }";
		} 
		else if (window.matchMedia('all and (min-width: 320px)').matches) {
			section.textContent = "{ height: 200px; width: auto; }";
			aside.textContent = "{ height: 100px; width: auto; }";
		}
		else {
			section.textContent = "TOO SMALL BABY!";
			aside.textContent = "TOO SMALL BABY!";
		}

	});

});