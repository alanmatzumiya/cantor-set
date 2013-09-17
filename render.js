var width = 1500,
       height = 2000;

   var svg = d3.select("body").append("svg")
       .attr("width", width)
       .attr("height", height)
     .append("g")
       .call(d3.behavior.zoom().scaleExtent([1, 50000]).on("zoom", zoom))
     .append("g");

   svg.append("rect")
       .attr("class", "overlay")
       .attr("fill","none")
       .attr("pointer-events","all")
       .attr("width", width)
       .attr("height", height);

   var margin = {"left":0, "right":0 ,"top":10, "bottom":0}
   var xScale = d3.scale.linear().domain([0, 1500]).range([margin.left,width]);
   var yScale = d3.scale.linear().domain([0,600]).range([height, margin.top]);
   var lineGenerator = d3.svg.line()
                        .x(function(d){return d.x;})
                        .y(function(d){return d.y;})
                        .interpolate("linear");

   var coords = []                        

   function cantorSet(level, left, right,height)
   {

      var coordinates = [{"x":xScale(left),  "y":10 * height},
                         {"x":xScale(right), "y":10 * height}];
      
      coords[coords.length] = coordinates;                         
      
      var line = svg.append("path")
                     .attr(
                        {
                           "d":lineGenerator(coordinates),
                           "stroke":"black",
                           "stroke-width":5,
                           "fill":"none",
                        });

      var length = 1/3 * Math.abs(left-right)      

      if (level != 0)
      {
         // Draw the left hand side of the level
         cantorSet(level - 1, left, left + length, height + 1);
         // Draw the right hand side of the level
         cantorSet(level - 1, right - length, right, height + 1)   
      }
   }

   cantorSet(10,0,1000,0);


function zoom() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}