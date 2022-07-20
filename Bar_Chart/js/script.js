// set the dimensions and margins of the graph
let margin = {top: 25, right: 25, bottom: 25, left: 25};
let svg_width = 600 - margin.right - margin.left;
let svg_height = 500 - margin.top - margin.left;

let  = [35,46,56,81,45,70];
let barColor = d3.interpolateInferno(0.45);

let graph = d3
.select("#bar-chart")
.append('svg')
.attr("width", svg_width)
.attr("height", svg_height)

let g = graph
    .append("g")
    .attr("id", "g-main-barchar-scale-axis")
    .attr("transform", "translate(" + 100 + "," + 20 + ")");
    let axisx = g
    .append("g")
    .attr("id", "axisx")
let axisy = g
    .append("g")
    .attr("id", "axisy");
let rect = g.append("g")
    .attr("id", "rect");

let scalex = d3.scaleBand()
    .range([0, svg_width - 150 ])
    .padding(0.2)

let scaley = d3.scaleLinear()
    .range([svg_height - 120, 30 ])

    d3.csv("dd.csv").then((d) => {
        scalex.domain(d.map((data) => data.year));
        axisx.attr("transform", "translate(0," + (svg_height - 120) + ")")
        .call(d3.axisBottom(scalex))
        .append("text")
        .attr("text-anchor", "end")
        .text("Years")
        .attr("font-size", "24px")
        .attr("fill", "black")
        .attr("transform", "translate("+svg_width/2.4 +",40)");

        scaley.domain([0,d3.max(d,(data) => data.value)])
        axisy
        .call(d3.axisLeft(scaley).tickFormat(function(d){
            return "$"+ d;
        }).ticks(20))
        .append("text")
        .attr("x", svg_height * -1 / 3)
        .attr("y", "0")
        .attr("dy", "-2.1em")
        .attr("text-anchor", "end")
        .text("Price")
        .attr("font-size", "24px")
        .attr("fill", "black")
        .attr("transform", "rotate(-90)");

        g.selectAll(".bar")
            .data(d)
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("x", (d) => scalex(d.year))
            .attr("y", svg_height - 120)
            .attr("width", scalex.bandwidth())
            .transition()
            .ease(d3.easeBounce)
            .duration(1500)
            .delay(function (d, i) {
                return i * 100;
            })
            .attr("y", (d) => scaley(d.value))
            .attr("height", (d) => svg_height - scaley(d.value) - 120)
            .attr("fill", data => { 
                return (data.value === d3.max(d,  data => data.value)) 
                ? "orange" : barColor})
           ;

    });
    // Add Label to the Chart
    g.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", "10")
    .attr("y", "10")
    .text("The Title")
    .style("font-size", "24")