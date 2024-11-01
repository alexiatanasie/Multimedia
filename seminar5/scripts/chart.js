window.onload=function(){
let canvas =document.getElementById('chartCanvas');
let context =canvas.getContext('2d');

let width=canvas.width;
let height=canvas.height;
let XIncrement=150;
let yIncrement=100;

//context.strokeStyle='#bbb';
    
let data=[];
function generateRandomNumber(){
    return parseInt(Math.random()*height);
}

for(let i=0;i<=width/20;i++){
        data[i]=generateRandomNumber();

}
console.log(data);
console.log(width,height);

function drawHorizontalLines(){
    context.strokeStyle='#bbb';
    for(let i=yIncrement;i<height;i+=yIncrement){

        context.beginPath();
        context.moveTo(0,i);
        context.lineTo(width,i);
        context.stroke();
    }
}
function drawVerticalLines(){
    context.lineWidth = 1;

    context.strokeStyle='#bbb';
    for(let i=XIncrement;i<width;i+=XIncrement){
        context.beginPath();
        context.moveTo(i,0);
        context.lineTo(i,height);
        context.stroke();
    }
}
function generateRandomData()
    {
        for (let i = 0; i <= width / 20; i++)
        {
            data[i] = generateRandomNumber();
        }
        console.log(data);
    }
function drawLineChart(){
    context.lineWidth = 5;

    context.strokeStyle ='red';
    context.beginPath();
    context.moveTo(0,height-data[0]);
    for(let i=1;i<data.length;i++){
        context.lineTo(i*20,height-data[i]);

    }
    context.stroke();
}
function clearCanvas()
{
    context.clearRect(0, 0, width, height);
}
function drawChart(){
    clearCanvas();

    //draw horizontal lines
    drawHorizontalLines();
    //draw vertical lines
    drawVerticalLines();
    generateRandomNumber();
    //draw horizontal numbers
    //draw vertical numbers
    //draw line chart
    drawLineChart();
}
setInterval(function() {
    let newValue = generateRandomNumber();
    data.push(newValue);
    data.shift();
    drawChart();
}, 20);
//client call
generateRandomData();
drawChart();
}