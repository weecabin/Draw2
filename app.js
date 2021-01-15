
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
    
    this.InitDrawing();
  }
  /*
  dwgobj = {name:"fp1",type:"line",data:[[0,0],[25,50],[100,250]]}
  */
  AddPath(pathname,points)
  {
    AddStatus("in AddPath")
    try
    {
      this.dwgobjs.push({name:pathname,type:"line",data:points});
      AddStatus(JSON.stringify(this.dwgobjs[this.dwgobjs.length-1]));
      for(let point of points)
      {
        AddStatus("point="+point)
        let x = point[0];
        let y = point[1];
        if (this.xmin==undefined)
        {
          this.xmin=this.xmax=x;
          this.ymin=this.ymax=y;
        }
        if (x<this.xmin)this.xmin=x;
        if (x>this.xmax)this.xmax=x;
        if (y<this.ymin)this.ymin=y;
        if (y>this.ymax)this.ymax=y;
      }
      /*
      calculate the world offset to be added to every coordinate in order to put
      the lowest plot value at zero for both x and y values.
      */
      this.xoffset=-this.xmin;
      this.yoffset=-this.ymin;
      /*
      calculate a single mulitplier used to scale all data to fit inside the plot extents.
      */
      if (this.xmax==this.xmin)
        this.xmult=1;
      else
        this.xmult=this.width/(this.xmax-this.xmin);
      if (this.ymax==this.ymin)
        this.ymult=1
      else
        this.ymult=this.height/(this.ymax-this.ymin);
      // to keep the drawing to scale, only use one multiplier for x and y
      if ((this.xmult>=1 && this.ymult>=1))
        this.mult=this.xmult>this.ymult?this.xmult:this.ymult;
      else
        this.mult=this.xmult>this.ymult?this.ymult:this.xmult;
      // summarize in the debug window.
      AddStatus("xmin,xmax,ymin,ymax "+this.xmin+","+this.xmax+","+this.ymin+","+this.ymax);
      AddStatus("xoffset,yoffset "+this.xoffset+","+this.yoffset);
      AddStatus("xmult,ymult,mult "+this.xmult+","+this.ymult+","+this.mult);
      this.UpdateDrawingParameters();
      if (document.getElementById("autoredraw").checked)
      {
        this.ClearCanvas();
        this.Draw();
      }
    }
    catch(err)
    {
      AddStatus(err.message,false,true);
    }
    AddStatus("Exiting AddPath")
  }
    
  InitDrawing()
  {
        /*
    this will hold drawing objects. Initialy the logic to draw will be in the app,
    but I may swap it to a callback into the object to draw ''itself.
    */
    this.dwgobjs=[];
    // these will track min max values as draw objects are loaded.
    this.xmin=undefined;
    this.xmax =undefined;
    this.ymin =undefined;
    this.ymax =undefined;
    // multipliers and offsets to fit drawing objects on the canvas.
    this.xmult=1;
    this.ymult=1;
    this.mult=1;
    this.xoffset=0;
    this.yoffset=0;
    this.ClearCanvas();
    this.UpdateDrawingParameters();
  }
  
  Draw()
  {
    AddStatus("in Draw");
    try
    {
      AddStatus(JSON.stringify(this.dwgobjs));
      var lines=this.dwgobjs.filter(x=>x.type=="line");
      for(let line of lines)
      {
        AddStatus("Drawing line "+JSON.stringify(line))
        let first=true;
        for(let point of line.data)
        {
          AddStatus("point: "+point)
          let x = (point[0]+this.xoffset)*this.mult;
          let y = (point[1]+this.yoffset)*this.mult;
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
      AddStatus(err.message,false,true);
    }
  }
  
  ClearDrawingObjects()
  {
    this.InitDrawing();
  }
  
  ClearCanvas()
  {
    // Store the current transformation matrix
      this.ctx.save();

      // Use the identity matrix while clearing the canvas
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0,0, this.c.width, this.c.height);
    
      // Restore the transform
      this.ctx.restore();
  }
  
  UpdateDrawingParameters()
  {
    let p = document.getElementById("canvasparameters");
    if (this.xmin!=undefined)
    {
      p.innerHTML=
      "Extents: min="+this.xmin.toFixed(1)+","+this.ymin.toFixed(1)+" max="+this.xmax.toFixed(1)+","+this.ymax.toFixed(1)+ "<br>"+
      "Offsets: x="+this.xoffset.toFixed(1)+" y="+this.yoffset.toFixed(1)+"<br>"+
      "Multipliers: x="+this.xmult.toFixed(2)+" y="+this.ymult.toFixed(2)+" using="+this.mult.toFixed(2);
      }
      else
      {
        p.innerHTML=
        "Extents: <br>Offsets: <br>Multipliers:";
      }
  }
  
}

function newline()
{
  try
  {
    let pointstr=document.getElementById("newline").value;
    let points=pointstr.split(" ")
    let data=[];
    for (let point of points)
    {
      let xy=point.split(",");
      let x = Number(xy[0]);
      let y = Number(xy[1]);
      data.push([x,y]);
      AddStatus(JSON.stringify(data));
    }
    d2.AddPath("newLine",data);
  }
  catch(err)
  {
    AddStatus(err.message,false,true);
  }
}

function ClearLines()
{
  d2.ClearDrawingObjects();
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
    d2.AddPath("square",[[50,50],[500,50],[500,500],[50,500],[50,50]])
    d2.Draw();
  }
  catch(err)
  {
    AddStatus(err.message)
  }
}

function ClearStatus()
{
  document.getElementById("status").value="";
}

function DebugModeOn(obj)
{
  alwaysShowStatus = obj.checked;
}

/*
alwaysShowStatus   alwaysOn   execute
0.                 0.         0
0.                 1.         1
1.                 0.         1
1.                 1.         1
*/
var alwaysShowStatus=false;
function AddStatus(str,clearlog=false,alwaysOn=false)
{
  if(!alwaysShowStatus && !alwaysOn)return;
  try
  { 
    if (clearlog) document.getElementById("status").value="";
    document.getElementById("status").value+="\n"+str
  }
  catch(err)
  {
    console.log(str)
  }
}

module.exports =
{
  Drawing:Drawing,
  AddStatus:AddStatus
}