
// Version 3 - undoObject stored as key of canvasSettings object, in canvas-configuration.js

$('.undo').on('click',function(){
    if(canvasSettings.undoObject.actionCount>1){
        canvasSettings.undoObject.actionCount--;
        canvasSettings.undoObject.savePoint = canvasSettings.undoObject.actionCount;
        //console.log(canvasSettings.undoObject.actionCount);
        contextReal.drawImage(canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount-1],0,0);
    }
});

$('.redo').on("click",function(){
    if(canvasSettings.undoObject.actionCount == canvasSettings.undoObject.savePoint && canvasSettings.undoObject.actionCount<canvasSettings.undoObject.states.length){
        canvasSettings.undoObject.actionCount++;
        canvasSettings.undoObject.savePoint++;
        contextReal.drawImage(canvasSettings.undoObject.states[canvasSettings.undoObject.actionCount-1],0,0);
    }
    else if(canvasSettings.undoObject.actionCount != canvasSettings.undoObject.savePoint){
        canvasSettings.undoObject.states.splice(canvasSettings.undoObject.actionCount);
        canvasSettings.undoObject.savePoint = canvasSettings.undoObject.actionCount;
    }
})

/* Version 2 - declares global object "undoObject"
var undoObject = {
    actionCount: 0,
    states: [],
    savePoint: 0
}

console.log(canvasSettings);

$('.undo').on('click',function(){
    if(undoObject.actionCount>0){
        undoObject.actionCount--;
        undoObject.savePoint = undoObject.actionCount;
    }
    contextReal.drawImage(undoObject.states[undoObject.actionCount-1],0,0);
    console.log(canvasSettings); 
});

$('.redo').on("click",function(){
    if(undoObject.actionCount == undoObject.savePoint && undoObject.actionCount<undoObject.states.length){
        undoObject.actionCount++;
        undoObject.savePoint++;
        contextReal.drawImage(undoObject.states[undoObject.actionCount-1],0,0);
    }
    else if(undoObject.actionCount != undoObject.savePoint){
        undoObject.states.splice(undoObject.actionCount);
    }
})*/

/* Version 1 - test
var arr = [];
var i =0;

$('.undo').on('click',function(){
        arr[i] = new Image();
        arr[i].src = canvasReal.toDataURL();
        console.log(arr[i]);
        i++;
    });
    $('.redo').on("click",function(){
        contextReal.drawImage(arr[1],0,0); 
    })
*/