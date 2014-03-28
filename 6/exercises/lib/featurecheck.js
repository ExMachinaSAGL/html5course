EOC.makeNS('EOC.supports', {
    _notify : function (res, msg, node){
        if (!res) {
            alert('No ' + msg + ' available!');
        } else {
            var p = document.createElement('p');
            p.innerHTML = msg + ' are available';
            node.appendChild(p);
        }
    },

    file : function (node) {
        this._notify(
            !!(window.File && window.FileReader && window.FileList && window.Blob),
            'FileAPI',
            node
        );
    },

    localStorage : function (node) {
        this._notify(
            'localStorage' in window && window['localStorage'] !== null,
            'localStorageAPI',
            node
        );
    },

    sessionStorage : function (node) {
        this._notify(
            'sessionStorage' in window && window['sessionStorage'] !== null,
            'sessionStorageAPI',
            node
        );
    },

    webDB : function (node) {
        this._notify(
            'openDatabase' in window && window['openDatabase'] !== null,
            'webDB',
            node
        );
    },
    history : function (node) {
        this._notify(
            !!(window.history && history.pushState),
            'historyAPI',
            node
        );
    }
});
