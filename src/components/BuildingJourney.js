'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export const albums = [
    { id: 'gbgr', className: 'art-gbgr', image: '/images/gbgr.jpg', abbr: 'GB&GR', title: 'Goodbye & Good Riddance', year: '2018' },
    { id: 'drfl', className: 'art-drfl', image: '/images/drfl.jpg', abbr: 'DRFL', title: 'Death Race for Love', year: '2019' },
    { id: 'lnd', className: 'art-lnd', image: '/images/lnd.jpg', abbr: 'LND', title: 'Legends Never Die', year: '2020' },
    { id: 'fd', className: 'art-fd', image: '/images/fd.jpg', abbr: 'FD', title: 'Fighting Demons', year: '2021' },
];

export default function BuildingJourney() {
    const worldRef = useRef(null);
    const overlayRef = useRef(null);
    const buildingRef = useRef(null);
    const viewportRef = useRef(null);
    const linesRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.scroll-container',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                }
            });

            // Phase 1: Fade out the giant floating title
            tl.to(overlayRef.current, {
                opacity: 0,
                y: -150,
                scale: 0.9,
                duration: 0.5,
            });

            // Phase 2: Tilt the building from steep angle to a strong perspective angle
            tl.to(worldRef.current, {
                rotateX: 12,
                rotateY: -22,      // Exposes the right side wall
                translateZ: -300,  // Push back to fit the wider 3D view
                translateY: 2200,  // Shift the 5000px tall world down so its top is near the center
                duration: 1.5,
                ease: 'power1.inOut'
            }, 0.2);

            // Phase 3: Plunge down the endless facade
            tl.to(buildingRef.current, {
                y: typeof window !== 'undefined' && window.innerWidth < 768 ? -7500 : -4000,
                duration: 8,
                ease: 'none'
            }, 2.0);

            // Phase 4: Transition viewport background to a dark, hellish red at the abyss
            tl.to(viewportRef.current, {
                backgroundColor: '#1a0000',
                duration: 2,
            }, 6.0); // Trigger this deep into the 8-second vertical scroll

            // Phase 5: Smoothly re-center the building to face the camera flat
            tl.to(worldRef.current, {
                rotateX: 0,
                rotateY: 0,
                translateZ: 150, // Move closer to expand and fit display
                duration: 2,
                ease: 'power2.inOut'
            }, 5.5); // Begin this animation as we approach the Meaning section

            tl.to(linesRef.current, {
                opacity: 0,
                duration: 2,
            }, 6.0);

        });

        return () => ctx.revert();
    }, []);

    const handleEnterWorld = () => {
        window.scrollTo({
            top: window.innerHeight * 1.5,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div className="street-lines" ref={linesRef}>
                <div className="line line-1"></div>
                <div className="line line-2"></div>
            </div>

            <div className="scroll-container"></div>

            {/* Floating 2D Overlay (The huge title) */}
            <div className="floating-overlay" ref={overlayRef}>
                <h1>
                    <span>999</span>
                    <span>TRIBUTE</span>
                </h1>
                <p className="poster-subtitle">"before I go insane, love."</p>
                <button className="enter-btn" onClick={handleEnterWorld} style={{ marginTop: '4rem' }}>
                    ENTER WORLD
                </button>
            </div>

            <div className="viewport-3d" ref={viewportRef}>
                <div className="world" ref={worldRef}>
                    <div className="building" ref={buildingRef}>

                        <div className="wall-left"></div>
                        <div className="wall-right"></div>

                        <div className="roof">
                            <div className="tiny-juice"></div>
                        </div>

                        <div className="facade">
                            <div style={{ textAlign: 'center', paddingTop: '4rem', marginBottom: '2rem' }}>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', lineHeight: '0.9', letterSpacing: '-2px', color: '#fff', textShadow: '0 5px 20px rgba(0,0,0,0.8), 0 10px 40px rgba(0,0,0,0.6)' }}>ALL GIRLS<br />ARE THE<br />SAME</h2>
                            </div>

                            {/* WINDOWS NOW FIRST */}
                            <div className="facade-grid">

                                <div className="window content-card span-2" style={{ transform: 'rotate(-1deg)', zIndex: 2 }}>
                                    <p className="window-text" style={{ color: '#111', fontSize: '1.5rem', fontFamily: 'var(--font-display)', letterSpacing: '2px' }}>THE JOURNEY</p>
                                    <h3 className="window-title" style={{ color: '#111', fontSize: '5rem', textShadow: '3px 3px 0 #fff' }}>999 FOREVER</h3>
                                    <p className="window-text" style={{ color: '#333', marginTop: '1rem', fontSize: '1.1rem' }}>Scroll down to descend.<br />From the rooftops of heartbreak<br />to the depths of the abyss.</p>
                                </div>

                                <div className="window black-card" style={{ transform: 'rotate(2deg)', zIndex: 1 }}>
                                    <Image src="/images/juice-smoke.jpg" alt="Juice Smoke" fill className="window-image" sizes="50vw" />
                                </div>
                                <div className="window black-card content-card" style={{ transform: 'rotate(-2deg)', background: 'var(--red-accent)', border: 'none' }}>
                                    <h3 className="window-title" style={{ color: '#111', fontSize: '4rem' }}>LEGENDS</h3>
                                    <p className="window-text" style={{ color: '#fff', fontSize: '1.2rem' }}>Never Die</p>
                                </div>

                                <div className="window black-card span-2" style={{ aspectRatio: '21/9', transform: 'rotate(1deg)' }}>
                                    <Image src="/images/hero-bg.jpg" alt="Hero Art" fill className="window-image" sizes="100vw" style={{ filter: 'contrast(1.2)' }} />
                                </div>

                                <div className="window black-card">
                                    <Image src="/images/juice-rose.jpg" alt="Juice Rose" fill className="window-image" sizes="50vw" />
                                </div>
                                <div className="window black-card">
                                    <Image src="/images/juice-doves.jpg" alt="Juice Doves" fill className="window-image" sizes="50vw" />
                                </div>

                                <div className="window content-card span-2" style={{ background: '#111', transform: 'rotate(-1deg)' }}>
                                    <h3 className="window-title" style={{ fontSize: '8rem', color: '#fff', textShadow: '4px 4px 0 var(--red-accent)' }}>999</h3>
                                    <p className="window-text" style={{ color: 'var(--yellow-accent)', fontSize: '1.5rem' }}>"I still see your shadows in my room"</p>
                                </div>

                                <div className="window black-card" style={{ transform: 'rotate(-1.5deg)' }}>
                                    <Image src="/images/juice-lean.jpg" alt="Juice WRLD Lean" fill className="window-image" sizes="50vw" />
                                </div>

                            </div>

                            {/* THE MEANING OF 999 */}
                            <div style={{
                                margin: '2rem auto',
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                maxWidth: '85%',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.06)',
                            }}>
                                <h2 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '6rem',
                                    lineHeight: 0.9,
                                    color: 'var(--yellow-accent)',
                                    textShadow: '0 0 30px rgba(242,227,0,0.3), 0 0 60px rgba(242,227,0,0.15)',
                                    marginBottom: '1rem',
                                }}>999</h2>
                                <p style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.8rem',
                                    color: 'rgba(255,255,255,0.7)',
                                    letterSpacing: '3px',
                                    marginBottom: '1.5rem',
                                }}>THE MEANING</p>
                                <div style={{
                                    width: '40px',
                                    height: '2px',
                                    background: 'var(--red-accent)',
                                    margin: '0 auto 1.5rem',
                                    boxShadow: '0 0 10px rgba(204,0,0,0.5)',
                                }} />
                                <p style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.85rem',
                                    color: 'rgba(255,255,255,0.5)',
                                    lineHeight: 1.8,
                                    maxWidth: '320px',
                                    margin: '0 auto 1.5rem',
                                    fontWeight: 500,
                                }}>
                                    999 represents taking whatever hell, whatever bad situation or whatever struggle you&apos;re going through and turning it into something positive to push yourself forward.
                                </p>
                                <p style={{
                                    fontFamily: 'var(--font-marker)',
                                    fontSize: '1.1rem',
                                    color: 'var(--yellow-accent)',
                                    transform: 'rotate(-2deg)',
                                    opacity: 0.8,
                                }}>— Juice WRLD</p>
                            </div>

                            {/* ALBUMS SHOWCASE */}
                            <div className="albums-showcase">
                                <div className="albums-showcase-header">
                                    <h2>THE LEGACY</h2>
                                </div>
                                {albums.map((album, index) => (
                                    <Link href={`/album/${album.id}`} key={album.abbr} style={{ textDecoration: 'none' }}>
                                        <div className={`album-item rotate-${index % 2 === 0 ? 'left' : 'right'}`}>
                                            <div className="album-cover">
                                                <Image
                                                    src={album.image}
                                                    alt={album.title}
                                                    width={80}
                                                    height={80}
                                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                />
                                            </div>
                                            <div className="album-info">
                                                <h4>{album.title}</h4>
                                                <p>{album.year}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
