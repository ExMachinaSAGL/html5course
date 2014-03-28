window.addEventListener('load', function(e) {


    window.addEventListener('online', function(e) {
        
        console.debug('online');

        var appCache = window.applicationCache;
        appCache.update(); // Attempt to update the user's cache.
        if (appCache.status == window.applicationCache.UPDATEREADY) {
            appCache.swapCache();  // The fetch was successful, swap in the new cache.
        }

        appCache.addEventListener('updateready', function(e) {
            if (appCache.status == appCache.UPDATEREADY) {
                // Browser downloaded a new app cache.
                if (confirm('A new version of this site is available. Load it?')) {
                    window.location.reload();
                }
            } else {
                // Manifest didn't changed. Nothing new to server.
            }
        }, false);
    });

    window.addEventListener('offline', function(e) {
        console.debug('offline');
    });




    var b = document.getElementById('body'),
        img = document.createElement('img'),
        p = document.createElement('p');

    //clean body
    b.innerHTML = '';

    img.setAttribute('src', 'images/avatar.png');
    p.innerHTML = 'hello my Friend';
    b.appendChild(img);
    b.appendChild(p);




}, false);