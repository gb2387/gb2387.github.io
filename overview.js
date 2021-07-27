var overview={
    display: async function () {
        d3.select("#prev").style("color","grey");
        var svg = d3.select("#Overview").append("svg").attr("Width",600).attr("height",300),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    // Map and projection
    /*var projection = d3.geoMercator()
        .center([2, 47])                // GPS of location to zoom on
        .scale(980)                       // This is like the zoom
        .translate([ width/2, height/2 ])
    */
   // D3 Projection
   //d3.select('svg')
   

//d3.select('svg')
svg.append('g').append('text').transition().duration(300).attr("x", 0).attr("y", 10).attr("id","anno")
.text("*Hover over the states for more details").attr("font-size", "14px")
.attr("font-weight","italic").style("fill", "red").attr("font-weight","bold")

  
var rect = svg.append('rect').transition().duration(2000).attr("x", 1000).attr("y", 160).attr("width", 250)
  .attr("height", 190).attr("fill","lightblue").attr("stroke","black").text("As of July 2021")

  svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 175).attr("id","anno")
  .text("Overview").attr("font-size", "14px").attr("font-weight","italic").style("fill", "Black").attr("font-weight","bold")
  

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 190).attr("id","anno")
.text(">Covid Data As of: July 2021").attr("font-size", "14px").attr("font-weight","italic").style("fill", "Black")

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 205).attr("id","anno")
.text(">Total number of Cases: 34M").attr("font-size", "14px").attr("font-weight","italic").style("fill", "Black")

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 220).attr("id","anno")
.text(">Total number of Deaths: 608K").attr("font-size", "14px").attr("font-weight","italic").style("fill", "Black")

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 250).attr("id","anno")
.text("Top 5 Most Affected States:").attr("font-size", "14px")
.attr("font-weight","italic").style("fill", "Black").attr("font-weight","bold")

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 267).attr("id","anno")
.text("1. California	with 3,857,764 cases").attr("font-size", "14px")
.attr("font-weight","italic").style("fill", "Black")

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 282).attr("id","anno")
.text("2. Texas	with 3,031,733 cases").attr("font-size", "14px")
.attr("font-weight","italic").style("fill", "Black")

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 297).attr("id","anno")
.text("3. Florida	with 2,406,809 cases").attr("font-size", "14px")
.attr("font-weight","italic").style("fill", "Black")

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 312).attr("id","anno")
.text("4. New York	with 2,123,579 cases").attr("font-size", "14px")
.attr("font-weight","italic").style("fill", "Black")

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 327).attr("id","anno")
.text("5. Illinois	with 1,403,989 cases").attr("font-size", "14px")
.attr("font-weight","italic").style("fill", "Black")

var width = 1300;
var height = 600;
var margin = 50;

var projection = d3.geoAlbersUsa()
				   .translate([(width/2 -100 ), (height/2)-100])
				   .scale([1000]);
// Define path generator
var path = d3.geoPath()               
.projection(projection);

const colorRange = d3.scaleLinear()
                    //.interpolator(d3.interpolateInferno)
                    .domain([1,1000])
                    .range(["white","red"]);

var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

    usMap = await(d3.json("https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"))
    // Load external data and boot
    stateData = await(d3.csv("https://raw.githubusercontent.com/gb2387/CS416-DV-final-Project/main/StateFinal.csv"))

	for(var i = 0; i < stateData.length; i++){
        var stateName = (stateData[i].State);
        var totalCase = (stateData[i].MaxCases);
        var totalDeath = (stateData[i].MaxDeaths);
        for(var n = 0; n < usMap.features.length; n++){
            var userState = usMap.features[n].properties.name;
            if(stateName == userState){
              usMap.features[n].properties.totalCase = totalCase;
			  usMap.features[n].properties.totalDeath = totalDeath;
              break;
            }
	}
}

	svg.attr("width",width )
    .attr("height",height)
	.append("g")
    .attr("transform","translate(" + margin + "," + margin + ")")
    .selectAll("path")
	.data(usMap.features)
	.enter()
	.append("path")
	.attr("d", function(eachfeature) {return path(eachfeature);})
	.attr("opacity",0.8)
	.attr("stroke","black")
    //.attr("fill", "rgb(255, 253, 253)")
    .attr("fill", function(d) 
    {   

        return colorRange(Math.round(parseInt(d.properties.totalCase.replace(/,/g,''))/1000));
    })
    .on("mouseover", function(d) 
    {
        if(d3.select(this).style("opacity") != 0){
            d3.select(this).transition()        
                .duration(200)      
                .style("opacity", .65); 
        }
        var html  = "<span style = 'font-size:15px;color:black'><b>" + d.properties.name + "</b></span></br>" +
        "<span style='font-size:12px;color:black'><b> Cases: </b>" + d.properties.totalCase + "</span></br>" +
        "<span style='font-size:12px;color:black'><b> Deaths: </b>" + d.properties.totalDeath + "</span>";
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
    var d = [...Array(1000).keys()]

    svg.selectAll(".firstrow").data(d).enter().append('rect').transition().duration(2000).attr("x", function(d){ return 1000 + (0.3*d);}).attr("y", 450)
    .attr("width", 0.3).attr("height", 10)
    .attr("fill",function(d){ return colorRange(d);});

    svg.append('g').append('text').transition().duration(2000).attr("x", 1000).attr("y", 440)
    .attr("id","anno")
    .text("Total Cases").attr("font-size", "12px")
    .attr("font-weight","italic").style("fill", "Black").attr("font-weight","bold")

    svg.append('g').append('text').transition().duration(2000).attr("x", 1000).attr("y", 475)
    .attr("id","anno")
    .text("183").attr("font-size", "12px")
    .attr("font-weight","italic").style("fill", "Black").attr("font-weight","bold")

    svg.append('g').append('text').transition().duration(2000).attr("x", 1245).attr("y", 475)
    .attr("id","anno")
    .text("3,857,764").attr("font-size", "12px")
    .attr("font-weight","italic").style("fill", "Black").attr("font-weight","bold")

}};