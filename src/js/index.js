let ctx = null;
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
 * @param {ctx} ctx
 * @param {int} x
 * @param {int} y
 * @param {int} radius
 * @param {string} color
 */
function Particle(x, y, radius, color, ctx) {
    this.ctx = ctx;
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
var particles;

/**
 * instancie le nombre d'objet particles
 */
function init(ctx) {
    particles = [];
    for (let i = 0; i < 50; i++) {
        //pour chaque new particle donne nous un new radius de 1 a 2
        //ce qui permet de donner un spawn de different size et rendre encore plus smooth
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particle(widthinner / 2, heightinner / 2, radius, randomColor(colors), ctx));
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
    let canvas = document.querySelector('#canvas');
    if (canvas !== null) {
        ctx = canvas.getContext('2d');
        init(ctx);
        animate();
    }

    //== BURGER MENU ==//
    const burger = document.querySelector('.footer__burger');
    const burger_ul = document.querySelector('.footer__burger--list');
    const burger_spanOne = document.querySelector('.footer__burger > :nth-child(1)');
    const burger_spanTwo = document.querySelector('.footer__burger > :nth-child(2)');
    const burger_spanThree = document.querySelector('.footer__burger > :nth-child(3)');

    burger.addEventListener('click', function (e) {
        e.preventDefault();
        if (!burger_ul.classList.contains('slideUp')) {
            burger_ul.classList.add('slideUp');
            burger_spanOne.style.top = '5%';
            burger_spanOne.style.transform = 'rotate(50deg)';
            burger_spanTwo.style.transform = 'rotate(-50deg)';
            burger_spanThree.style.display = 'none';

        } else {
            burger_ul.classList.remove('slideUp');
            burger_spanOne.style.top = '-10%';
            burger_spanOne.style.transform = 'rotate(0)';
            burger_spanTwo.style.transform = 'rotate(0)';
            burger_spanThree.style.display = 'block';
        }
    })

    //== Part realisation ==//
    const r_btn = document.querySelectorAll(".btn");
    const r_bloc = document.querySelectorAll('.realisation__bloc');
    const r_trigger_modal = document.querySelectorAll('.realisation__bloc--btn');
    const r_bloc_modal = document.querySelector('.realisation__modals');
    const r_remove_modal = document.querySelectorAll('.realisation__modals--btn');
    const r_modals_article = document.querySelectorAll('.realisation__modals--article');


    r_trigger_modal.forEach(btn => {
        btn.addEventListener('click', function () {
            let target = "modal-" + btn.parentNode.getAttribute('data-id');

            r_bloc_modal.classList.add('m-active');
            r_modals_article.forEach(article => {
                if (article.id === target) {
                    article.classList.remove('is-none');
                    article.classList.add('m-active');
                } else {
                    article.classList.add('is-none');
                    article.classList.remove('m-active');
                }
            })

        });
    });

    r_remove_modal.forEach(btn => {
        btn.addEventListener('click', function () {
            r_bloc_modal.classList.remove('m-active');
            r_modals_article.forEach(article => {
                article.classList.remove('m-active');
                article.classList.add('is-none');
            });

        });
    });

    r_btn.forEach(btn => {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            //supprime la class active sur les btn qui l'ont
            document.querySelectorAll(".btn.active").forEach(b => {
                    b.classList.remove('active');
                }
            );
            btn.classList.add('active');
            let target = this.getAttribute("data-target");
            r_bloc.forEach(element => {
                //me permet de switch les réalisation avec les boutons du home caroussel
                //J'ajoute un effet css dessus
                if (element.getAttribute('data-id') === target) {
                    element.classList.remove('target');
                    element.classList.add('slideFromRight');
                } else {
                    element.classList.remove('slideFromRight');
                    element.classList.add('target');
                }
            })
        })
    })


});

