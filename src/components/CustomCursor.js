'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Prevent dragging battery/performance on touch-only devices
        if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
            return;
        }

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out',
            });
        };

        document.addEventListener('mousemove', moveCursor);

        // Hover effect
        const hoverElements = document.querySelectorAll('a, .album-card, .gallery-item, .track-item-am, .back-button');

        const onEnter = () => gsap.to(cursor, {
            scale: 1.5,
            background: 'rgba(255, 255, 255, 0.8)',
            border: '2px solid transparent',
            duration: 0.2,
            ease: "power2.out"
        });
        const onLeave = () => gsap.to(cursor, {
            scale: 1,
            background: 'transparent',
            border: '2px solid #ffffff',
            duration: 0.2,
            ease: "power2.out"
        });

        // Music Player hide effect (so OS pointer can easily scrub the complicated input[type="range"])
        const playerElements = document.querySelectorAll('.music-player');
        const onPlayerEnter = () => gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
        const onPlayerLeave = () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });

        playerElements.forEach((el) => {
            el.addEventListener('mouseenter', onPlayerEnter);
            el.addEventListener('mouseleave', onPlayerLeave);
        });

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            hoverElements.forEach((el) => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
            playerElements.forEach((el) => {
                el.removeEventListener('mouseenter', onPlayerEnter);
                el.removeEventListener('mouseleave', onPlayerLeave);
            });
        };
    }, []);

    return <div className="custom-cursor" ref={cursorRef} />;
}
