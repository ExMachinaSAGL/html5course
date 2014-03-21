
jQuery(function (){

        


    function handleFileSelect(evt) {
        //evt = evt.originalEvent;
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer.files; // FileList object.

        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                '</li>'
            );
        }
        jQuery('#out').html ('<ul>' + output.join('') + '</ul>');
    }

    function handleDragOver(evt) {
        //evt = evt.originalEvent;
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }




    // Setup the dnd listeners.
    var dropzone = document.getElementById('dropzone');
    dropzone.addEventListener('dragover', handleDragOver, false);
    dropzone.addEventListener('drop', handleFileSelect, false);
    

    // //jQuery.event.props.push('dataTransfer');
    // var dropzone = jQuery('#dropzone');
    // dropzone.on( 'dragenter dragover', handleDragOver);
    // dropzone.on('drop', handleFileSelect);
    

    
    /// hummmmm ? 

    /// !!!!!
    // http://weblog.bocoup.com/using-datatransfer-with-jquery-events/  
    // 
    


    cross(jQuery('#body')[0], {f:'> 9.0', c: true, s : false, o : false, i : false});
});