var http = require('http');
var fs = require('fs');
var path = require('path');
var WebSocketServer = require('websocket').server;


// web server
// ====================================================
var app = http.createServer(function(request, response) {
	// routing minimale
	var filePath = '.' + request.url;
	if (filePath == './') filePath = './index.html';	// default page
	
	var extension = path.extname(filePath);
	var contentType = 'text/html';
	switch (extension) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}

	path.exists(filePath, function(exists) {
		if (exists) {
			fs.readFile(filePath, function(err, data) {
				if (err) {
					response.writeHead(500);
					return response.end('Error loading ' + filePath + '.html');
				}
				response.writeHead(200, {'Content-Type': contentType });
				response.end(data, 'utf-8');
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});
});

app.listen(8088, function() {
    console.log((new Date()) + " Server is listening on port 8088");
});



// WEBSOCKET server
// ====================================================
var global_counter = 0,
	all_active_connections = {};

wsServer = new WebSocketServer({
    httpServer: app
});

wsServer.on('request', function(request) {
	var connection = request.accept(null, request.origin);
	
	// collezione delle connessioni aperte
	var id = global_counter++;
	all_active_connections[id] = connection;
	connection.id = id; 
	
	// dati ricevuti dal client
	connection.on('message', function(message) {
		var data = JSON.parse(message.utf8Data);
		
		// broadcast dati chart
		if (data.fn === "chartBroadcast") { connection.chartBroadcast = true; return; }
	
		// chiamate normali
		services.exec.call(connection, data);
	});

	// chiusura della connessione
	connection.on('close', function(reasonCode, description) {
        var text = "Peer " + connection.remoteAddress + " closed connection because: " + description + "(" + reasonCode + ")";
		services.echo.call(connection, {text: text});

        // rimuove la connessione dalla collection
        delete all_active_connections[connection.id];
    });
});



// servizi disponibili
// ====================================================
var services = {
	exec: function(data) {
		services[data.fn].call(this, data);
	},
	// ritorna al client gli stessi dati da lui inviati
	echo: function(data) {
		var connection = this;
		connection.sendUTF(data.text);
	},
	// random chart data
	chartRandom: function(data) {
		var connection = this;
		var x = data.x;		
		
		setInterval(function() {
			x++;
			var y = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
			connection.send(JSON.stringify([x,y]));
		}, 1000);
	},
	/* 	
		NOTA: per il broadcast occorre implementare un filtro sulla chiamata/risposta (su server o client)
		in modo da non inviare messaggi sbagliati ai client che non se li aspettano
		vedi esempio "chartBroadcast"
	*/
	// broadcast dei dati aggiornati dall'utente
	chartUserUpdateBroadcast: function(data) {
		var x = parseInt(data.x);
		var y = parseInt(data.y);

		for (connection in all_active_connections) {
			all_active_connections[connection].send(JSON.stringify([x,y]));
		}
	},
	// backoffice broadcast
	backofficeUpdateBroadcast: function(data) {
		var n = data.nome;
		var c = data.cognome;
		var t = data.testo;

		for (connection in all_active_connections) {
			if (this.id != all_active_connections[connection].id) {
				all_active_connections[connection].send(JSON.stringify({nome: n, cognome: c, testo: t}));
			}
		}
	}
};

// broadcast continuo dati chart a tutti i client connessi e "autorizzati"
var broadcastX = 0;
setInterval(function() {
	var idx, connection;
	
	broadcastX++;
	var y = Math.floor(Math.random() * (9 - 0 + 1)) + 0;

	for (idx in all_active_connections) {
    	connection = all_active_connections[idx];
		// verifico prima che si tratti di una connessione in attesa di questo aggiornamento
		if (connection.chartBroadcast) { connection.send(JSON.stringify([broadcastX,y])); }
    }
}, 1000);
