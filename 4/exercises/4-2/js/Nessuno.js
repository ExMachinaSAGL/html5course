
var node = jQuery('#' + target),
    position = node.position(),
    dim = {w : 640, h : 480},
    paper = Raphael(target, dim.w, dim.h),
    rect = paper.rect(0, 0, dim.w, dim.h).attr({fill: "#333", stroke: "none"}),
    eyes = null;

function Eye(x, y) {
    this.bulb = null;
    this.irid = null;
    this.x = x;
    this.y = y;
}
Eye.prototype.init = function () {
    this.bulb = paper.circle(this.x, this.y, 100)
        .attr("fill", "#ddd")
        .attr("stroke", "#800")
        .attr("fill", "r(0.25, 0.75)#fff-#fff-#f50-#f00-#f00-#000")
        .attr("fill-opacity", 0.5),
    this.irid = paper.circle(this.x, this.y, 30).attr({
        fill : "#000",
        stroke : "#888"
    });
};

var eyeL = new Eye(200, 240),
    eyeR = new Eye(440, 240);
eyes = [eyeL, eyeR];    

eyeL.init();
eyeR.init();

function reactor(e) {
    var left = e.clientX - position.left,
        top = e.clientY - position.top,
        dist,
        angle,
        cutoff = 65,
        max = Math.sqrt(440 * 440 + 200 * 200);
    for (var i = 0, l = eyes.length; i < l; i++) {
        dist = cutoff * Math.sqrt((eyes[i].y - top)*(eyes[i].y - top) + (eyes[i].x - left)*(eyes[i].x - left)) / max;
        dist *= 2;
        if (dist > cutoff) dist = cutoff;
        angle = Math.atan2(eyes[i].y - top, eyes[i].x - left); //* 2 * Math.PI;
        eyes[i].irid.attr({cx : eyes[i].x - dist*Math.cos(angle), cy :  eyes[i].y - dist*Math.sin(angle) } );
    }
};

rect.mousemove(reactor);
for (var i = 0, l = eyes.length; i < l; i++) {
    eyes[i].bulb.mousemove(reactor);
    eyes[i].irid.mousemove(reactor);
}
