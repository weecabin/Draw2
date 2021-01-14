
class Drawing
{
  constructor(canvasId)
  {
    this.c= document.getElementById(canvasId);
    this.ctx = this.c.getContext("2d");
    // set canvas up as cartesion 
    this.ctx.translate(0,this.c.height)
    this.ctx.scale(1,-1);
    this.width= this.c.width;
    this.height= this.c.height;
    /*
    this will hold drawing objects. Initialy the logic to draw will be in the app,
    but I may swap it to a callback into the object to draw itself.
    */
    this.dwgobjs=[];
    // these will track min max values as draw objects are loaded.
    this.minx;
    this.maxx;
    this.miny;
    this.maxy;
    // multipliers and offsets to fit drawing objects on the canvas.
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
    try
    {
      this.dwgobjs.push({name:pathname,type:"line",data:points});
      AddStatus(JSON.stringify(this.dwgobjs[this.dwgobjs.length-1]));
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
    catch(err)
    {
      AddStatus(err.message);
    }
  }
    
  Draw()
  {
    AddStatus("in Draw");
    try
    {
      AddStatus(JSON.stringify(this.dwgobjs));
      var lines=this.dwgobjs.filter(x=>x.type=="line");
      for(let line in lines)
      {
        AddStatus("Drawing line "+JSON.stringify(line))
        let first=true;
        for(let point in line.data)
        {
          AddStatus("point: "+point)
          let x = (point[0]+this.xoffset)*this.xmult;
          let y = (point[1]+this.yoffset)*this.ymult;
          AddStatus("x/y "+x.toFixed(2)+"/"+y.toFixed(2))
          if (first)
          {
            this.ctx.beginPath();
            this.ctx.moveTo(x,y);
            first=false;
          }
          else
          {
            this.ctx.lineTo(x,y);
          }
        }
        this.ctx.stroke();
      }
    }
    catch(err)
    {
      AddStatus(err.message);
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
    AddStatus("form load complete.",true,true);
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
let addStatusDebug=false;
function AddStatus(str,clear=false,alwaysOn=false)
{
  if(addStatusDebug && !alwaysOn)return;
  if (clear) document.getElementById("status").value="";
  document.getElementById("status").value+="\n"+str
}

module.exports =
{
  Drawing:Drawing
}