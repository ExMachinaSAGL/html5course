function plot() {
    $.jqplot(target, [json], {
        seriesDefaults : {
            pointLabels: { show:true }
        }
    })
    .replot();
}
plot();

//
if (autopudate) window.clearInterval(autopudate);
var autopudate = window.setInterval(update, 2000);
function update() {
    //slice
    var j = json.slice(1);

    //foo update
    jQuery.ajax('../ajaxData/getRangeInt.js', {
        type : 'GET',
        dataType : 'script',
        cache: false,
        async : false
    }).done(function (res) {

        var newVal = get(1, 10);
        j.push(newVal);
        json = j;
        plot();
    });
}

