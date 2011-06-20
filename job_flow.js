var w = 160,
    h = 1000,
    p = 20,  // padding
    bw = 20, // bar width
    color = d3.scale.category20(),
    total = 0,
    start_year = 2006,
    end_year = 2009,
    year_range = d3.range(start_year, (end_year + 1));
    
var data = [
    [0,277327,0,9067,274315,464676,101294,263730,89579,20523,126455,200826],
    [0,284143,0,10577,282397,519793,101964,281983,94312,22244,140527,229644],
    [10287,267881,10231,10606,227619,493492,106061,266825,95696,21538,139753,211732],
    [8528,224599,10779,9539,146603,429586,93868,219336,80778,16970,118866,174771]
];

var rot_data = [ 
    [0,0,10287,8528],
    [277327,284143,267881,224599],
    [0,0,10231,10779],
    [9067,10577,10606,9539],
    [274315,282397,227619,146603],
    [464676,519793,493492,429586],
    [101294,101964,106061,93868],
    [263730,281983,266825,219336],
    [89579,94312,95696,80778],
    [20523,22244,21538,16970],
    [126455,140527,139753,118866],
    [200826,229644,211732,174771]
];
    
var datasum = function(data) {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
        total += d3.max(data[i]);
    }
    return total;
};

var maxmax = function(data) {
    var highest = 0;
    for (var i = 0; i < data.length; i++) {
        var current_max = d3.max(data[i]);
        if (current_max > highest) highest = current_max;
    }
    return highest;
};

var y = d3.scale.linear().domain([0, datasum(data) + maxmax(data)]).range([1, h ]);
var x = d3.scale.ordinal().domain(year_range).rangeBands([(0 + p), (w - p)]);

var vis = d3.select("body")
    .append("svg:svg")
    .attr("class", "vis")
    .attr("width", w)
    .attr("height", h);
    
var yeargroup = vis.selectAll("g")
    .data(year_range)
    .enter().append("svg:g")
    .attr("class", "yearbar")
    //.attr("x", p)//function(d) { return x(d); })
    //.attr("y", p)
    .attr("transform", function(d) { return "translate(" + x(d) + "," + 0 + ")"; });

yeargroup.selectAll("rect")
    .data( function(d) { return data[year_range.indexOf(d)]; })
    .enter().append("svg:rect")
    .attr("x", p)
    .attr("y", function(d, i) { if (i === 0) total = 0; total += y(d3.max(rot_data[i])); return total - y(d3.max(rot_data[i])) + i * 10 + y(d3.max(rot_data[i]) - d) + p; })
    .attr("width", bw)
    .attr("height", function(d) { return y(d); })
    .attr("title", function(d, i) { return act_names[i]; })
    .style("fill", function(d, i) { return color(i); })
    .style("stroke", function(d) { return d === 0 ? "" : "black"; })
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);

function mouseover(d, i) {
    d3.select(this)
        .style("fill-opacity", 0.5);
}

function mouseout(d, i) {
    d3.select(this)
        .style("fill-opacity", 1);
}
