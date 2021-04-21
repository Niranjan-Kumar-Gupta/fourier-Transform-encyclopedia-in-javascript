const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
let time = 0;
let posX = 120;
let posY = 300;
let wave = [];
let color;
function draw() {
    let x = posX;
    let y = posY;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(x,y,2,0,Math.PI*2);
    ctx.closePath();
    ctx.stroke();   
    for (let i = 0; i < 3; i++) {
        let prevX = x;
        let prevY = y;   
        let n = i*2 +1;   
        let radius = 50*(4/(n*Math.PI));   
        x += radius*Math.cos(n*time);
        y += radius*Math.sin(n*time);
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(prevX,prevY,radius,0,Math.PI*2);
        ctx.closePath();
        ctx.stroke();  
        ctx.beginPath();
        ctx.moveTo(prevX,prevY);
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.arc(x,y,2,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();  
    }
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x,y);
    ctx.lineTo(posX+130,y);
    ctx.stroke();
    wave.unshift(new Wave(posX+130,y));
    time += 0.03;
}
class Wave{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.lineWidth = 1;
        ctx.arc(this.x,this.y,1,0,Math.PI*2);   
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
    update(){
        this.x += 0.53;
    }
}

function handleWave(){
    for (let i = wave.length-1; i >= 0; i--) {
        wave[i].draw();
        wave[i].update();
    }
    if (wave.length > 200) {
        wave.pop();
    }
}
function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
setInterval(()=>{    
        clear();
        draw();
        handleWave();
},1000/60);
