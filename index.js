const dr=require("./app.js")

//var d = new draw.Draw("help")

const prt=(str)=>console.log(str);

var drawing=[];
var line={name:"fp1",type:"line",data:[[0,0],[25,50],[100,250]]};
drawing.push(line);
drawing.push({name:"fp2",type:"line",data:[[0,0],[25,50],[100,150]]});
drawing.push({name:"fp2",type:"circle",data:[[0,0],[125,50],[100,150]]});

prt(drawing)
prt(drawing[0].type+": "+JSON.stringify(drawing[0].data))
var lines=drawing.filter(x=>x.type=="line")
prt(lines)

//var dwg=new dr.Drawing("test");