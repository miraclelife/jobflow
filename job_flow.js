var w = 500,
    h = 700,
    p = 20,  // padding
    bw = 20, // bar width
    color = d3.scale.category20(),
    total = 0,
    total2 = 0,
    start_year = 2006,
    end_year = 2009,
    year_range = d3.range(start_year, (end_year + 1));
    
var data = [
    [0,277327,0,9067,274315,464676,101294,263730,89579,20523,126455,200826],
    [0,284143,0,10577,282397,519793,101964,281983,94312,22244,140527,229644],
    [10287,267881,10231,10606,227619,493492,106061,266825,95696,21538,139753,211732],
    [8528,224599,10779,9539,146603,429586,93868,219336,80778,16970,118866,174771]
];

var merged_data = d3.merge(data);

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
var merged_stayers = d3.merge(total_stayers);

var rot_total_stayers = [
    [0,0,8391,6984],
    [205724,210703,216071,190701],
    [0,0,9074,9226],
    [5616,6509,7137,7455],
    [156041,174463,163355,115723],
    [294469,310988,345928,319904],
    [73080,72360,77015,79333],
    [132057,141571,151158,145225],
    [51191,63562,66020,60989],
    [12345,13489,14737,12121],
    [79154,88632,99011,92329],
    [90874,102686,109581,105588]
];

var total_hirings = [
    [0,71603,0,3451,118274,170207,28214,131673,38388,8178,47301,109952],
    [0,73440,0,4068,107934,208805,29604,140412,30750,8755,51895,126958],
    [1896,51810,1157,3469,64264,147564,29046,115667,29676,6801,40742,102151],
    [1544,33898,1553,2084,30880,109682,14535,74111,19789,4849,26537,69183]
];

var merged_hirings = d3.merge(total_hirings);

var total_seps = [
    [0,48272,0,1977,68155,126446,17110,86535,16670,4651,25388,66866],
    [0,53663,0,2038,79224,122608,24070,93681,21086,5874,31482,75568],
    [1655,54239,764,2778,94859,135737,20379,99334,23883,6128,34029,90895],
    [2621,62460,780,2575,93795,145106,21705,94454,25917,7743,39628,83382]
];
    
var merged_seps = d3.merge(total_seps);
    
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
    
var act_year = yeargroup.selectAll("g.yearbar")
    .data( function(d) { return data[year_range.indexOf(d)]; })
    .enter().append("svg:g")
    .attr("title", function(d, i) { return act_names[i]; })
    .attr("class", "tot_rects")
    .attr("transform", function(d, i) {
        if (i === 0) total2 = 0;
        total2 += y(d3.max(rot_data[i]));
        return "translate(" + 0 + "," + (total2 - y(d) + (i * 10)) + ")";
    });
    //.style("stroke", function(d, i) { return color(i); });
    //.on("mouseover", mouseover)
    //.on("mouseout", mouseout);
    
var last_value;
var stat_act_year = act_year.selectAll("g.tot_rects")
    .data(function(d, i) {return [merged_hirings[i], merged_stayers[i]]; })
    .enter().append("svg:rect")
    .attr("x", 0)
    .attr("y", function(d, i) {if (i === 0) {last_value = d; return 0; } else { return y(last_value); } })
    .attr("width", bw)
    .attr("height", function(d) {return y(d); })
    .style("fill", function(d, i) { return i === 0 ? "red" : "steelblue"; });

var counter = -1;
act_year.selectAll("g.tot_rects")
    .data(function(d,i) {return [merged_seps[i]];})
    .enter().append("svg:rect")
    .attr("x", bw)
    .attr("y", function(d, i) {counter++; return y(merged_data[counter] - d);} )
    .attr("width", bw/2)
    .attr("height", function(d) { return y(d); })
    .attr("fill", "orange");
    
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
