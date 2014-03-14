Raphael(function () {
    var paper = Raphael(target, 620, 250);

    

    var c = paper.circle(10, 10, 10);
    // or even like this:
    c.animate({radius: 100}, 1e3);

    paper.path("M10 200L610 200");
});