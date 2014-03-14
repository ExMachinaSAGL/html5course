
var line1 = [
        ['2008-09-30 4:00PM',4],
        ['2008-10-30 4:00PM',6.5],
        ['2008-11-30 4:00PM',5.7],
        ['2008-12-30 4:00PM',9],
        ['2009-02-15 4:00PM',8.2]
    ];

$.jqplot(target, [line1], {
    title : 'Default Date Axis',
    axes : {
        xaxis : {renderer : $.jqplot.DateAxisRenderer}
    },
    series : [{
        lineWidth : 4,
        markerOptions : {style:'square'}
    }]
});
