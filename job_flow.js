var w = 800,
    h = 800,
p = 20,
total = 0;
    
var data = [5000,205724,50000,5616,156041,294469,73080,132057,51191,12345,79154,90874];
var datasum = data.reduce(function(a, b) { return a+b; }) 
var y = d3.scale.linear().domain([0, datasum]).range([1, 750]);

var vis = d3.select("body")
    .append("svg:svg")
    .attr("class", "vis")
    .attr("width", w)
    .attr("height", h);
    
vis.selectAll("rect")
    .data(data)
    .enter().append("svg:rect")
    .attr("x", 20)
    .attr("y", function(d, i) { total += d; console.log(y(d));return y(total - d) +20 ; })
    .attr("width", 14)
    .attr("height", function(d) { return y(d); })
    .on("mouseover", function() { d3.select(this).attr("width", 30); });
