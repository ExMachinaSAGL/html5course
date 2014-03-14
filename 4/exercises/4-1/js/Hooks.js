function doPlot() {
    return $.jqplot(target, json, {
            stackSeries:true,
            captureRightClick: true,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                rendererOptions: {
                    barMargin: 30
                    //,highlightMouseDown: true   
                },
            pointLabels: {show: true}
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer
            },
            yaxis: {
                padMin: 0
            }
        },
        legend: {
            show: true,
            location: 'ne',
            placement: 'inside'
        }
    });
}
var plot = doPlot();


$('#' + target).bind('jqplotDataClick',
    function (ev, seriesIndex, pointIndex, data) {
        $('#info1').html('series: ' + seriesIndex + ', point: ' + pointIndex + ', data: ' + data);
        
        json[seriesIndex][pointIndex]++;
        console.debug(json)
        jQuery('#'+target).empty();
        plot = null;
        plot = doPlot();
    }
)
.bind('jqplotDataRightClick',
    function (ev, seriesIndex, pointIndex, data) {
        $('#info1').html('RIGHTCLICK series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
    }
)
.bind('jqplotDataHighlight',
    function (ev, seriesIndex, pointIndex, data) {
        $('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data+ ', pageX: '+ev.pageX+', pageY: '+ev.pageY);
    }
)
.bind('jqplotDataUnhighlight',
    function (ev) {
        $('#info1').html('Nothing');
    }
);



plot.eventListenerHooks.push(['jqplotMouseMove', myMove]);



function myMove() {
    console.dir(arguments)
}
