$.jqplot(target, json, {
        stackSeries:false,
        captureRightClick: true,
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {
                barMargin: 30,
                highlightMouseDown: true   
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
        location: 'se',
        placement: 'inside'
    }
});

$('#' + target).bind('jqplotDataClick',
    /* */
    function (ev, seriesIndex, pointIndex, data) {
        //console.dir(arguments)
        $('#info1').html('series: ' + seriesIndex + ', point: ' + pointIndex + ', data: ' + data);
    }
);