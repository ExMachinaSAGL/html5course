$('document').ready(function() {

	// callback OK per "navigator.geolocation.getCurrentPosition"
    // riempie il form coi dati derivati dalla geolocalizzazione (utilizza google maps)
    function fillForm(position) {
        var geocoder = new google.maps.Geocoder(),
        	latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        
        geocoder.geocode({'location' : latlng}, function(results, status) {
            if (status != google.maps.GeocoderStatus.OK) {
                $('#location-info').html("Errore durante il rilevamento della posizione.");
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

                $("#loc-via").val(route + ', ' + street_number);
                $("#loc-npa").val(postal_code);
                $("#loc-citta").val(locality);
                $("#loc-nazione").val(country);
                
                $('#location-info').html("");
            }
        });
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
        $('#location-info').html(info);
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
        $("#log-geo-params pre").html(JSON.stringify(position, null, 2));
    }


    // pulsante "localizza"
	$("#btn-get-location").on('click', function() {
		// se disponibile, avvia la geolocalizzazione
		if (navigator.geolocation) {
        	var options = {
        		enableHighAccuracy: true,	// boolean
        		timeout: 1000, 				// millisecondi
        		maximumAge: 3000			// millisecondi
        	};
            navigator.geolocation.getCurrentPosition(
            	function(position) { fillForm(position); setMap(position); }, // success callback
            	locationError, // error callback
            	options // geolocation options
            );

            /*
            // "watchPosition": si aggiorna automaticamente ogni volta che la posizione dell'utente cambia
            var posIdx = navigator.geolocation.watchPosition(fillForm, locationError, options);
            // interrompe il watch
            navigator.geolocation.clearWatch(posIdx);
            */
        } else {
            $('#location-info').html("Geolocation API non supportata.");
        }
	});


	// pulsante "mappa"
	$("#btn-show-map").on('click', function() {		
		$("#map").toggle();
	});


    // pulsante "geo params"
    $("#btn-geo-params").on('click', function() {     
        $("#log-geo-params").toggle();
    });


	// pulsante "reset"
	$("#btn-reset").on('click', function() {		
		// svuota e chiude la mappa
		var map = $("#map");
		map.html("");
		map.removeClass("visible");

        // svuota e chiude il log-geo-params
        $("#log-geo-params pre").html("");
        $("#log-geo-params").removeClass("visible");

		// svuota il form
		$("#loc-via").val("");
        $("#loc-npa").val("");
        $("#loc-citta").val("");
        $("#loc-nazione").val("");

        // svuota la drop-area
        var dropArea = $("#drop-area");
       	dropArea.html("trascinare qui un paziente");
        dropArea.removeClass("dropped");

        // svuota la data-area
        $("#data-area #chart").html("");
	});

});