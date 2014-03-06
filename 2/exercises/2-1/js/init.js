// 
// FUNZIONE AUTOESEGUENTE
(function(window){

	//
	// APPENA DOM é ready VIENE INVOCATA DAL BROWSER
	window.onload = function () {
		//
		// DEFINIZIONE DI ALCUNE REGEXP UTILI
        var rex = {
            email : new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            url : new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i),
            alfa : new RegExp(/^[A-z]*$/),
            numint : new RegExp(/^[0-9]*$/),
            floatnum : new RegExp(/^[0-9\.]*$/),
            alfanum : new RegExp(/^[A-z0-9]*$/)
        };


        var form = document.getElementById('form'),
            urlField = document.getElementById('url'),
            emailField = document.getElementById('email');


        // L'OGGETTO FORM POSSIEDE UNA FUNZIONE submit
        // CHE VIENE INVOCATA:
        // - alla pressione di un input type "submit"
        // - premendo enter con il focus su un elemento del form
        // onsubmit permette fare override della funzione
        // che di default torna true (e quindi avviene il submit)
        form.onsubmit = function () {
            var ret = true,
                urlCheck = !!urlField.value.match(rex.url),         // boolean cast
                emailCheck = !!emailField.value.match(rex.email);   // boolean cast

            advice(urlField, urlCheck);
            advice(emailField, emailCheck);

            return urlCheck && emailCheck;
        };

        // FUNZIONE MINIMALE PER NOTIFICARE ALL'UTENTE 
        // EVENTUALI ERRORI
        function advice(field, valid){
            field.style.borderColor = valid ? '' : 'red';
        }
		
	};
})(this);
// 
// CONTRO:
// - codice non riutilizzabile
// - ...
// 
// Di punti contro questo approccio ce ne sono molti
// ma l'impossibilitá di riutilizzo é determinante:
// OCCORRE UNA SOLUZIONE MIGLIORE
