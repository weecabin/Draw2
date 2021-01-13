const draw=require("./app.js")

//var d = new draw.Draw("help")

var points=[]
  points.push([])
  console.log(points)
  for (x=0;x<600;x+=20)
  {
    let y=Math.round(Math.pow(x,2)/600)
    points[0].push([x,y])
  }
  console.log(points[0][0])
  console.log(points[0][1])
  
  console.log(points.length)
  console.log(points)
  
  for(let i=1;i<points[0].length;i++)
    {
      console.log("LineTo: "+ points[0][i][0]+","+ points[0][i][1])
    }
  points.push([]);
  let i=points.length-1;
  points[i].push([10,20])
  points[i].push([20,30])
  console.log(points)
  