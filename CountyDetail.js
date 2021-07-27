var CountyDetail={
  display: async function () {
    d3.select("#CountyDetail").selectAll("#stateDiv2").remove();
    d3.select("#CountyDetail").selectAll("text").remove();
    d3.select("#CountyDetail").selectAll("svg").remove();
    d3.select("#prev").style("color","black");
  var margin = {top: 50, right: 100, bottom: 100, left: 260},
  width = 1300 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;
  if(data1 == null)
  {var data1 = await(d3.csv("https://raw.githubusercontent.com/gb2387/CS416-DV-final-Project/main/CovidCasesDeathsTrend.csv"));
    }
    var val = "Alabama";
    var data  = data1.filter(data1 => data1.State == val);
    state = data1.map(rec => rec["State"]);
    state = [...new Set(state)];
  
    d3.select("#CountyDetail").append("svg").attr("height",20).append("g").append('text').transition().duration(300).attr("x", 0).attr("y", 10).attr("id","annotation")
    .text("*Hover over the Bars for more details").attr("font-size", "14px")
    .attr("font-weight","italic").style("fill", "red").attr("font-weight","bold")
d3.select("#CountyDetail").append("div").attr("id","stateDiv2").append("label").text("Select a State: ").attr("style","font-size:15px;font-weight:bold;");
d3.select("#CountyDetail").select("#stateDiv2").append("select").attr("id","stateButton2").selectAll("myOptions").data(state).enter().append("option")
        .text(function (d) { return d; }).attr("value", function (d) { return d; })
d3.select("#stateButton2").on("change", function(d) {
          // recover the option that has been chosen
          console.log("change");
          var selectedOption = d3.select(this).property("value")
          // run the updateChart function with this selected option
          update(selectedOption)
        });
        
        function update(selectedState) {
          var csdata = cData.filter(data1 => data1.State == selectedState);
          var max = d3.max(csdata, function(d) { return parseInt(d.Cases.replace(/,/g,'')); });

          var x = d3.scaleBand()
          .range([ 0, width ])
          .domain(csdata.map(function(d) { return d.County; }))
          .padding(0.2);
        
          d3.select("#x")
          .attr("transform", "translate(0," + height + ")")
          .transition()
          .duration(1000)
          .call(d3.axisBottom(x))
          .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
           
          
        
        // Y axis
        console.log(max);
        var y = d3.scaleLinear()
          //.transition()
          //.duration(1000)
          .domain([0, max])
          .range([ height, 0]);
        d3.select("#y")
        .transition()
        .duration(1000)
          .call(d3.axisLeft(y));
        
          svg.selectAll("#bar").remove();
          svg.selectAll("bar")
          .data(csdata)
          //.transition()
          //.duration(1000)
          .enter()
          .append("rect")
          .attr("id","bar")
            .attr("x", function(d) { return x(d.County); })
            .attr("y", function(d) { return y(parseInt(d.Cases.replace(/,/g,''))); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) {return height - y(parseInt(d.Cases.replace(/,/g,''))); })
            .attr("fill", "red")
            .on("mouseover", function(d) {
              console.log(d.County);
              if(d3.select(this).style("opacity") != 0){
                d3.select(this).transition()        
                    .duration(200)      
                    .style("opacity", .85); 
            }
            var html  = "<span style = 'font-size:15px;color:black'><b>" + d.County + "</b></span></br>" +
            "<span style='font-size:12px;color:black'><b> Cases: </b>" + d.Cases + "</span></br>" +
            "<span style='font-size:12px;color:black'><b> Deaths: </b>" + d.Deaths + "</span>";
            div.transition()
            .duration(200)
            .style("opacity", 1);
            div.html(html)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY +10 ) + "px")
            .style("width",130)
            .style("height",80)
            .style("background",function(){ return("lightblue");})
        
            })
            .on("mouseout", function(d) {
                div.transition()
                .duration(300)
                .style("opacity", 0);
                d3.select(this).transition()        
                        .duration(200)      
                        .style("opacity", 1); 
            })

        }

var svg = d3.select("#CountyDetail")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")"); 

cData = await(d3.csv("https://raw.githubusercontent.com/gb2387/CS416-DV-final-Project/main/CountyData.csv"));
//console.log(cData);
var val = "Alabama";
var csdata = cData.filter(data1 => data1.State == val);
var max = d3.max(csdata, function(d) { return parseInt(d.Cases.replace(/,/g,'')); });
//X axis
var x = d3.scaleBand()
.range([ 0, width ])
.domain(csdata.map(function(d) { return d.County; }))
.padding(0.2);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.attr("id","x")
.call(d3.axisBottom(x))
.selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  svg.append("text")
  .attr("class", "x label")
  //.attr("text-anchor", "end")
  .attr("x", width )
  .attr("y", height - 6)
  .text("County Name");

// Y axis
console.log(max);
var y = d3.scaleLinear()
.domain([0, max])
.range([ height, 0]);
svg.append("g")
.attr("id","y")
.call(d3.axisLeft(y));
svg.append("text")
.attr("class", "y label")
.attr("text-anchor", "end")
.attr("x",18)
.attr("y",-60)
.attr("dy", ".75em")
.attr("transform", "rotate(-90)")
.text("Number of Cases");

var div = d3.select("body").append("div")	
  .attr("class", "tooltip")				
  .style("opacity", 0);

 svg.selectAll("bar")
.data(csdata)
.enter()
.append("rect")
  .attr("id","bar")
  .attr("x", function(d) { return x(d.County); })
  .attr("y", function(d) { return y(parseInt(d.Cases.replace(/,/g,''))); })
  .attr("width", x.bandwidth())
  .attr("height", function(d) {return height - y(parseInt(d.Cases.replace(/,/g,''))); })
  .attr("fill", "red")
  .on("mouseover", function(d) {
    console.log(d.County);
    if(d3.select(this).style("opacity") != 0){
      d3.select(this).transition()        
          .duration(200)      
          .style("opacity", .85); 
  }
  var html  = "<span style = 'font-size:15px;color:black'><b>" + d.County + "</b></span></br>" +
  "<span style='font-size:12px;color:black'><b> Cases: </b>" + d.Cases + "</span></br>" +
  "<span style='font-size:12px;color:black'><b> Deaths: </b>" + d.Deaths + "</span>";
  div.transition()
  .duration(200)
  .style("opacity", 1);
  div.html(html)
  .style("left", (d3.event.pageX + 10) + "px")
  .style("top", (d3.event.pageY +10 ) + "px")
  .style("width",130)
  .style("height",80)
  .style("background",function(){ return("lightblue");})

  })
  
  .on("mouseout", function(d) {
      div.transition()
      .duration(300)
      .style("opacity", 0);
      d3.select(this).transition()        
              .duration(200)      
              .style("opacity", 1); 
  })

  var rect = svg.append('rect').transition().duration(1000).attr("x", 150).attr("y", -50).attr("width", 550)
  .attr("height", 30).attr("fill","lightblue").attr("stroke","black").text("As of July 2021")

svg.append("g").append("text").transition().duration(1000).attr("id","annotation").attr("x", 160).attr("y", -30)
.text("All the Counties of selected state in the decending order of the number of cases").attr("font-size", "14px").attr("fill", "black").attr("font-weight","bold")

}};