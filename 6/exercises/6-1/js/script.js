jQuery(function (){
    function handleFileSelect(e) {
        // get file list 
        // 
        var files = e.target.files,
            // file list description container
            // 
            output = [];
        // loop 
        // 
        for (var i = 0, l = files.length, f; i < l; i++) {
            f = files[i];
            output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                      f.size, ' bytes, last modified: ',
                      f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                      '</li>');
        }
        jQuery('#out').html('<ul>' + output.join('') + '</ul>');
    }

    jQuery('#file').on('change', handleFileSelect);

    cross(jQuery('#body')[0], {f:'> 9.0', c: true, s : false, o : false, i : false});
});