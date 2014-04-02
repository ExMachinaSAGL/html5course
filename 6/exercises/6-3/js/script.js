
jQuery(function (){




    function handleFileSelect(evt) {
        evt = evt.originalEvent;

        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {
            
            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            // reader.onload = (function(theFile) {
            //     return function(e) {
            //         // Render thumbnail.
            //         var span = document.createElement('span');

            //         span.innerHTML = [
            //             '<img class="thumb" src="',
            //             e.target.result,
            //             '" title="',
            //             escape(theFile.name),
            //             '"/>'
            //         ].join('');
            //         document.getElementById('out').appendChild(span);
            //     };
            // })(f);
            var f1 = f;
            reader.onload = (function (myfile) {
                return function(e) {
                    
                    // Render thumbnail.
                    var span = document.createElement('span');

                    span.innerHTML = [
                        '<img class="thumb" src="',
                        e.target.result,
                        '" title="',
                        escape(myfile.name),
                        '"/>'
                    ].join('');
                    document.getElementById('out').appendChild(span);
                }
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    }

    //document.getElementById('files').addEventListener('change', handleFileSelect, false);
    jQuery('#files').on('change', handleFileSelect);

    cross(jQuery('#body')[0], {f:'> 9.0', c: true, s : false, o : false, i : false});
});