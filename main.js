// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    initHeroCanvas();
    initGalleryArt();

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Hover effect for cursor
    const hoverElements = document.querySelectorAll('a, .album-card, .gallery-item');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 2,
                duration: 0.3
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3
            });
        });
    });

    // Hero Animations
    const tl = gsap.timeline();

    tl.to('.reveal-text', {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
    })
        .to('.hero-subtitle', {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5");

    // Scroll Animations

    // Bio Section
    gsap.from('.bio-content', {
        scrollTrigger: {
            trigger: '#bio',
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Discography
    gsap.from('.album-card', {
        scrollTrigger: {
            trigger: '#discography',
            start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Gallery
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '#gallery',
            start: "top 70%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
    });
});

function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Resize
    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }

        draw() {
            ctx.fillStyle = `rgba(157, 78, 221, ${this.opacity})`; // Purple tint
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Init Particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    // Animate
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    };

    animate();
}

function initGalleryArt() {
    const items = document.querySelectorAll('.gallery-item');
    const darkerColors = ['#1a0b2e', '#2e0b16', '#0b2e29', '#0b0e2e', '#290b2e'];

    items.forEach(item => {
        const color1 = darkerColors[Math.floor(Math.random() * darkerColors.length)];
        const color2 = '#000000';
        const angle = Math.floor(Math.random() * 360);
        item.style.backgroundImage = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    });
}
