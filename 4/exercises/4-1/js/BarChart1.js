$.jqplot(target, json, {
        stackSeries:true,
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
        location: 'ne',
        placement: 'inside'
    }
});

$('#' + target).bind('jqplotDataClick',
    function (ev, seriesIndex, pointIndex, data) {
        $('#info1').html('series: ' + seriesIndex + ', point: ' + pointIndex + ', data: ' + data);
    }
);