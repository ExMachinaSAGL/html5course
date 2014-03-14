$(function () {

    // Create the chart
    $('#' + target).highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Browser market shares. November, 2013.'
        },
        subtitle: {
            text: 'Click the slices to view versions. Source: netmarketshare.com.'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        }, 

        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: json[0]
        }],
        drilldown: {
            series: json[1]
        }
    })
});