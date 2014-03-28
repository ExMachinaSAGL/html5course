jQuery(function () {

    var body = document.getElementById('body');
    EOC.supports.history(body);

    /**
     * window.history.
     *     back()
     *     forward()
     *     go(Number n) //IE allows non-standard String param
     *     length
     *
     * Con html5 esistono dei metodi aggiuntivi che permettono di
     * aggiungere / modificare
     * gli elementi contenuti in window.history
     *
     * metodo pushState(Object stateObject, String title, String file)
     * ------------------
     * crea un nuovo elemento in history
     * 
     * 
     * metodo replaceState()
     * ---------------------
     * modifica lo state o url dell'item corrente in history
     * 
     * evento popstate
     * ---------------
     * 
     * 
     * proprietá state
     * ---------------
     * 
     */
    window.onpopstate = function(event) {
        console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
        console.debug(history.state);
    };

    jQuery('#butt1').on('click', function (e){
        history.pushState({page: 1}, "title 1", "back.html");
    });

    jQuery('#butt2').on('click', function (e){
        history.replaceState({page: 0}, "title 0", "?page=1");
    });

    // show crosscompatibility
    cross(body, {i:false, f: '4.0+', s: '5.0+', c:'8.0+', o:'11.5+', an : false, ip : '4.2.1+'});
});