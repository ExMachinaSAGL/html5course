var s1 = [200, 600, 700, -100],
    s2 = [460, -210, 690, 820],
    s3 = [-260, -440, 320, 200],
    ticks = ['May', 'June', 'July', 'August'];

$.jqplot(target, [s1, s2, s3], {
    // The "seriesDefaults" option is an options object that will
    // be applied to all series in the chart.
    seriesDefaults:{
        renderer:$.jqplot.BarRenderer,
        rendererOptions: {fillToZero: true}
    },
    // Custom labels for the series are specified with the "label"
    // option on the series option.  Here a series option object
    // is specified for each series.
    series:[
        {label:'Hotel'},
        {label:'Event Regristration'},
        {label:'Airfare'}
    ],
    // Show the legend and put it outside the grid, but inside the
    // plot container, shrinking the grid to accomodate the legend.
    // A value of "outside" would not shrink the grid and allow
    // the legend to overflow the container.
    legend: {
        show: true,
        placement: 'outsideGrid'
    },
    axes: {
        // Use a category axis on the x axis and use our custom ticks.
        xaxis: {
            renderer: $.jqplot.CategoryAxisRenderer,
            ticks: ticks
        },
        // Pad the y axis just a little so bars can get close to, but
        // not touch, the grid boundaries.  1.2 is the default padding.
        yaxis: {
            pad: 1,
            tickOptions: {formatString: '$%d'}
        }
    }
});