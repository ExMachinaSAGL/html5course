self.onmessage = function(e) {
    var str = e.data.str;
    var ab = e.data.ab;
    var i8 = e.data.i8;

    console.log("=== WORKER =======================");
	console.debug(str);
	console.debug(ab.byteLength);
	console.debug(i8);
	console.log("=== WORKER =======================");
}