function cross(trg, opts) {
    var el = document.createElement('div'),
        tmp;
    el.className = 'compat';
    
    for (var j in opts) {
        tmp = document.createElement('span');
        tmp.className = j + '_' + (opts[j] ? 'ok' : 'ko');
        if (opts[j] && opts[j].length) tmp.title = opts[j];
        el.appendChild(tmp);
    }
    trg.appendChild(el);
}