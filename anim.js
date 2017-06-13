// CANVAS AND CONTEXT

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ARRAY WITH COLORS

var colorArray = [
    "#D8CAA8",
    "#5C832F",
    "#284907",
    "#382513",
    "#363942"
    ];

// OBJECTS FOR MOUSE MOVE AND MOUSE DOWN

var mouse = {
    x: undefined,
    y: undefined
}
var mouseclick = {
    x: undefined,
    y: undefined
}

// EVENT LISTENERS FOR MOUSE DOWN, MOUSE MOVE AND RESIZE

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('click', function(event) {
    mouseclick.x = event.x;
    mouseclick.y = event.y;  
});

// VALUES OF COUNTER AND MAX-RADIUS

var counter = 0;
var maxRadius = 50;

// CONSTRUCTOR FOR CIRCLES

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;
    
    // METHOD TO DRAW A CIRCLE ON CANVAS
    
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = color;
        c.fill();
    };
    
    // UPDATING CANVAS, CREATING ANIMATION
    
    this.update = function() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;   
        }
    
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;   
        }
    
        this.x += this.dx;
        this.y += this.dy
        
        // INTERACTIVITY
        // ON MOUSE CLICK
        
        if ((mouseclick.x - this.x) < this.radius && (mouseclick.x - this.x) > -this.radius && (mouseclick.y - this.y) < this.radius && (mouseclick.y - this.y) > -this.radius) {
            this.radius = 0;
            counter += 1;
            console.log(counter);
        }
        
        //ON MOUSE MOVE
        
        if (this.radius > 0) {
            if ((mouse.x - this.x) < 50 && (mouse.x - this.x) > -50 && (mouse.y - this.y) < 50 && (mouse.y - this.y) > -50) {
                if (this.radius < maxRadius) {
                    this.radius += 1; 
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;   
            }
        }
        
        // PLAYING DRAW METHOD INSIDE UPDATE METHOD
        
        this.draw();
    };   
};

// CREATING CIRCLES WITH AN ARRAY AND ADDING VALUES

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

function scoreBoard() {
    c.font = "40px Roboto Mono";
    c.fillText("Score: " + counter, 200, 200);
}

// ANIMATE FUNCTION

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for (var i=0; i<circleArray.length; i++) {
        circleArray[i].update(); 
    }
    scoreBoard();
}  

animate();
