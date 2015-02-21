function lineplot(svgclass,data,margin, width, height,attrX, attrY, color)
{
    var widthM = 360,
        heightM=500;
    
    height = heightM - margin.top-margin.bottom;
    width = widthM - margin.left-margin.right;
    
    var x = d3.scale.ordinal()
        .rangeRoundBands([0,width], .1);
    
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    
    var y = d3.scale.linear()
        .range([height, 0]);
    
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    var chart = d3.select("."+svgclass)
    .attr("width", widthM)
    .attr("height", heightM)
    .append("g")
    .attr("transform", "translate("+margin.left + ","+margin.top+")");


    x.domain(data.map(function(d) { return d[attrX];}));
    y.domain([0, d3.max(data, function(d) { return d[attrY]; })]);

        chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,"+height+")")
        .call(xAxis);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    chart.selectAll(".bar")
        .data(data)
    .enter().append("circle")
        .attr("class", "bar")
    .attr("cx", function(d) {return x(d[attrX])+ x.rangeBand()/2;})
        .attr("cy", function(d) { return y(d[[attrY]]);})
        .attr("r", 3.5);

    //.attr("height", function(d) { return height - y(d[[attrY]']); })
    //.attr("width", x.rangeBand());

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

 for (i=1;i<data.length;i++)
    {
        chart.append("path")
            .attr("d", "M "+ (x(data[i-1][attrX])+x.rangeBand()/2)+" "+y(data[i-1][attrY]) + " L "+ (x(data[i][attrX])+ x.rangeBand()/2)+" "+y(data[i][attrY]))
            .attr("stroke", color)
            .attr("stroke-width", "3");

    }


}
