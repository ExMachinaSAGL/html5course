var exm = {};
exm.util = {};
exm.util.htmlentities = function (text) {
    return text
        .replace(/&(?![\w\#]+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};