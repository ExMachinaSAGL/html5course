jQuery(function (){

    var target = 'plot1',
        $script = jQuery('select[name=script]'),
        $source = jQuery('select[name=source]'),
        $includecode = jQuery('#getcode');
    window.target = target;

    $script.append('<option value="">-- select a script --</option>');

    for (var j in scriptsVSdata) {
        $script.append('<option value="' + j + '">' + j + '</option>');
    }

    $script.on('change', function (){
        var v = jQuery(this).val();
        if (v) {
            $source.empty();
            if (scriptsVSdata[v] !== null) {

                jQuery('#source').show();

                $source.html('<option value="">-- select source --</option>');
                for (var i = 0, l = scriptsVSdata[v].length; i < l; i++) {
                    $source.append('<option value="' + scriptsVSdata[v][i] + '">' + scriptsVSdata[v][i] + '</option>');
                }
            } else {
                jQuery('#source').hide();    
            }


        } else {
            
        }
    });

    function check($f, f) {
        if (!($f.is(':visible'))){
            return true;
        }
        if (!f) {
            $f.css('color', 'red');
        } else {
            $f.css('color', '');
        }
        return f;
    }


    function cleanup() {
        //cleanup, unbind, ....
        window.json = null;
        jQuery('#' + target).empty();
        $('#' + target).unbind('jqplotDataClick');
        $('#' + target).unbind('jqplotDataRightClick');
        $('#' + target).unbind('jqplotDataHighlight');
        $('#' + target).unbind('jqplotDataUnhighlight');
        $('#info1').empty();
    }

    function go() {

        cleanup();
        if (typeof autopudate !== 'undefined') {
            window.clearInterval(autopudate);
        }

        jQuery('#code, #plot').hide();
        var source = $source.val(),
            script = $script.val(),
            includecode = $includecode.prop('checked');

        check($source, source);
        check($script, script);

        if ($source.children().length > 0 && !source) {
            return;
        }

        if (source) {
            jQuery.ajax('../ajaxData/' + source + '.json', {
                type : 'GET',
                dataType : 'json',
                cache: false,
                async : false
            }).done(function (res) {

                includecode && jQuery('#code').fadeIn();

                window.json = res;

            }).fail(function () {
                console.dir(arguments);
            });
        }

        if (script) {
            jQuery('#plot').fadeIn();
            $.ajax({
                url: 'js/' + script + '.js',
                dataType: "script",
                success: function( data, textStatus, jqxhr ) {
                    if (includecode) {
                        jQuery('#code').fadeIn();

                        /**
                         * maybe global var 'json' to be used as dataset in the loaded script
                         * in that case is prepended to the script code
                         */
                        
                        if (typeof json !== 'undefined' && !!json) {
                            data = 'var json = ' + JSON.stringify(json) + ';' + "\n" + data;
                        }
                        data = 'var target = "' + target + '";' +"\n" + data;
                        Rainbow.color(data, 'javascript', function(highlighted_code) {
                            jQuery('#js_code').html(highlighted_code);
                        });
                    }
                }
            });
        }
    }

    jQuery('#doplot').on('click', go);

});
