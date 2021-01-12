const draw=require("./app.js")

//var d = new draw.Draw("help")

var points=[];
  for (x=0;x<600;x+=20)
  {
    let y=Math.round(Math.pow(x,2)/600)
    points.push([x,y])
  }
  console.log(points)