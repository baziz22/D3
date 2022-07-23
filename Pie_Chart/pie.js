let pie_chart_csv_svg = d3.select("#pie-chart-csv-svg");
let pie_chart_csv_width = pie_chart_csv_svg.attr("width");
let pie_chart_csv_height = pie_chart_csv_svg.attr("height");
let pie_chart_csv_radius =
  Math.min(pie_chart_csv_width, pie_chart_csv_height) / 2;
let pie_chart_csv_g = pie_chart_csv_svg
  .append("g")
  .attr(
    "transform",
    "translate(" +
      pie_chart_csv_width / 2 +
      "," +
      pie_chart_csv_height / 2 +
      ")"
  );

let pie_chart_csv_color = d3.scaleOrdinal([
  "#9c889c",
  "#466cd5",
  "#ac2d11",
  "#239ca9",
  "#1acf86",
]);
let pie_chart_csv_pie = d3.pie().value(function (d) {
  return d.percent;
});
let pie_chart_csv_path = d3
  .arc()
  .outerRadius(pie_chart_csv_radius - 40)
  .innerRadius(0);

let pie_chart_csv_label = d3
  .arc()
  .outerRadius(pie_chart_csv_radius - 100)
  .innerRadius(pie_chart_csv_radius - 60);

d3.csv("browsers.csv").then((data) => {
  let pie_chart_csv_arc = pie_chart_csv_g
    .selectAll(".arc")
    .data(pie_chart_csv_pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  pie_chart_csv_arc
    .append("path")
    .attr("d", pie_chart_csv_path)
    .attr("fill", function (d) {
      return pie_chart_csv_color(d.data.browser);
    });

  console.log(pie_chart_csv_arc);

  pie_chart_csv_arc
    .append("text")
    .attr("transform", function (d) {
      return "translate(" + pie_chart_csv_label.centroid(d) + ")";
    })
    .attr("dy", "1.35em")
    .text(function (d) {
      return d.data.browser;
    });
});

pie_chart_csv_svg
  .append("g")
  .attr(
    "transform",
    "translate(" + (pie_chart_csv_width / 2) + "," + 20 + ")"
  )
  .append("text")
  .text("Title")
  .attr("class", "title");
