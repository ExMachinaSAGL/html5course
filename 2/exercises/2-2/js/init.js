(function(window){

	//
	// APPENA DOM é ready VIENE INVOCATA DAL BROWSER
	window.onload = function () {

        var form = document.getElementById('form'),
            validator = new EOC.validator(form);

        validator.add('url', 'url');
        validator.add('url', 'required');
        //validator.remove('url', 'required');
        
        validator.add('email', 'email');
        
        validator.add('age', 'required');
        
        validator.add('product', 'required');
        
        validator.validate();


        // form.onsubmit = function () {};
		
	};
})(this);
