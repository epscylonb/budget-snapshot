var PieChart = {
  draw: function(lines) {
    var w = 600, h = 600, r = 100;
    var color = d3.scale.category20c();

    var dataArr = [];
    jQuery.map(lines, function(line) {
      var data = {};
      data['label'] = line.description;
      data['value'] = line.perDay();
      dataArr.push(data);
    });

    $('div#income-pie').empty();
    var vis = d3.select('div#income-pie')
      .append('svg:svg').data([dataArr])
      .attr('width', w)
      .attr('height', w)
      .append('svg:g')
      .attr('transform', 'translate(' + r + ',' + r + ')');

    var arc = d3.svg.arc().outerRadius(r);

    var pie = d3.layout.pie()
      .value(function(d) { return d.value });

    var arcs = vis.selectAll('g.slice')
      .data(pie)
      .enter()
      .append('svg:g')
      .attr('class', 'slice');

    arcs.append('svg:path')
      .attr('fill', function(d, i) { return color(i) })
      .attr('d', arc);

    arcs.append('svg:text')
      .attr('transform', function(d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        return 'translate(' + arc.centroid(d) + ')';
      })
      .attr('text-anchor', 'middle')
      .text(function(d,i) { return dataArr[i].label; });

  }
}
