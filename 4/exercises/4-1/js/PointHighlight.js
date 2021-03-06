
var line1 = [
    ['23-May-08', 578.55], ['20-Jun-08', 566.5], ['25-Jul-08', 480.88],
    ['22-Aug-08', 509.84], ['26-Sep-08', 454.13], ['24-Oct-08', 379.75],
    ['21-Nov-08', 303], ['26-Dec-08', 308.56], ['23-Jan-09', 299.14],
    ['20-Feb-09', 346.51], ['20-Mar-09', 325.99], ['24-Apr-09', 386.15]
];
$.jqplot(target, [line1], {
    title:'Data Point Highlighting + Cursor',
    axes:{
      xaxis:{
        renderer:$.jqplot.DateAxisRenderer,
        tickOptions:{
          formatString:'%b&nbsp;%#d'
        }
      },
      yaxis:{
        tickOptions:{
          formatString:'$%.2f'
          }
      }
    },
    highlighter: {
      show: true,
      sizeAdjust: 7.5
    },
    cursor: {
      show: true
      ,tooltipLocation:'se'
    }
});

$('#' + target).bind('jqplotDataClick',
    function (ev, seriesIndex, pointIndex, data) {
        $('#info1').html(
            'series: ' + seriesIndex +
            ', point: ' + pointIndex +
            ', data: ' + data
        );
    }
)