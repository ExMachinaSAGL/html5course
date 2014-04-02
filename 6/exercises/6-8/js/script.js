$(function () {

    var body = $('#body'),
        tmp, out,
        mode = 'local', // 'session',
        storage;

    EOC.supports.localStorage(body[0]);
    EOC.supports.sessionStorage(body[0]);

    storage = sessionStorage;


    var fw= function(){};
    function fe(){};var t = 'ffff';


    if (window.addEventListener) {
        window.addEventListener("storage", handle_storage, false);
    } else {
        window.attachEvent("onstorage", handle_storage);
    }
    // 
    // OPPURE 
    // $(window).bind('storage', handle_storage);
    // USANDO e.originalEvent

    function handle_storage(e){
        console.dir(e);
        console.debug('STORAGE NOTIFICATION')
        if (e.oldValue !== e.newValue) {
            console.debug('updated')
            out(e.key, e.newValue);
        } else {
            console.debug('nothing done')
        }
    }


    out = (function (){
        var assoc = {};
        for (var j in storage) {
            assoc[j] = _(j);
        }

        function _(name) {
            var t = document.createElement('p');
            t.className = "strong";
            t.innerHTML = storage.getItem(name);
            body[0].appendChild(t);
            return t;
        }

        return function (name, val){
            
            storage.setItem(name, val);

            if (storage.getItem(name)) {
                assoc[name] = assoc[name] || _(name);
                assoc[name].innerHTML = val;
            } else {
                assoc[name] = _(name);
            }
        }
    })();

    out.debug = function () {
        for (var j in storage){
            console.log(j + ' : ' + storage[j]);
        }
    };
    out.clear = function () {
        storage.clear();
    };





    out('name', 'Frances');
    out('surname', 'Farmer');




    
    window.out = out;
    // show crosscompatibility
    cross(body[0], {i:'8.0+', f: '3.5+', s: '4.0+', c:'4.0+', o:'10.5+', an : '2.0+', ip : '2.0+'});
});