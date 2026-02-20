'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const albums = [
    { className: 'art-gbgr', abbr: 'GB&GR', title: 'Goodbye & Good Riddance', year: '2018' },
    { className: 'art-drfl', abbr: 'DRFL', title: 'Death Race for Love', year: '2019' },
    { className: 'art-lnd', abbr: 'LND', title: 'Legends Never Die', year: '2020' },
    { className: 'art-fd', abbr: 'FD', title: 'Fighting Demons', year: '2021' },
];

export default function Discography() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.album-card', {
                scrollTrigger: {
                    trigger: '#discography',
                    start: 'top 70%',
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="discography" className="disco-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title">Discography</h2>
                <div className="albums-grid">
                    {albums.map((album) => (
                        <div className="album-card" key={album.abbr}>
                            <div className={`album-art ${album.className}`}>
                                <span>{album.abbr}</span>
                            </div>
                            <h3>{album.title}</h3>
                            <p>{album.year}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
