window.onload=function(){
    let video=document.getElementById('video');
    let copyCanvas=document.getElementById('copyCanvas');
    let  copyContext=copyCanvas.getContext('2d');

    let replaceCanvas=document.getElementById('replaceCanvas');
    let replaceContext=replaceCanvas.getContext('2d');
     
    let sepiaCanvas=document.getElementById('sepiaCanvas');
    let sepiaContext=sepiaCanvas.getContext('2d');

    let width;
    let height;
    width=video.clientWidth;
        height=video.clientHeight;

        copyCanvas.width=width;
        copyCanvas.height=height; 
    
        replaceCanvas.width=width;
        replaceCanvas.height=height;
        
        sepiaCanvas.width=width;
        sepiaCanvas.height=height;

     
    // navigator.mediaDevices.getUserMedia({video:true,audio:false}).then(function(stream){
    //     width=video.clientWidth;
    //     height=video.clientHeight;

    //     copyCanvas.width=width;
    //     copyCanvas.height=height; 
    
    //     replaceCanvas.width=width;
    //     replaceCanvas.height=height;
        
    //     sepiaCanvas.width=width;
    //     sepiaCanvas.height=height;

    //     video.src=stream.srcObject;
    //     video.play();

    // })

    //R 103, G 189, B 49
    //un ss cu img , il punem in paint, color picker, edit colors si vedem culorile
    video.addEventListener('play',function(){
        //  console.log('playing')
        //  drawCopyCanvas();
        
        draw();
        
    })
    function draw(){
        drawCopyCanvas();
        drawReplaceCanvas();
        drawSepiaContext();
        requestAnimationFrame(draw);

    }
    function drawCopyCanvas(){
        
        copyContext.drawImage(video,0,0,width,height);
        // drawCopyCanvas();
        // setTimeout(function(){
        //     drawCopyCanvas();
        // },0);
      // requestAnimationFrame(drawCopyCanvas);
    }
    function drawReplaceCanvas(){
        replaceContext.drawImage(video, 0, 0, width, height);

        let imageData=copyContext.getImageData(0,0,width,height);
        console.log(imageData);
        for(let i=0;i<imageData.data.length;i+=4){
            let red=imageData.data[i];
            let green=imageData.data[i+1];
            let blue=imageData.data[i+2];
            if(between(red,90,120)&&between(green,180,200)&&between(blue,20,80)){
               imageData.data[i]=0;
               imageData.data[i+1]=0;
                imageData.data[i+2]=255;
            }
        }
        replaceContext.putImageData(imageData,0,0);
    }
    function drawSepiaContext(){
        sepiaContext.drawImage(video, 0, 0, width, height);
        //just a formula: red=0.393 * red + 0.769*green+0.189*blue
        let imageData=copyContext.getImageData(0,0,width,height);
        for(let i=0;i<imageData.data.length;i+=4){
            let red=imageData.data[i];
            let green=imageData.data[i+1];
            let blue=imageData.data[i+2];

            //red
            imageData.data[i]=Math.min(0.393 * red + 0.769*green+0.189*blue,255);
            //green
            imageData.data[i+1]=Math.min(0.349 * red + 0.686*green+0.168*blue,255);
            ///blue
            imageData.data[i+2]=Math.min(0.393 * red + 0.769*green+0.131*blue,255)

        }
        sepiaContext.putImageData(imageData,0,0);
    }
    function between(value,min,max){
        return value>=min&&value<=max;
        
    }
 
}

//exam:
//create element,we want to see only the result ,  replaceCanvas 