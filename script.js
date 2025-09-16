const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);


window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('mouseout', function() {
    mouse.x = null;
    mouse.y = null;
});


class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;


        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;


        if (mouse.x && mouse.y) {
            let dx = this.x - mouse.x;
            let dy = this.y - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(231, 76, 60, ${1 - distance / 100})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
        this.draw();
    }
}

// particles
function createParticles() {
    particles = [];
    const numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let speedX = (Math.random() * 0.5) - 0.25;
        let speedY = (Math.random() * 0.5) - 0.25;
        let color = 'rgba(231, 76, 60, 0.8)';
        particles.push(new Particle(x, y, size, color, speedX, speedY));
    }
}
createParticles();

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
}
animate();
