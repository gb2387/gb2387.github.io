var WeeklyDeath={
    display: async function () {

        d3.select("#WeeklyCase").selectAll("#stateDiv").remove();
        d3.select("#WeeklyCase").select("svg").remove();
        d3.select("#WeeklyDeath").selectAll("#stateDiv1").remove();
        d3.select("#WeeklyDeath").select("svg").remove();
      //d3.select("#WeeklyCase").selectAll("select").delete();
      //d3.select("#WeeklyCase").selectAll("option").delete();
      
        var margin = {top: 10, right: 30, bottom: 50, left: 60},
          width = 1400 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
          
        if(data1==null )   
        { var data1 = await(d3.csv("https://raw.githubusercontent.com/gb2387/CS416-DV-final-Project/main/CovidCasesDeathsTrend.csv"));
          }
          var val = "Alabama";
          var data  = data1.filter(data1 => data1.State == val);
          state = data1.map(rec => rec["State"]);
          state = [...new Set(state)];
          //console.log(state);
          d3.select("#WeeklyDeath").append("svg").attr("height",20).append("g").append('text').transition().duration(300).attr("x", 0).attr("y", 10).attr("id","annotation")
          .text("*Hover over the graph for more details").attr("font-size", "14px").attr("font-weight","italic").style("fill", "red").attr("font-weight","bold")
      d3.select("#WeeklyDeath").append("div").attr("id","stateDiv1").append("label1").text("Select a State: ").attr("style","font-size:15px;font-weight:bold;");
      d3.select("#WeeklyDeath").select("#stateDiv1").append("select").attr("id","stateButton1").selectAll("myOptions").data(state).enter().append("option")
      .text(function (d) { return d; }).attr("value", function (d) { return d; })
      d3.select("#stateButton1").on("change", function(d) {
        // recover the option that has been chosen
        console.log("change");
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
      });
      
      function update(selectedState) {
      
        //console.log(selectedState);
        data  = data1.filter(data1 => data1.State == selectedState);
        var max = d3.max(data, function(d) { return parseInt(d.Deaths.replace(/,/g,'')); });
        // Add Y axis
        console.log(max);
        var y = d3.scaleLinear()
          .domain([0,max])
          .range([ height, 0 ]);
        
        d3.select("#y")
          .transition()
        .duration(1000)
        .call(d3.axisLeft(y));
      
          line.datum(data)
          .transition()
          .duration(1000)
        .attr("fill", "none")
        .attr("stroke", "steelblue" )
        .attr("stroke-width", 2)
        .attr("d", d3.line()
          .x(function(d) { return x(Date.parse(d.Week)); })
          .y(function(d) { return y(parseInt(d.Deaths.replace(/,/g,''))); })
          );
      
      }
      
          var svg = d3.select("#WeeklyDeath").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
      
      
        //var x = WeeklyCases[0].Week;
        //await(d3.csv("https://raw.githubusercontent.com/gb2387/CS416-DV-final-Project/main/CasesTrend.csv",
        
        /*function(d){
      
          return { Week : d3.timeParse("%m/%d/%Y")(d.Week), Cases : d.Deaths }
        },*/
        
            //console.log(data);
            
            //console.log(Date.parse(data[0].Week));
            var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return Date.parse(d.Week); }))
            .range([ 0, width]);
             
            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(70).tickFormat(d3.timeFormat("%m/%d/%y")))
            .selectAll("text")
            .style("text-anchor", "end")
            .style("fontsize", "11px")
            .attr("dx", "-.7em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-70)");
          
            svg.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .attr("x", width)
          .attr("y", height - 6)
          .text("Weekly Dates");
            var max = d3.max(data, function(d) { return parseInt(d.Deaths.replace(/,/g,'')); });
            // Add Y axis
      
            var y = d3.scaleLinear()
              .domain([0,max])
              .range([ height, 0 ]);
            svg.append("g")
               .attr("id", "y")
              .call(d3.axisLeft(y));
          
              svg.append("text")
              .attr("class", "y label")
              .attr("text-anchor", "end")
              .attr("y", 6)
              .attr("dy", ".75em")
              .attr("transform", "rotate(-90)")
              .text("Number of Deaths");
      
      
        var line = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue" )
            .attr("stroke-width", 2)
            .attr("d", d3.line()
              .x(function(d) { return x(Date.parse(d.Week)); })
              .y(function(d) { return y(parseInt(d.Deaths.replace(/,/g,''))); })
              );
          //svg.selectAll("chart1").data(WeeklyCases).enter().append("g").attr("transform","translate(10,350)")
          //.call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%b")));
          
          let tipBox;
          tipBox = svg.append('rect')
          .attr('width', width)
          .attr('height', height)
          .attr('opacity', 0)
          .on('mousemove', drawTooltip)
          .on('mouseout', removeTooltip);
          var tooltipLine = svg.append('line');
          var div = d3.select("body").append("div")	
          .attr("class", "tooltip")				
          .style("opacity", 0);
      
          function removeTooltip() {
              div.style("opacity", 0);
              if (tooltipLine) tooltipLine.attr('stroke', 'none');
            }
      
          function drawTooltip(){
              var week = x.invert(d3.mouse(tipBox.node())[0]);
              var timeConv = d3.timeFormat("%-m/%-d/%y");
              var weekVal = timeConv(week);
              console.log(weekVal);
              console.log(data[0].Week)
              //console.log("------------");
              for (let i = 0; i < data.length; i++) {
                  if(String(data[i].Week) == String(weekVal))
                     cases = data[i].Deaths;
              }
              //console.log(data);
              //console.log();
              
      
              tooltipLine.attr('stroke', 'black').attr("shape-rendering","crispEdges")
                  .attr('x1', x(week))
                  .attr('x2', x(week))
                  .attr('y1', 0)
                  .attr('y2', height);
      
                  var html  = "<span style = 'font-size:15px;color:black'><b>" + "Week:"+ weekVal + "</b></span></br>"+
                  "<span style = 'font-size:15px;color:black'><b>" + "Deaths:"+ cases + "</b></span></br>";
                  div.style("opacity", 1);
                  div.html(html)
                  .style("left", (d3.event.pageX + 10) + "px")
                  .style("top", (d3.event.pageY +10 ) + "px")
                  .style("width",130)
                  .style("height",80)
                  .style("background",function(){ return("lightblue");})            
                  
          }
      
          d3.selectAll("svg")
          .append("g")
          .append("line")
            .transition().duration(1000)
          .attr("fill", "red")
            .attr("stroke", "red" )
           .attr("x1", 1005)
            .attr("y1", 80)
            .attr("x2", 1005)
            .attr("y2", 110)
            .style("stroke-width", 1.5)
        d3.selectAll("svg")	  
          .append("g")
          .append("line")
            .transition().duration(1000)
          .attr("fill", "red")
            .attr("stroke", "red" )
           .attr("x1", 1370)
            .attr("y1", 30)
            .attr("x2", 1370)
            .attr("y2", 120)
          //.attr("rotate","60")
            .style("stroke-width", 1.5)
        
            var rect = svg.append('rect').transition().duration(1000).attr("x", 935).attr("y", 100).attr("width", 400)
    .attr("height", 60).attr("fill","lightblue").attr("stroke","black").text("As of July 2021")

        d3.selectAll("svg").append("g").append("text").transition().duration(1000).attr("id","annotation").attr("x", 1002).attr("y", 125)
          .text("Vaccination for COVID-19 started in January 2021").attr("font-size", "12px").attr("fill", "black")
        d3.selectAll("svg").append("g").append("text").transition().duration(1000).attr("id","annotation").attr("x", 1002).attr("y", 136)
          .text("and it has tremendously affected the rate of spread. By Analyzing the").attr("font-size", "12px").attr("fill", "black")
        d3.selectAll("svg").append("g").append("text").transition().duration(1000).attr("id","annotation").attr("x", 1002).attr("y", 147)
          .text("slope we can see that in last 6 months COVID-19 related deaths has").attr("font-size", "12px").attr("fill", "black")
        d3.selectAll("svg").append("g").append("text").transition().duration(1000).attr("id","annotation").attr("x", 1002).attr("y", 158)
          .text("reduced compared to the number of Deaths 6 months before the vaccine.").attr("font-size", "12px").attr("fill", "black")
        
}};