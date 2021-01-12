
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
  
  line(from,to)
  {
    AddStatus("line from "+from+" to "+to)
    this.ctx.moveTo(from[0],from[1]);
    this.ctx.lineTo(to[0],to[1]);
    this.ctx.stroke();
  }
}

function setup()
{
  document.getElementById("status").value="form load complete.";
  var d = new Draw("myCanvas");
  d.line([0,0],[300,300]);
  d.line([300,300],[300,50]);
  
  d.line([300,290],[290,300]);
  d.line([290,300],[300,310]);
  d.line([300,310],[310,300]);
  d.line([310,300],[300,290]);
}

function AddStatus(str)
{
  document.getElementById("status").value+="\n"+str
}

module.exports =
{
  Draw:Draw
}