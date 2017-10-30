
let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;  //This variable will allow us to change paint function, ie change to draw line, draw square
let dragging = false;


$('#canvas-draft').mousedown(function(e){
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseDown([mouseX,mouseY],e);
    dragging = true;
});
$('#canvas-draft').mousemove(function(e){
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    if(dragging){
        currentFunction.onDragging([mouseX,mouseY],e);
    }
    currentFunction.onMouseMove([mouseX,mouseY],e);
});
$('#canvas-draft').mouseup(function(e){
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseUp([mouseX,mouseY],e);
});
$('#canvas-draft').mouseleave(function(e){
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseLeave([mouseX,mouseY],e);
});

$('#canvas-draft').mouseenter(function(e){
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseEnter([mouseX,mouseY],e);
});

class PaintFunction{
    constructor(){}
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
    //Update
    onFinish(){}
}    
/*
//Hammertime
var hammertime = new Hammer(canvasDraft);
hammertime.on('drag swipe tap press', function(ev) {
console.log(ev.type);
});

hammertime.on('panstart',function(ev){
    let mouseX = ev.center.x - canvasDraft.offsetLeft;
    let mouseY = ev.center.y - canvasDraft.offsetTop;
    currentFunction.onMouseDown([mouseX,mouseY],ev);
    dragging = true;
})
hammertime.on('panmove',function(ev){
    let mouseX = ev.center.x - canvasDraft.offsetLeft;
    let mouseY = ev.center.y - canvasDraft.offsetTop;
    currentFunction.onDragging([mouseX,mouseY],ev);
   // currentFunction.onMouseMove([mouseX,mouseY],ev);
   console.log("panmove");
});
hammertime.on('panend',function(ev){
    let mouseX = ev.center.x - canvasDraft.offsetLeft;
    let mouseY = ev.center.y - canvasDraft.offsetTop;
    currentFunction.onMouseUp([mouseX,mouseY],ev);
    console.log("panend");
   
});
*/
