
canvasSettings.downloadCanvas = function(link, canvasId, filename) {
        //Downloads Image
        link.href = document.getElementById(canvasId).toDataURL();
        link.download = filename;
    }
    
    document.getElementById('download').addEventListener('click', function() {
        canvasSettings.downloadCanvas(this, 'canvas-real', 'image.png');
    }, false);
    