var vis = d3.select("body")
    .append("svg:svg")
    .attr("class", "vis")
    .attr("width", 800)
    .attr("height", 600);
    
vis.selectAll("circle")
    .data(d3.range(1,8))
    .enter().append("svg:circle")
    .attr("cx", 100)
    .attr("cy", 100)
    .attr("r", function(d) { return d * d; });