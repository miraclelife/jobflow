var w = 800,
    h = 800,
    p = 20;
    
var data = [0,205724,0,5616,156041,294469,73080,132057,51191,12345,79154,90874];
var x = d3.scale.linear().domain([d3.min(data), d3.max(data)]).range([1, 750]);

var vis = d3.select("body")
    .append("svg:svg")
    .attr("class", "vis")
    .attr("width", w)
    .attr("height", h);
    
vis.selectAll("rect")
    .data(data)
    .enter().append("svg:rect")
    .attr("x", function(d, i) { return i * 15 + p;  })
    .attr("y", function(d) { return h - x(d); })
    .attr("width", 14)
    .attr("height", function(d) { return x(d); });
