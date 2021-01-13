
class Draw
{
  constructor(canvasId,fit=false)
  {
    AddStatus("entering constructor")
    this.fit = fit;
    this.dataset=[];
    this.c = document.getElementById(canvasId);
    AddStatus("got the canvas")
    this.ctx = this.c.getContext("2d");
    // set canvas up as cartesion 
    this.ctx.translate(0,this.c.height)
    this.ctx.scale(.5,-.5);
    this.lowerLeft=[0,0];
    this.upperRight=[this.c.width,this.c.height];
    AddStatus("Exiting constructor"+this.lowerLeft+"/"+this.upperRight)
  }
  
  ReDraw()
  {
    
  }
  
  Line(from,to)
  {
    this.dataset.push([]);
    this.dataset[this.dataset.length-1].push(from);
    this.dataset[this.dataset.length-1].push(to);
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
    this.dataset.push([]);
    this.dataset[this.dataset.length-1].push(points);
    AddStatus("path points\n"+points);
    this.ctx.beginPath();
    this.ctx.moveTo(points[0][0],points[0][1]);
    try
    {
      for(let i=1;i<points.length;i++)
      {
        this.ctx.lineTo(points[i][0], points[i][1]);
      }
      this.ctx.stroke();
    }
    catch(err)
    {
      AddStatus(err.message)
    }
  }
}

function setup()
{
  AddStatus("form load complete.",true);
  var d = new Draw("myCanvas");
  d.Line([0,0],[300,300]);
  d.Line([300,300],[300,50]);
  
  d.Line([300,290],[290,300]);
  d.Line([290,300],[300,310]);
  d.Line([300,310],[310,300]);
  d.Line([310,300],[300,290]);
  
  var points = [];
  for (x=0;x<=600;x+=20)
  {
    let y=Math.round(Math.pow(x,2)/600)
    points.push([x,y])
  }
  d.Path(points)
  d.Line([150,150],[700,200])  
  d.Line([150,150],[600,200])  
}

function AddStatus(str,clear=false)
{
  if (clear) document.getElementById("status").value="";
  document.getElementById("status").value+="\n"+str
}

module.exports =
{
  Draw:Draw
}