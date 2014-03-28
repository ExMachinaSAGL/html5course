jQuery(function () {

    /**                        
     *                        | setItem(String name, Mixed value);
     *                        |
     * window.localStorage.   | getItem(String name) 
     *                       <
     * window.sessionStorage. | removeItem(String name)
     *                        |
     *                        | clear()
     *                        
     *                  o---------+------------+-----------+---------------o
     *                  | refresh | tab switch | tab close | browser close |
     * o----------------+---------+------------+-----------+---------------|
     * | localStorage   |    V    |      V     |     V     |       X       |
     * +----------------+---------+------------+-----------+---------------|
     * | sessionStorage |    V    |      X     |     X     |       X       |
     * o----------------+---------+------------+-----------+---------------o 
     */
    
    var body = jQuery('#body'),
        mode = 'local',
        storage = window[mode + 'Storage'];
        // localStorage
        // sessionStorage

    EOC.supports.localStorage(body[0]);
    EOC.supports.sessionStorage(body[0]);

    
    //localStorage.clear();
    storage.setItem('name', 'Willy');
    storage.setItem('surname', 'One-eyed');

    // console.dir(storage); //no ff
    console.debug(JSON.stringify(storage));

    for (var j in storage) {
        if (storage.hasOwnProperty(j)) {
            console.debug(j+ ' : ' + storage.getItem(j));
        }
    }


    // show crosscompatibility
    cross(body[0], {i:'8.0+', f: '3.5+', s: '4.0+', c:'4.0+', o:'10.5+', an : '2.1+', ip : '3.2+'});
});