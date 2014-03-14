
var lines = [
        [2, 14, 32, 41, 44, 40, 37],
        [7, 12, 15, 17, 20, 27, 39],
        [5, 11, 13, 12, 24, 23, 36]
    ];
$.jqplot(target, lines, {
    title: 'Stacked Bar Chart with Cumulative Point Labels',
    stackSeries: true,
    seriesDefaults: {
        renderer: $.jqplot.BarRenderer,
        rendererOptions:{barMargin: 25},
        pointLabels:{show:true, stackedValue: true}
    },
    axes: {
        xaxis:{renderer:$.jqplot.CategoryAxisRenderer}
    },
    legend: {
        show: true,
        location: 'nw',
        placement: 'inside'
    },
    series : [
        {label : 'javascript'},
        {label : 'html'},
        {label : 'css'}
    ]
});