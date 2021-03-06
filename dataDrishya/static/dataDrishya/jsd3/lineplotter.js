function lineplot(svgclass,data,margin, width, height,attrX, attrY, color, showDistricts)
{
    var widthM = width,
        heightM=height;
    
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
        .orient("left");

    var chart = d3.select("."+svgclass)
    .attr("width", widthM)
    .attr("height", heightM)
    .append("g")
    .attr("transform", "translate("+margin.left + ","+margin.top+")");


    x.domain(data.map(function(d) { return d[attrX];}));
    y.domain([0, d3.max(data, function(d) { return +d[attrY]; })]);

        chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,"+height+")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", -5)
        .attr("font-size", "1px")
        .attr("x", -25)
        .attr("transform", "rotate(-90)")
        .append("text")
        .text("bibek")
        .attr("x", height-20)
        .attr("y", -width/2);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    chart.selectAll(".bar")
        .data(data)
    .enter().append("circle")
        .attr("fill", color)
        .attr("class", "bar")
    .attr("cx", function(d) {return x(d[attrX])+ x.rangeBand()/2;})
        .attr("cy", function(d) { return y(d[attrY]);})
        .attr("r", 2.5);

    chart.selectAll(".txt")
        .data(data)
        .enter()
        .append("g")
        .append("text")
        .attr("class", "district")
        .attr("y", function(d) { return y(d[attrY]); })
        .attr("x", function(d) { return x(d[attrX])+x.rangeBand()/2; })
        .style("fill", "red")
        .text(function(d){if(showDistricts) return d.District;else return "";});

    //.attr("height", function(d) { return height - y(d[[attrY]']); })
    //.attr("width", x.rangeBand());

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 10)
        .attr("y", -20)
        .attr("dy", ".9em")
        .style("text-anchor", "end")
        .text("Ylabel");

 for (i=1;i<data.length;i++)
    {
        break;
        chart.append("path")
            .attr("d", "M "+ (x(data[i-1][attrX])+x.rangeBand()/2)+" "+y(data[i-1][attrY]) + " L "+ (x(data[i][attrX])+ x.rangeBand()/2)+" "+y(data[i][attrY]))
            .attr("stroke", color)
            .attr("stroke-width", "3");

    }
}

