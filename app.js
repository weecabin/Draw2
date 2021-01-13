
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
    this.ctx.scale(1,-1);
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
        for(let set0 of this.dataset)
        {
          for(let point of set0)
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
              //this.ctx.clearRect(0,0,this.c.width,this.c.height);
              //this.ctx.beginPath();
              this.c.width=this.c.width;
              let xscale = this.c.width / (this.upperRight[0]-this.lowerLeft[0]);
              let yscale = this.c.height / (this.upperRight[1]-this.lowerLeft[1]);
              AddStatus("xScale,yScale: "+xscale+","+yscale);
              let scale=1;
              if (xscale<1 || yscale<1)
                scale= xscale<yscale?xscale:yscale;
              else if (xscale>1 && yscale>1)
                scale = xscale<yscale?xscale:yscale;
              AddStatus("scale("+scale+","+(scale)+")")
              this.ctx.translate(0,this.c.height);
              this.ctx.scale(scale,-scale);
            }
          }
        }
      }
      if(redraw)
      {
        AddStatus("redraw dataset:"+this.dataset)
        for(let pathset of this.dataset)
        {
          AddStatus("pathset: "+pathset)
          let firstpoint=true;
          for(let point of pathset)
          {
            AddStatus("point: "+point)
            if(firstpoint)
            {
              firstpoint=false;
              this.ctx.beginPath();
              AddStatus("moveTo("+point[0]+","+point[1]+")")
              this.ctx.moveTo(point[0],point[1])
            }
            else
            {
              AddStatus("lineTo("+point[0]+","+point[1]+")")
              this.ctx.lineTo(point[0],point[1]);
            }
          }
          this.ctx.stroke();
        }
        AddStatus("exit redraw")
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
    this.ctx.beginPath();
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

function addpoints()
{
  try{
  let pointstr=document.getElementById("newpoints").value;
  let fromto=pointstr.split(" ");
  let from=fromto.split(",");
  let to=fromto.split(",");
  d2.Line(from,to)
  }
  catch(err)
  {
    AddStatus(err.message);
  }
}

let d2;
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
    //d1.Path(points)
    d1.Line([0,0],[600,300])
    d1.Line([10,250],[280,250])    
    d1.Line([10,100],[280,100])  
    d1.Line([0,0],[300,300])
  
    AddStatus("myCanvas2")
    d2 = new Draw("myCanvas2",true);
    //d2.Path(points)
    d2.Line([0,0],[600,300])
    d2.Line([10,250],[280,250])    
    d2.Line([10,100],[280,100])
    d2.Line([0,0],[300,300])
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