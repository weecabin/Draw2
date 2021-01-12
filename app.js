
class Draw
{
  constructor(canvasId)
  {
    AddStatus("entering constructor")
    this.c = document.getElementById("myCanvas");
    AddStatus("got the canvas")
    this.ctx = this.c.getContext("2d");
    AddStatus("Exiting constructor")
  }
  
  Line(from,to)
  {
    AddStatus("line from "+from+" to "+to)
    this.ctx.moveTo(from[0],from[1]);
    this.ctx.lineTo(to[0],to[1]);
    this.ctx.stroke();
  }
  /*
  draws a line from as defined by the double array of points
  [[x1,y1],[x2,y2]...]
  */
  Path(points)
  {
    AddStatus("points: "+points[0])
    AddStatus("points: "+points[1])
    AddStatus("points.length: "+points.length())
    this.ctx.moveTo(points[0][0],points[0][1]);
    for(i=1;i<points.length;i++)
      this.ctx.lineTo(points[i][0], points[i][1]);
    this.ctx.stroke();
  }
}

function setup()
{
  document.getElementById("status").value="form load complete.";
  var d = new Draw("myCanvas");
  d.Line([0,0],[300,300]);
  d.Line([300,300],[300,50]);
  
  d.Line([300,290],[290,300]);
  d.Line([290,300],[300,310]);
  d.Line([300,310],[310,300]);
  d.Line([310,300],[300,290]);
  
  var points = [];
  for (x=0;x<600;x+=20)
  {
    let y=Math.round(Math.pow(x,2)/600)
    points.push([x,y])
  }
  d.Path(points)
}

function circle(centerX,centerY,radius)
{
  // r^2 = (x-a)^2 + (y-b)^2
  //y=Math.sqrt(r^2-(x-a)^2)+b
  
}

function AddStatus(str)
{
  document.getElementById("status").value+="\n"+str
}

module.exports =
{
  Draw:Draw
}