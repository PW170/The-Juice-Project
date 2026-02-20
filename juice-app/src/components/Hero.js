'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function Hero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Animate text
        const tl = gsap.timeline();
        tl.to('.reveal-text', {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power4.out',
        })
            .to('.hero-subtitle', {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
            }, '-=0.5')
            .to('.hero-lyric', {
                opacity: 1,
                duration: 1.2,
                ease: 'power2.out',
            }, '-=0.3');

        // Canvas particles — red-tinted
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let animId;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2;
                this.speedX = Math.random() * 0.3 - 0.15;
                this.speedY = Math.random() * 0.3 - 0.15;
                this.opacity = Math.random() * 0.4 + 0.05;
                // Randomly pick red or dim white
                this.isRed = Math.random() > 0.6;
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
                const color = this.isRed
                    ? `rgba(230, 57, 70, ${this.opacity})`
                    : `rgba(255, 255, 255, ${this.opacity * 0.3})`;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            animId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <section id="hero" className="hero-section">
            <Image
                src="/images/hero-bg.jpg"
                alt="All Girls Are The Same"
                fill
                priority
                className="hero-bg-image"
                sizes="100vw"
            />
            <canvas id="hero-canvas" ref={canvasRef} />
            <div className="hero-overlay" />
            <div className="hero-content">
                <h1 className="hero-title">
                    <span className="reveal-text">Legends</span>
                    <span className="reveal-text">Never</span>
                    <span className="reveal-text">Die</span>
                </h1>
                <p className="hero-subtitle">Juice WRLD • 999</p>
                <p className="hero-lyric">&quot;All girls are the same... before I go insane, love.&quot;</p>
            </div>
            <div className="scroll-indicator">
                <span>Scroll</span>
                <div className="scroll-line" />
            </div>
        </section>
    );
}
