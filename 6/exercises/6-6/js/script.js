jQuery(function () {
    
    var body = document.getElementById('body');

    window.addEventListener('online', function(e) {
        console.debug('online');
    });
    window.addEventListener('offline', function(e) {
        console.debug('offline');
    });



    // show crosscompatibility
    cross(body[0], {i:'8.0+', f: '3.5+', s: '4.0+', c:'4.0+', o:'10.5+', an : '2.1+', ip : '3.2+'});
});