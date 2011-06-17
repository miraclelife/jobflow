var w = 800,
    h = 600,
    p = 20,  // padding
    bw = 20, // bar width
    total = 0,
    start_year = 2006,
    end_year = 2009,
    year_range = d3.range(start_year, (end_year + 1));
    
var data = [0,205724,0,5616,156041,294469,73080,132057,51191,12345,79154,90874];
var datasum = data.reduce(function(a, b) { return a+b; }); 
var y = d3.scale.linear().domain([0, datasum]).range([1, h - p * 2]);
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
    .attr("x", function(d) { return x(d); })
    .attr("y", p);
    
yeargroup.selectAll("rect")
    .data(data)
    .enter().append("svg:rect")
    .attr("x", p)
    .attr("y", function(d, i) { total += y(d); return total - y(d) + i + p; })
    .attr("width", bw)
    .attr("height", function(d) { return y(d); })
    .attr("fill", function(d) { return d === 0 ? "red" : "steelblue"; })
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);

function mouseover(d, i) {
    d3.select(this)
        .attr("opacity", 0.5);
}

function mouseout(d, i) {
    d3.select(this)
        .attr("opacity", 1);
}

function cross(a) {
  return function(d) {
    var c = [];
    for (var i = 0, n = a.length; i < n; i++) c.push({x: d, y: a[i]});
    return c;
  };
}