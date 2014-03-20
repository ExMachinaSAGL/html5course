importScripts('ext_script1.js', 'ext_script2.js');

self.addEventListener('message', function(e) {
	var msg = "Il worker dice: " + e.data + " - " + addDate() + " - " + addRandom();

	self.postMessage(msg);

	// chiusura del webworker dal webworker stesso
	self.close();
});