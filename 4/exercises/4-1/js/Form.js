jQuery('#form1').show();

function doplot() {
    jQuery('#' + target).empty();
    return $.jqplot(target, [json], {
        seriesDefaults : {
            pointLabels: { show:true }
        }
    });
}; doplot();

jQuery(function (){
    var form = $("#form1 form");
    form.validate({
        rules: {val: {required: true, number : true}},
        submitHandler: function(f) {
            json.push(~~(jQuery('#val').val()));
            doplot();
            return false;
        }
    });
});