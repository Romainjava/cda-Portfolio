var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
const colors = [
    '#ffc107',
    '#844437',
    '#2b3e4f',
    '#343a40'
];

/**
 * renvoie une couleurs random
 * @param {tableau} colors 
 */
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}
/**
 * 
 * @param {int} min 
 * @param {int} max 
 */
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * crée des particles
 * @param {int} x 
 * @param {int} y 
 * @param {int} radius 
 * @param {string} color 
 */
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2; //rotation de la particule
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(50, 120);

    this.update = () => {
        //last point permet de nous donner la position x et y avant de faire une action
        //c'est ce qui crée l'effet smooth des particles
        const lastPoint = {
            x: this.x,
            y: this.y
        };
        // move points over time
        this.radians += this.velocity;

        //circular Motion
        this.x = x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    };

    this.draw = lastPoint => {
        /* ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath(); */
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }
}

//var circle = new Circle(200, 200, 3, 3, 30);
//var time = new Date();
var widthinner = 400; //taille du canvas
var heightinner = 240;
//var dx = 4; //nom de variable utilisé pour la vélocité
//var dy = 4;
//particles en global
var particles

/**
 * instancie le nombre d'objet particles
 */
function init() {
    particles = [];
    for (let i = 0; i < 50; i++) {
        //pour chaque new particle donne nous un new radius de 1 a 2
        //ce qui permet de donner un spawn de different size et rendre encore plus smooth
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particle(widthinner / 2, heightinner / 2, radius, randomColor(colors)));
    }
}
/**
 * refresh la frame avec le nombre d'objet
 */
function animate() {
    requestAnimationFrame(animate);
    //ctx.clearRect(0, 0, widthinner, heightinner); //refresh/reset la frame chaque seconde  
    //circle.update(); //ancienne animation

    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, 0, widthinner, heightinner); //refresh/reset la frame chaque seconde 
    particles.forEach(particle => {//crée chaque objet particle
        particle.update()
    });
}

document.addEventListener('DOMContentLoaded', function () {
    init();
    animate();

    //== BURGER MENU ==//
    const burger = document.querySelector('.footer__burger');
    const burger_ul = document.querySelector('.footer__burger--list');
    const burger_spanOne = document.querySelector('.footer__burger > :nth-child(1)');
    const burger_spanTwo = document.querySelector('.footer__burger > :nth-child(2)');
    const burger_spanThree = document.querySelector('.footer__burger > :nth-child(3)');

    burger.addEventListener('click',function(e){
        e.preventDefault();
        if(!burger_ul.classList.contains('slideUp')){
           burger_ul.classList.add('slideUp');           
            burger_spanOne.style.top = '5%';
            burger_spanOne.style.transform = 'rotate(50deg)';
            burger_spanTwo.style.transform = 'rotate(-50deg)';
            burger_spanThree.style.display = 'none';

        }else {       
            burger_ul.classList.remove('slideUp');    
            burger_spanOne.style.top = '-10%';
            burger_spanOne.style.transform = 'rotate(0)';
            burger_spanTwo.style.transform = 'rotate(0)';
            burger_spanThree.style.display = 'block';
        }
    })

})

