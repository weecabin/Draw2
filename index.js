const draw=require("./app.js")

//var d = new draw.Draw("help")

var points=[];
  for (x=0;x<600;x+=20)
  {
    let y=Math.round(Math.pow(x,2)/600)
    points.push([x,y])
  }
  console.log(points[0][0])
  console.log(points[0][1])

  console.log(points[1][0])
  console.log(points[1][1])

  console.log(points.length)
  console.log(points)
  
  for(i=1;i<points.length;i++)
    {
      console.log("LineTo: "+ points[i][0]+","+ points[i][1])
    }