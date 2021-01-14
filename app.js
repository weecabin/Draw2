
class Drawing
{
  constructor(canvasId)
  {
    this.c= document.getElementById(canvasId);
    this.ctx = this.c.getContext("2d");
    this.width= this.c.width;
    this.height= this.c.height;
    this.dwgobjs=[];
    this.minx;
    this.maxx;
    this.miny;
    this.maxy;
    this.xmult=1;
    this.ymult=1;
    this.xoffset=0;
    this.yoffset=0;
  }
  /*
  dwgobj = {name:"fp1",type:"line",data:[[0,0],[25,50],[100,250]]}
  */
  AddPath(pathname,points)
  {
    this.dwgobjs.push({pathname:name,type:"line",points});
    for(let point in points)
    {
      let x = point[0];
      let y = point[1];
      if (this.minx==undefined)
      {
        this.minx=this.maxx=x;
        this.miny=this.maxy=y;
      }
      if (x<this.minx)this.minx=x;
      if (x>this.maxx)this.maxx=x;
      if (y<this.miny)this.miny=y;
      if (y>this.maxy)this.maxy=y;
      this.xoffset-=this.minx;
      this.yoffset-=this.miny;
      this.xmult=(this.xmax-this.xmin)/this.width;
      this.ymult=(this.ymax-this.ymin)/this.height;
    }
  }
    
  Draw()
  {
    var lines=this.dwgobjs.filter(x=>x.type=="line");
    for(let line in lines)
    {
      let first=true;
      for(let point in line.data)
      {
        let x = (point[0]+this.xoffset)*this.xmult;
        let y = (point[1]+this.yoffset)*this.ymult;
        if (first)
        {
          this.ctx.moveTo(x,y);
          first=false;
        }
        else
        {
          this.ctx.lineTo(x,y);
        }
      }
    }
  }
  
  ClearCanvas()
  {
    
  }
    
  
}

function newline()
{
  try
  {
    let pointstr=document.getElementById("newline").value;
    let fromto=pointstr.split(" ");
    let from=fromto[0].split(",");
    let to=fromto[1].split(",");
    d2.AddPath("twopt",[from,to]);
  }
  catch(err)
  {
    AddStatus(err.message);
  }
}

function ClearCanvas()
{
  d2.ClearCanvas();
}

function ReDraw()
{
  d2.Draw();
}

let d2;
function setup()
{
  try
  {
    AddStatus("form load complete.",true);
    var d1 = new Drawing("myCanvas");
    let points=[];
    for (x=0;x<=600;x+=20)
    {
      let y=Math.round(Math.pow(x,2)/600)
      points.push([x,y])
    }
    d1.AddPath("p1",[[0,0],[600,300]])
    d1.AddPath("p2",[[0,0],[300,300]])
    d1.Draw();
  
    AddStatus("myCanvas2")
    d2 = new Drawing("myCanvas2");
    d2.AddPath("log",points)
    d2.Draw();
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
  Drawing:Drawing
}