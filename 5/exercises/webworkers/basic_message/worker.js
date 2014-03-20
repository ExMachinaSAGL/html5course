// nel contesto del worker, sia "this" che "self" si riferiscono al contensto globale del worker

self.addEventListener('message', function(e) {
	self.postMessage("worker - " + e.data);
});