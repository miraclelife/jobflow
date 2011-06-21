var w = 500,
    h = 700,
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
    
var total_stayers = [
    [0,205724,0,5616,156041,294469,73080,132057,51191,12345,79154,90874],
    [0,210703,0,6509,174463,310988,72360,141571,63562,13489,88632,102686],
    [8391,216071,9074,7137,163355,345928,77015,151158,66020,14737,99011,109581],
    [6984,190701,9226,7455,115723,319904,79333,145225,60989,12121,92329,105588]
];

var total_hirings = [
    [0,0,1896,1544],
    [71603,73440,51810,33898],
    [0,0,1157,1553],
    [3451,4068,3469,2084],
    [118274,107934,64264,30880],
    [170207,208805,147564,109682],
    [28214,29604,29046,14535],
    [131673,140412,115667,74111],
    [38388,30750,29676,19789],
    [8178,8755,6801,4849],
    [47301,51895,40742,26537],
    [109952,126958,102151,69183]
];

var total_seps = [
    [0,0,1655,2621],
    [48272,53663,54239,62460],
    [0,0,764,780],
    [1977,2038,2778,2575],
    [68155,79224,94859,93795],
    [126446,122608,135737,145106],
    [17110,24070,20379,21705],
    [86535,93681,99334,94454],
    [16670,21086,23883,25917],
    [4651,5874,6128,7743],
    [25388,31482,34029,39628],
    [66866,75568,90895,83382]
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
    .attr("transform", function(d) {
        return "translate(" + x(d) + "," + 0 + ")";
        });
/*
yeargroup.selectAll("g")
    .data(["total_hirings", "total_stayers"])
    .enter().append("svg:g")
    .attr("class", "act_year")
    */
    
var act_year = yeargroup.selectAll("rect")
    .data( function(d) { return data[year_range.indexOf(d)]; })
    .enter().append("svg:rect")
    .attr("x", p)
    .attr("y", function(d, i) {
        if (i === 0) total = 0;
        total += y(d3.max(rot_data[i]));
        return  total - y(d) + (i * 10); })
    .attr("width", bw)
    .attr("height", function(d) { return y(d); })
    .attr("title", function(d, i) { return act_names[i]; })
    .attr("class", "tot_rects")
    .style("fill", function(d, i) { return color(i); })
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);
    
vis.selectAll(".tot_rects")
    .data(d3.merge(total_hirings))
    .append("svg:rect")
    .attr("x", function() {console.log(this.attr.x);return this.x;})
    .attr("y", function() {return this.y;})
    .attr("width", function() { return this.width;})
    .attr("height", function(d) {return y(d);})
    .style("fill", "blue");
    
    
function mouseover(d, i) {
    d3.select(this)
        .style("fill-opacity", 1)
        .style("stroke", function() { return this.style.fill; });
}

function mouseout(d, i) {
    d3.select(this)
        .style("fill-opacity", 0.5)
        .style("stroke", "none");
}
