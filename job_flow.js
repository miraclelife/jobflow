var w = 1000,
    h = 600,
    p = 20,  // padding
    bw = 20, // bar width
    total = 0,
    start_year = 2006,
    end_year = 2009,
    year_range = d3.range(start_year, (end_year + 1));
    
var xdata = [0,205724,0,5616,156041,294469,73080,132057,51191,12345,79154,90874];
var data = [
    [0,277327,0,9067,274315,464676,101294,263730,89579,20523,126455,200826],
    [0,284143,0,10577,282397,519793,101964,281983,94312,22244,140527,229644],
    [10287,267881,10231,10606,227619,493492,106061,266825,95696,21538,139753,211732],
    [8528,224599,10779,9539,146603,429586,93868,219336,80778,16970,118866,174771]
];

var datasum = data[1].reduce(function(a, b) { return a+b; }); 
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
    //.attr("x", p)//function(d) { return x(d); })
    //.attr("y", p)
    .attr("transform", function(d) { return "translate(" + x(d) + "," + 0 + ")"; });
    
yeargroup.selectAll("rect")
    .data( function(d) { return data[year_range.indexOf(d)]; })
    .enter().append("svg:rect")
    .attr("x", p)
    .attr("y", function(d, i) { if (i === 0) {total = 0; } total += y(d); return total - y(d) + i + p; })
    .attr("width", bw)
    .attr("height", function(d) { return y(d); })
    .attr("title", function(d, i) { return i; })
    .style("fill", function(d) { return d === 0 ? "red" : "steelblue"; })
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);

function mouseover(d, i) {
    d3.select(this)
        .style("opacity", 0.5);
}

function mouseout(d, i) {
    d3.select(this)
        .style("opacity", 1);
}
