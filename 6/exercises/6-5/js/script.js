
jQuery(function (){

    function readBlob(opt_startByte, opt_stopByte) {

        var files = document.getElementById('files').files;

        if (!files.length) {
            alert('Please select a file!');
            return;
        }

        var file = files[0],
            start = parseInt(opt_startByte) || 0,
            stop = parseInt(opt_stopByte) || file.size - 1,
            reader = new FileReader(),
            trytosplitNL = (start == 0) && (stop == file.size - 1);

        // If we use onloadend, we need to check the readyState.
        reader.onloadend = function(evt) {

            if (evt.target.readyState == FileReader.DONE) { // DONE == 2

                jQuery('#byte_content').html(
                    trytosplitNL ? 
                        evt.target.result.split(/\n/).join("<br/>")
                        :
                        evt.target.result
                );
                jQuery('#byte_range').html(
                    [
                        'Read bytes: ',
                        start + 1,
                        ' - ',
                        stop + 1,
                        ' of ',
                        file.size,
                        ' byte file'
                    ].join(''));
            }
        };

        var blob = file.slice(start, stop + 1);

        reader.readAsBinaryString(blob);
    }

    jQuery('.readBytesButtons').on('click', function(evt) {
        //evt = evt.originalEvent;

        if (evt.target.tagName.toLowerCase() == 'button') {

            var startByte = evt.target.getAttribute('data-startbyte'),
                endByte = evt.target.getAttribute('data-endbyte');

            readBlob(startByte, endByte);
        }
    });
    


    cross(jQuery('#body')[0], {f:'> 9.0', c: true, s : false, o : false, i : false});
});