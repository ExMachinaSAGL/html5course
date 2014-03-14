
var line1 = [
        ['2008-06-9 8:00AM',4],
        ['2008-7-9 8:00AM',6.5],
        ['2008-8-9 8:00AM',5.7],
        ['2008-9-9 8:00AM',9],
        ['2008-10-9 8:00AM',8.2]
    ];
$.jqplot(target, [line1], {
    title:'Customized Date Axis',
    gridPadding : {right : 35},
    axes : {
        xaxis : {
            renderer : $.jqplot.DateAxisRenderer,
            tickOptions : {formatString : '%b %#d, %y'},
            min : 'May 1, 2008',
            tickInterval : '1 month'
        }
    },
    series : [{
        lineWidth : 4,
        markerOptions : {style : 'square'}
    }]
});