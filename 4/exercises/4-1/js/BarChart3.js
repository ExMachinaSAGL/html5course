
var line1 = [
    ['ZSC Lions', 106],
    ['Fribourg', 86],
    ['Kloten Flyers', 85],
    ['Genève', 83],
    ['HC Lugano', 83],
    ['HC Davos', 83],
    ['Ambri-Piotta', 78],
    ['Lausanne HC', 74],
    ['SC Bern', 70],
    ['EV Zug', 66],
    ['HC Biel', 50],
    ['Lakers', 39],
];

$.jqplot(target, [line1], {
    title: 'Punkte 13 / 3 / 2014',
    series:[{
        renderer:$.jqplot.BarRenderer
    }],
    axesDefaults: {
        tickRenderer: $.jqplot.CanvasAxisTickRenderer
        /*,
        tickOptions: {
            angle: -50,
            fontSize: '10pt'
        }*/
    },
    axes: {
        xaxis: {
            renderer: $.jqplot.CategoryAxisRenderer,
            tickOptions: {
                angle: -70,
                fontSize: '8pt'
            }
        },
        yaxis : {
            tickOptions: {
                angle: 50,
                fontSize: '10pt'
            }
        }
    }
});