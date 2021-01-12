
class Draw
{
  constructor(canvasId)
  {
    AddStatus("entering constructor")
    this.c = document.getElementById("myCanvas");
    this.ctx = c.getContext("2d");
    AddStatus("Exiting constructor")
  }
  
  line(from,to)
  {
    AddStatus("entering line")
    this.ctx.moveTo(from[0],from[1]);
    this.ctx.lineTo(to[0],to[1]);
    this.ctx.stroke();
    AddStatus("exiting line")
  }
}

function setup()
{
  document.getElementById("status").value="form load complete.";
  AddStatus("in setup")
  var d = new Draw("myCanvas");
  d.line([10,10],[100,100]);
  d.line([100,100],[150,50]);
}

function AddStatus(str)
{
  document.getElementById("status").value+="\n"+str
}

module.exports =
{
  Draw:Draw
}