$('document').ready(function() {

	// UTILITIES
	// soluzione crossbrowser per la lettura dell'attributo "data-"
	function getDataSet(el, property) {
		if (el.dataset) { return el.dataset[property]; }
		else { return el.getAttribute("data-" + property); }
	}

	/*
	// cross-browser (vecchi browser)
	function bindEvent(evnt, elem, func) {
	    if (elem.addEventListener) {  // W3C DOM
	        elem.addEventListener(evnt,func,false);
	    }
	    else if (elem.attachEvent) { // IE DOM
	         var r = elem.attachEvent("on"+evnt, func);
			return r;
	    }
	}
	*/


	// DRAG
	var listaPazienti = document.querySelectorAll("section#lista-pazienti ul li");	

	// "listaPazienti" non è un array, ma una lista di nodi del documento HTML
	// per usare "forEach" occorre quindi trasformarlo prima in array.
	// "[].forEach.call(listaPazienti, function(p) {"
	// è una scorciatoia per le due righe seguenti:
	//listaPazienti = Array.prototype.slice.call(listaPazienti, 0);
	//listaPazienti.forEach(function(p) { 

	[].forEach.call(listaPazienti, function(p) {	
		p.addEventListener('dragstart', function(event) {
			// "this" indica l'oggetto che ha scatenato l'evento
			this.classList.add('dragging');

			event.dataTransfer.effectAllowed = 'copy';
			event.dataTransfer.dropEffect = 'copy';

  			event.dataTransfer.setData('text', this.innerHTML);

		}, false);

		p.addEventListener('dragend', function(event) {
			this.classList.remove('dragging');
		}, false);
	});


	// DROP
	var dropArea = document.querySelector("section#report-paziente div#drop-area");

	dropArea.addEventListener('dragover', function(event) {
		event.preventDefault();
	}, false);

	dropArea.addEventListener('dragenter', function(event) {
		this.classList.remove('dropped');
		this.classList.add('over');
	}, false);

	dropArea.addEventListener('dragleave', function(event) {
		this.classList.remove('over');
	}, false);

	dropArea.addEventListener('drop', function(event) {
		this.classList.remove('over');
		this.classList.add('dropped');		

		// recupero il contenuto trasmesso col drag
		var data = event.dataTransfer.getData("text");

		// inserisco il contenuto nel div "drop-area"
		this.innerHTML = data;

		// recupero i "data-" del paziente
		var id = getDataSet(this.querySelector("article"), "id");
		var values = getDataSet(this.querySelector("article"), "values");
		// utilizzo l'id del paziente nella "data-area"
		plotChart(id, values);

		event.stopPropagation();
		event.preventDefault();
	}, false);



	// Esempio di grafico con JQPLOT
	function plotChart(idPaziente, datiPaziente) {
		document.querySelector("#chart").innerHTML = '';
		$.jqplot.config.enablePlugins = true;
        //var s1 = [2, 6, 7, 10, 4, 8];
        //var s2 = [7, 5, 3, 2, 1, 9];
        var ticks = ['2009', '2010', '2011', '2012', '2013', '2014'];
         
        plot1 = $.jqplot('chart', JSON.parse(datiPaziente), {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            title: 'Farmaci somministrati - Paziente numero: ' + idPaziente,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },
            highlighter: { show: false }
        });
     
        $('#chart').bind('jqplotDataClick', 
            function (ev, seriesIndex, pointIndex, data) {
            	debugger;
            	var f = ["Aspirina", "Pomata", "Bende emostatiche", "H2O", "NaCl", "H725"];
                $('#chart-info').html("Farmaco utilizzato: " + f[pointIndex] + " (" + data[1] + ")");
            }
        );
	}



	/*==================================================
	 drag & drop su dispositivi TOUCH - hic sunt leones!
	===================================================*/
	/*
	 soluzione 1: utilizzare librerie di shim (se proprio si vuole mantenere il drag and drop)
	*/
	// es: ios-drag-drop.js


	/*
	 soluzione 2: fallback a eventi click/touch standard (probabilmente meglio)
	*/
	// usando questa soluzione ricordarsi di rimuovere l'include di "<script src="js/ios-drag-drop.js"></script>"
	/*
	if ("ontouchstart" in document.documentElement) {	// se passa è un dispositivo touch
		
		[].forEach.call(listaPazienti, function(p) {
			p.addEventListener('touchend', function(event) {

				dropArea.classList.add('dropped');
				dropArea.innerHTML = this.innerHTML;

				// recupero i "data-" del paziente
				var id = getDataSet(this.querySelector("article"), "id");
				var values = getDataSet(this.querySelector("article"), "values");
				// utilizzo l'id del paziente nella "data-area"
				plotChart(id, values);	

				event.stopPropagation();
				event.preventDefault();  			

			}, false);
		});

	}
	*/

});