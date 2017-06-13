var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//var grd = c.createLinearGradient(0, 0, canvas.width, 0);
//grd.addColorStop(0, 'black');
//grd.addColorStop(1, 'rgb(0, 0, 255)');

var colorArray = [
    "#D8CAA8",
    "#5C832F",
    "#284907",
    "#382513",
    "#363942"
    ];

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 50;

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(event){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;
    
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
//        c.fillStyle = grd;
//        c.fill();
        c.fillStyle = color;
        c.fill();
    }
    
    this.update = function() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;   
        }
    
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;   
        }
    
        this.x += this.dx;
        this.y += this.dy
        
        // interactivity
        if ((mouse.x - this.x) < 50 && (mouse.x - this.x) > -50 && (mouse.y - this.y) < 50 && (mouse.y - this.y) > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius){
            this.radius -= 1;   
        }
        
        this.draw();
    }   
}

var circleArray = [];

for (var i=0; i<300; i++) {
    var x = Math.random() * (canvas.width - radius * 2) + radius;
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    var radius = Math.random() * 5 + 1;
    var color = colorArray[Math.floor(Math.random() * colorArray.length) + 1];
    circleArray.push(new Circle(x, y, dx, dy, radius, color));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for (var i=0; i<circleArray.length; i++) {
        circleArray[i].update();   
    }
}  

animate();