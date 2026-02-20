'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
    {
        text: 'Juice WRLD saved my life. His music made me feel like someone understood what I was going through. 999 forever.',
        author: '— A Fan From Chicago',
    },
    {
        text: 'I listen to Lucid Dreams every night. It hits different knowing he put his whole soul into every bar. Gone too soon.',
        author: '— @999club',
    },
    {
        text: 'He freestyled for an hour straight. AN HOUR. No written verses. That\'s not talent — that\'s a gift from God.',
        author: '— A Day One Fan',
    },
];

export default function FanQuotes() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.fan-quote-card', {
                scrollTrigger: {
                    trigger: '.fan-section',
                    start: 'top 75%',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="fan-section" ref={sectionRef}>
            <h2 className="section-title">From The Fans</h2>
            <div className="fan-quotes-grid">
                {quotes.map((q, i) => (
                    <div className="fan-quote-card" key={i}>
                        <p>{q.text}</p>
                        <span className="quote-author">{q.author}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
