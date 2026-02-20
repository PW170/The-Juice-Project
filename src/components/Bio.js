'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Bio() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.bio-image-wrapper', {
                scrollTrigger: {
                    trigger: '#bio',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                x: -60,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
            });

            gsap.from('.bio-text-wrapper', {
                scrollTrigger: {
                    trigger: '#bio',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
                x: 60,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="bio" className="bio-section" ref={sectionRef}>
            <div className="container">
                <div className="bio-image-wrapper">
                    <Image
                        src="/images/juice-rose.jpg"
                        alt="Juice WRLD with rose"
                        width={600}
                        height={800}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
                <div className="bio-text-wrapper">
                    <h2 className="section-title">The Legend</h2>
                    <div className="bio-content">
                        <p>
                            Jarad Anthony Higgins wasn&apos;t just a rapper — he was the voice of a generation drowning in its
                            own emotions. From the streets of Chicago to sold-out arenas worldwide, Juice WRLD turned heartbreak
                            into anthems and pain into poetry.
                        </p>
                        <p>
                            His freestyles were legendary. His melodies were haunting. His honesty was brutal. In a world full
                            of fake, he kept it 999 — taking the negative and flipping it to something beautiful.
                        </p>
                        <blockquote className="bio-quote">
                            &quot;I&apos;m not a living legend. I&apos;m more of a dead one walking.&quot;
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
}
