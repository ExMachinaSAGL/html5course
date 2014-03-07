//dom ready 
jQuery(function (){

        $("#form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            url: {
                required: true,
                url: true
            },
            age: {
                required: true
            },
            product: {
                required: true
            },
            from: {
                required: true
            }
        }
    });

//end dom ready
});
