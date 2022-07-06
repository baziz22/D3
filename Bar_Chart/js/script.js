// set the dimensions and margins of the graph
const margin = {top: 25, right: 25, bottom: 25, left: 25};
let svg_width = 600 - margin.right - margin.left;
let svg_height = 500 - margin.top - margin.left;
let dataset;
let barColor = d3.interpolateInferno(0.45);

let graph = d3
.select("#bar-chart")
.append("svg")
.attr("id", "svg-scene")
.attr("width", svg_width)
.attr("height", svg_height)
