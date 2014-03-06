var EOC = {};
EOC.events = {

    bind : (function () {
        if ('addEventListener' in window) {
            return function (el, evnt, cb) {
                return el.addEventListener.apply(el, [evnt, cb, false]);
            };
        } else if ('attachEvent' in window) {
            return function (el, evnt, cb) {
                return el.attachEvent.apply(el, ['on' + evnt, cb]);
            };
        } else {
            throw new Error('No straight way to bind an event');
        }
        return fn;
    })(),

    unbind : (function (){
        if ('removeEventListener' in window) {
            return function (el, evnt, cb) {
                return el.removeEventListener(evnt, cb, false);
            };
        } else if ('detachEvent' in window) {
            return function (el, evnt, cb) {
                return el.detachEvent('on' + evnt, cb);
            }
        } else {
            throw new Error('No straight way to unbind an event');
        }
    })(),

    getCode : function (e) {
        if (e.keyCode) {
            return e.keyCode;
        } else if (e.charCode) {
            return e.charCode;
        } else if (e.which) {
            return e.which;
        }
        return false;
    },
    eventTarget : function (e) {
        e = e ? e : window.event;
        var targetElement = e.currentTarget || (typeof e.target !== 'undefined') ? e.target : e.srcElement;
        if (!targetElement) {
            return false;
        }
        while (targetElement.nodeType === 3 && targetElement.parentNode !== null) {
            targetElement = targetElement.parentNode;
        }
        return targetElement;
    },
    preventDefault : function (e) {
        e = e || W.event;

        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }
};
EOC.dom = {
    insertAfter : function (node, referenceNode) {
        var p = referenceNode.parentNode;
        p.insertBefore(node, referenceNode.nextSibling);
        return node;
    },
    remove : function (el) {
        var parent = el.parentNode;
        parent.removeChild(el);
    }
};