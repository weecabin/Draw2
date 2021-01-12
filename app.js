
class Draw()
{
  constructor(canvasId)
  {
    this.c = document.getElementById(canvasId);
    this.ctx = c.getContext("2d");
  }
  
  function line(from,to)
  {
    this.ctx.moveTo(from[0],from[1]);
    this.ctx.lineTo(to[0],to[1]);
    this.ctx.stroke();
  }
}

function setup()
{
  var d = new Draw("myCanvas");
  d.line([10,10],[100,100]);
  d.line([100,100],[150,50]);
}

