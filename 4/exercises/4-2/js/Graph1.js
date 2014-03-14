
Raphael(function () {
    var r = Raphael(target, 620, 250),
        e = [],
        clr = [],
        months = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ],
        values = [],
        now = new Date(),
        nowMonth = now.getMonth(),
        month = r.text(310, 27, months[nowMonth]).attr({
            fill: "#000",
            stroke: "none",
            font: '100 18px "Helvetica Neue", Helvetica, "Arial Unicode MS", Arial, sans-serif'
        }),
        rightc = r.circle(364, 27, 10).attr({fill: "#000", stroke: "none"}),
        right = r.path("M360,22l10,5 -10,5z").attr({fill: "#fff"}),
        leftc = r.circle(256, 27, 10).attr({fill: "#000", stroke: "none"}),
        left = r.path("M260,22l-10,5 10,5z").attr({fill: "#fff"}),
        c = r.path("M0,0").attr({fill: "none", "stroke-width": 4, "stroke-linecap": "round"}),
        bg = r.path("M0,0").attr({stroke: "none", opacity: .3}),
        dotsy = [];


    function randomPath(length, j) {

        var path = "",
            x = 10,
            y = 0;
            dotsy[j] = dotsy[j] || [];
        for (var i = 0; i < length; i++) {
            dotsy[j][i] = Math.round(Math.random() * 200);
            if (i) {
                x += 20;
                y = 240 - dotsy[j][i];
                path += "," + [x, y];
            } else {
                path += "M" + [10, (y = 240 - dotsy[j][i])] + "R";
            }
        }
        return path;
    }

    function animation() {
        var time = 500;
        if (nowMonth == 12) {
            nowMonth = 0;
        }
        if (nowMonth == -1) {
            nowMonth = 11;
        }
        var anim = Raphael.animation({path: values[nowMonth], stroke: clr[nowMonth]}, time, "<>");
        c.animate(anim);
        bg.animateWith(c, anim, {path: values[nowMonth] + "L590,250 10,250z", fill: clr[nowMonth]}, time, "<>");
        month.attr({text: months[nowMonth]});
    }
    function next() {
        nowMonth++;
        animation();
    }
    function prev() {
        nowMonth--;
        animation();
    }


    for (var i = 0; i < 12; i++) {
        values[i] = randomPath(30, i);
        clr[i] = Raphael.getColor(0.5);
    }
    c.attr({path: values[0], stroke: clr[0]});
    bg.attr({path: values[0] + "L590,250 10,250z", fill: clr[0]});

    rightc.click(next);
    right.click(next);
    leftc.click(prev);
    left.click(prev);
});