var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 1.5;
ctx.translate(radius, radius);
radius = radius * 0.90;
var straight = true;
var mY = 0;
var mX = 0;

window.addEventListener('load', ()=>{ 
    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            straight = !straight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCircle(ctx, radius);
        }
    }
    resize(); // Resizes the canvas once the window loads
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
}); 
                        
// Resizes the canvas to the available size of the window. 
function resize(){
    ctx.canvas.width = window.innerWidth; 
    ctx.canvas.height = window.innerHeight;
    drawCircle(ctx, radius);
} 

// Stores the initial position of the cursor 
let coord = {x:0 , y:0};  
let oppositeCoord = {x:0 , y:0};  

// This is the flag that we are going to use to  
// trigger drawing 
let paint = false; 
    
// Updates the coordianates of the cursor when  
// an event e is triggered to the coordinates where  
// the said event is triggered. 
function getPosition(event){
    oppositeCoord.x = coord.x = event.clientX - canvas.offsetLeft; 
    oppositeCoord.y = coord.y = event.clientY - canvas.offsetTop;
    mY = event.pageY;
    mX = event.pageX;
} 


function startPainting(event){ 
    paint = true; 
    getPosition(event);
} 
function stopPainting(){ 
    paint = false; 
} 
    
function sketch(event){ 
    if (!paint) return; 
    
    ctx.beginPath(); 
    ctx.lineWidth = 5; 
    ctx.lineCap = 'round'; 
    ctx.strokeStyle = 'green'; 
    if (straight) {
        ctx.moveTo(coord.x, coord.y); 
        getPosition(event); 
        ctx.lineTo(coord.x , coord.y);
    } else {
        console.log('opposite y: ' + oppositeCoord.y);
        yDiff = (mY - event.pageY);
        xDiff = (mX - event.pageX);
        ctx.moveTo(oppositeCoord.x, oppositeCoord.y);
        oppositeCoord.y = oppositeCoord.y + (mX - event.pageX);
        oppositeCoord.x = oppositeCoord.x + (mY - event.pageY);
        ctx.lineTo(oppositeCoord.x , oppositeCoord.y);
        mY = event.pageY;
        mX = event.pageX;
    }
    ctx.stroke(); 
} 

function drawCircle(ctx, radius) {
    var grad;

    ctx.beginPath();
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    grad = ctx.createRadialGradient(ctx.canvas.width / 2, ctx.canvas.height / 2, radius * 0.95, ctx.canvas.width / 2, ctx.canvas.height / 2, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, radius * 0.075, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();

    var interval=(Math.PI*2)/8;
    var centerX = ctx.canvas.width / 2;
    var centerY = ctx.canvas.height / 2;

    for(var i=0;i<8;i++){

        desiredRadianAngleOnCircle = interval*i;

        var x = centerX+radius*.8*Math.cos(desiredRadianAngleOnCircle);
        var y = centerY+radius*.8*Math.sin(desiredRadianAngleOnCircle);
        ctx.beginPath();
        ctx.arc(x,y,radius*.075,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
}