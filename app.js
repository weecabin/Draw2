
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
    AddStatus("Exiting constructor "+this.lowerLeft+" / "+this.upperRight)
  }
  
  ReDraw()
  {
    AddStatus(this.dataset)
    try
    {
      let redraw=false;
      if (this.fit)
      {
        for(set0 of this.dataset)
        {
          for(point of set0)
          {
            if (point[0]<this.lowerLeft[0])
            {
              this.lowerLeft[0]=point[0];
              redraw=true;
            }
            if (point[0]>this.upperRight[0])
            {
              this.upperRight[0]=point[0];
              redraw=true;
            }
          
            if (point[1]<this.lowerLeft[1])
            {
              this.lowerLeft[1]=point[1];
              redraw=true;
            }
            if (point[1]>this.upperRight[1])
            {
              this.upperRight[1]=point[1];
              redraw=true;
            }
            if (redraw)
            {
              this.ctx.clearRect(0,0,this.c.width,this.c.height);
              this.ctx.beginPath();
            }
          }
        }
      }
      if(redraw)
      {
        for(pathset of this.dataset)
        {
          let firstpoint=true;
          for(point of pathset)
          {
            if(firstpoint)
            {
              firstpoint=false;
              this.ctx.bebinPath();
              this.ctx.moveTo(point[0],point[1])
            }
            else
              this.ctx.lineTo(point[0],point[1])
          }
          this.ctx.stroke();
        }
      }
    }
    catch(err)
    {
      AddStatus(err.message);
    }
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
    this.ReDraw();
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
    this.ReDraw();
  }
}

function setup()
{
  try
  {
    AddStatus("form load complete.",true);
    var d1 = new Draw("myCanvas");
  
    var points = [];
    for (x=0;x<=600;x+=20)
    {
      let y=Math.round(Math.pow(x,2)/600)
      points.push([x,y])
    }
    d1.Path(points)
    d1.Line([150,150],[900,400])  
    d1.Line([150,150],[600,200])  
  
    var d2 = new Draw("myCanvas2",true);
    d2.Line([150,150],[900,400])  
    d2.Line([150,150],[600,200])  
  }
  catch(err)
  {
    AddStatus(err.message)
  }
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