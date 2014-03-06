$('document').ready(function() {	
		
	// callback OK per "navigator.geolocation.getCurrentPosition"
    // riempie il form coi dati derivati dalla geolocalizzazione (utilizza google maps)
    function fillForm(position) {
        var geocoder = new google.maps.Geocoder(),
        	latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        
        geocoder.geocode({'location' : latlng}, function(results, status) {
            if (status != google.maps.GeocoderStatus.OK) {
                document.querySelector('#location-info').innerHTML = "Errore durante il rilevamento della posizione.";
            } 
            else {
                var country,
                	locality,
                	postal_code,
                	street_number,
                	route;

                for (var i = 0; i < results[0].address_components.length; i++) {           
                    switch(results[0].address_components[i].types[0]) {             
                        case 'country':
                            country = results[0].address_components[i].long_name
                        	break;
                        case 'locality':
                            locality = results[0].address_components[i].long_name
                        	break;
                        case 'postal_code':
                            postal_code = results[0].address_components[i].long_name
                        	break;
                        case 'street_number':
                            street_number = results[0].address_components[i].long_name
                        	break;
                        case 'route':
                            route  = results[0].address_components[i].long_name
                        	break;
                        default:
                        	break;
                    }
                }

                document.querySelector("#loc-via").value = route + ', ' + street_number;
                document.querySelector("#loc-npa").value = postal_code;
                document.querySelector("#loc-citta").value = locality;
                document.querySelector("#loc-nazione").value = country;
                
                document.querySelector('#location-info').innerHTML = "";
            }
        });
    }


    // disegna la mappa (utilizza google maps)
    function setMap(position) {
        // default options
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var	options = {
        	center: latlng,
        	zoom: 15
    	};
		var	map = new google.maps.Map(document.querySelector("#map"), options);
		var	marker = new google.maps.Marker({
        	position: latlng,
        	map: map
    	});
    }


    // scrive la risposta tornata dalla geolocalizzazione
    function writeLogGeoParams(position) {
        // chrome only?
        var s = JSON.stringify(position, null, 2);
        document.querySelector("#log-geo-params pre").innerHTML = s;
    }


    // callback KO per "navigator.geolocation.getCurrentPosition"
    // gestisce gli errori in fase di geolocalizzazione
    function locationError(error) {
        var info = 'Errore di geolocalizzazione: ';
        switch(error.code) {
            case error.TIMEOUT:
                info += 'timeout.';
                break;
            case error.PERMISSION_DENIED:
                info += 'accesso alla geoloaction API non consentito.';
                break;
            case error.POSITION_UNAVAILABLE:
                info += 'impossibile determinare la posizione.';
                break;
            case error.UNKNOWN_ERROR:
                info += 'errore sconosciuto.';
                break;
        }
        document.querySelector('#location-info').innerHTML = info;
    }


    // pulsante "localizza"
	var btnGetLocation = document.querySelector("#btn-get-location");

	btnGetLocation.addEventListener('click', function() {
		// se disponibile, avvia la geolocalizzazione
		if (navigator.geolocation) {
        	
            var options = {
        		enableHighAccuracy: true,	       // boolean
        		timeout: 10000, 				   // millisecondi
        		maximumAge: 3000			       // millisecondi
        	};

            navigator.geolocation.getCurrentPosition(
            	function(position) {               // success callback
                    fillForm(position); 
                    setMap(position); 
                    writeLogGeoParams(position);
                },
            	locationError,                     // error callback
            	options                            // geolocation options
            );

            /*
            // "watchPosition": si aggiorna automaticamente ogni volta che la posizione dell'utente cambia
            var posIdx = navigator.geolocation.watchPosition(fillForm, locationError, options);
            // interrompe il watch
            navigator.geolocation.clearWatch(posIdx);
            */
            
        } else {
            document.querySelector('#location-info').innerHTML = "Geolocation API non supportata.";
        }
	}, false);	


	// pulsante "mappa"
	var btnShowMap = document.querySelector("#btn-show-map");

	btnShowMap.addEventListener('click', function() {		
		var	map = document.querySelector("#map");
		map.classList.toggle("visible");
	}, false);


    // pulsante "geo params"
    var btnLogGeoParams = document.querySelector("#btn-geo-params");

    btnLogGeoParams.addEventListener('click', function() {       
        var logGeoParams = document.querySelector("#log-geo-params");
        logGeoParams.classList.toggle("visible");
    }, false);


	// pulsante "reset"
	var btnReset = document.querySelector("#btn-reset");

	btnReset.addEventListener('click', function() {		
		// svuota e chiude la mappa
		var map = document.querySelector("#map");
		map.innerHTML = "";
		map.classList.remove("visible");

        // svuota e chiude il log-geo-params
        document.querySelector("#log-geo-params pre").innerHTML = "";
        document.querySelector("#log-geo-params").classList.remove("visible");

		// svuota il form
		document.querySelector("#loc-via").value = "";
        document.querySelector("#loc-npa").value = "";
        document.querySelector("#loc-citta").value = "";
        document.querySelector("#loc-nazione").value = "";

        // svuota la drop-area
        var dropArea = document.querySelector("#drop-area");
       	dropArea.innerHTML = "trascinare qui un paziente";
        dropArea.classList.remove("dropped");

        // svuota la data-area
        document.querySelector("#data-area #chart").innerHTML = "";
        document.querySelector("#data-area #chart-info").innerHTML = "";
	}, false);

});