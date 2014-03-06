$('document').ready(function() {

	// DRAG
	var listaPazienti = $("section#lista-pazienti ul li");

	listaPazienti.on('dragstart', function(event){
		$(this).addClass('dragging');

		event.originalEvent.dataTransfer.effectAllowed = 'copy';
		event.originalEvent.dataTransfer.dropEffect = 'copy';

		event.originalEvent.dataTransfer.setData('text', $(this).html());
	});

	listaPazienti.on('dragend', function(event){
		$(this).removeClass('dragging');
	});


	// DROP
	var dropArea = $("section#report-paziente div#drop-area");

	dropArea.on('dragover', function(event) {
		event.preventDefault();
	});

	dropArea.on('dragenter', function(event) {
		$(this).removeClass('dropped');
		$(this).addClass('over');
	});

	dropArea.on('dragleave', function(event) {
		$(this).removeClass('over');
	});

	dropArea.on('drop', function(event) {
		$(this).removeClass('over');
		$(this).addClass('dropped');		

		// recupero il contenuto trasmesso col drag
		var data = event.originalEvent.dataTransfer.getData("text");

		// inserisco il contenuto nel div "drop-area"
		$(this).html(data);

		// recupero i "data-" del paziente
		var id = $(this).find("article").data("id");
		var values = $(this).find("article").data("values");

		// utilizzo l'id del paziente nella "data-area"
		plotChart(id, values);

		event.stopPropagation();
		event.preventDefault();
	});



	// Esempio di grafico con JQPLOT
	function plotChart(idPaziente, datiPaziente) {
		$("#chart").html("");
		var plot = $.jqplot("chart", [datiPaziente], {
	    	title: 'Andamento paziente: ' + idPaziente, 
	    	seriesDefaults: {
	      		pointLabels:{ show:true, location:'s', ypadding:3 }
	    	},
	    	axes:{ yaxis:{ pad: 1.3 } }
	  	});
	}



	/*==============================================
	 drag & drop su dispositivi TOUCH
	===============================================*/
	/*
	 soluzione 1: utilizzare librerie di shim (se proprio si vuole mantenere il drag and drop)
	*/
	// es: ios-drag-drop.js

	/*
	 soluzione 2: fallback a eventi click/touch standard (probabilmente meglio)
	*/
	// usando questa soluzione ricordarsi di rimuovere l'include di "<script src="js/ios-drag-drop.js"></script>"
	if ("ontouchstart" in document.documentElement) {	// se passa è un dispositivo touch
		
		listaPazienti.on('touchend', function(event) {
			dropArea.addClass('dropped');
			
			dropArea.html($(this).html());

			var id = $(this).find("article").data("id");
			var values = $(this).find("article").data("values");

			plotChart(id, values);

			event.stopPropagation();
			event.preventDefault();
		});

	}

});