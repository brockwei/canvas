
function downloadCanvas(link, canvasId, filename) {
    
        var save = document.getElementById(canvasId).getContext('2d');
        var w = save.canvas.width;
        var h = save.canvas.height;
        var data;
        //get the current ImageData for the canvas.
        data = save.getImageData(0, 0, w, h);
        //store the current globalCompositeOperation
        var compositeOperation = save.globalCompositeOperation;
        //set to draw behind current content
        save.globalCompositeOperation = "destination-over";
        //set background color
        save.fillStyle = "rgb(255,255,255)";
        //draw background / rect on entire canvas
        save.fillRect(0,0,w,h);
    
        //Downloads Image
        link.href = document.getElementById(canvasId).toDataURL();
        link.download = filename;
    
        //clear the canvas
        save.clearRect (0,0,w,h);
        //restore it with original / cached ImageData
        save.putImageData(data, 0,0);
        //reset the globalCompositeOperation to what it was
        save.globalCompositeOperation = compositeOperation;
    }
    
    document.getElementById('download').addEventListener('click', function() {
        downloadCanvas(this, 'canvas-real', 'test.png');
    }, false);
    