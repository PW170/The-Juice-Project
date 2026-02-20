'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

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
        const hoverElements = document.querySelectorAll('a, .album-card, .gallery-item');

        const onEnter = () => gsap.to(cursor, { scale: 2, duration: 0.3 });
        const onLeave = () => gsap.to(cursor, { scale: 1, duration: 0.3 });

        hoverElements.forEach((el) => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            hoverElements.forEach((el) => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);

    return <div className="custom-cursor" ref={cursorRef} />;
}
