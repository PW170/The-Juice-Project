'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
    { src: '/images/juice-smoke.jpg', alt: 'Juice WRLD smoking - black and white' },
    { src: '/images/juice-scream.jpg', alt: 'Juice WRLD screaming - black and white closeup' },
    { src: '/images/juice-doves.jpg', alt: 'Juice WRLD with doves and Restless tattoo' },
];

export default function Gallery() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.gallery-item', {
                scrollTrigger: {
                    trigger: '#gallery',
                    start: 'top 70%',
                },
                scale: 0.9,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power2.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="gallery" className="gallery-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title">Moments</h2>
                <div className="gallery-grid">
                    {galleryImages.map((img, i) => (
                        <div className="gallery-item" key={i}>
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
