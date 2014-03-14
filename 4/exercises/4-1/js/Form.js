jQuery('#form1').show();

function doplot() {
    
    //jQuery('#' + target).empty();

    return $.jqplot(target, [json], {
        seriesDefaults : {
            pointLabels: { show:true }
        }
    });//.replot();
}; doplot();


var form = $("#form1 form");

form.validate({
    rules: {val: {required: true, number : true}},
    submitHandler: function(f) {
        json.push(parseInt(jQuery('#val').val(), 10));
        doplot();
        return false;
    }
});
