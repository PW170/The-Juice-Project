'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function MusicPlayer() {
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const analyserRef = useRef(null);
    const animFrameRef = useRef(null);
    const audioContextRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [expanded, setExpanded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Autoplay on page load — falls back to first user interaction
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume;

        const tryAutoplay = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch {
                // Browser blocked autoplay — start on first interaction
                const startOnInteraction = () => {
                    audio.play().then(() => {
                        setIsPlaying(true);
                    }).catch(() => { });
                    document.removeEventListener('click', startOnInteraction);
                    document.removeEventListener('keydown', startOnInteraction);
                    document.removeEventListener('scroll', startOnInteraction);
                    document.removeEventListener('touchstart', startOnInteraction);
                };
                document.addEventListener('click', startOnInteraction, { once: false });
                document.addEventListener('keydown', startOnInteraction, { once: false });
                document.addEventListener('scroll', startOnInteraction, { once: false });
                document.addEventListener('touchstart', startOnInteraction, { once: false });

                return () => {
                    document.removeEventListener('click', startOnInteraction);
                    document.removeEventListener('keydown', startOnInteraction);
                    document.removeEventListener('scroll', startOnInteraction);
                    document.removeEventListener('touchstart', startOnInteraction);
                };
            }
        };

        tryAutoplay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Setup audio analyser for visualizer
    const setupAnalyser = useCallback(() => {
        if (audioContextRef.current || !audioRef.current) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 64;
        const source = audioContext.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
    }, []);

    // Visualizer draw loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const draw = () => {
            animFrameRef.current = requestAnimationFrame(draw);
            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);

            if (analyserRef.current && isPlaying) {
                const bufferLength = analyserRef.current.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyserRef.current.getByteFrequencyData(dataArray);

                const barCount = 20;
                const barWidth = width / barCount - 2;

                for (let i = 0; i < barCount; i++) {
                    const dataIndex = Math.floor(i * bufferLength / barCount);
                    const barHeight = (dataArray[dataIndex] / 255) * height;

                    const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
                    gradient.addColorStop(0, '#cc0000');
                    gradient.addColorStop(1, '#f2e300');

                    ctx.fillStyle = gradient;
                    ctx.fillRect(i * (barWidth + 2), height - barHeight, barWidth, barHeight);
                }
            } else {
                // Idle state — subtle static bars
                const barCount = 20;
                const barWidth = width / barCount - 2;
                for (let i = 0; i < barCount; i++) {
                    const h = 3 + Math.sin(Date.now() * 0.002 + i) * 2;
                    ctx.fillStyle = 'rgba(255,255,255,0.15)';
                    ctx.fillRect(i * (barWidth + 2), height - h, barWidth, h);
                }
            }
        };

        draw();
        return () => cancelAnimationFrame(animFrameRef.current);
    }, [isPlaying]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        setupAnalyser();

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const v = parseFloat(e.target.value);
        setVolume(v);
        if (audioRef.current) audioRef.current.volume = v;
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (t) => {
        if (isNaN(t)) return '0:00';
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <>
            <audio
                ref={audioRef}
                src="/audio/background.mp3"
                loop
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />

            <div
                className="music-player"
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 9998,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '8px',
                    cursor: 'auto',
                    pointerEvents: 'auto',
                }}
            >
                {/* Expanded Panel */}
                {expanded && (
                    <div
                        style={{
                            background: 'rgba(15, 15, 15, 0.85)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '16px',
                            width: '260px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                            animation: 'slideUp 0.3s ease',
                        }}
                    >
                        {/* Track Info */}
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: '1rem',
                                letterSpacing: '1px',
                                color: '#f2e300',
                            }}>
                                NOW PLAYING
                            </div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'rgba(255,255,255,0.6)',
                                marginTop: '2px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                Empty — Juice WRLD (Slowed & Reverbed)
                            </div>
                        </div>

                        {/* Visualizer */}
                        <canvas
                            ref={canvasRef}
                            width={228}
                            height={40}
                            style={{
                                width: '100%',
                                height: '40px',
                                borderRadius: '6px',
                                background: 'rgba(255,255,255,0.03)',
                                marginBottom: '10px',
                            }}
                        />

                        {/* Seek Bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', minWidth: '30px' }}>
                                {formatTime(currentTime)}
                            </span>
                            <input
                                type="range"
                                min={0}
                                max={duration || 0}
                                step={0.1}
                                value={currentTime}
                                onChange={handleSeek}
                                className="music-slider"
                                style={{ flex: 1 }}
                            />
                            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', minWidth: '30px', textAlign: 'right' }}>
                                {formatTime(duration)}
                            </span>
                        </div>

                        {/* Volume */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
                                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                {volume > 0.3 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
                                {volume > 0.6 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
                            </svg>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={volume}
                                onChange={handleVolumeChange}
                                className="music-slider"
                                style={{ flex: 1 }}
                            />
                        </div>
                    </div>
                )}

                {/* Floating Button */}
                <div
                    onClick={() => setExpanded(!expanded)}
                    style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: isPlaying
                            ? 'linear-gradient(135deg, #cc0000, #990000)'
                            : 'rgba(20, 20, 20, 0.9)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: `1.5px solid ${isPlaying ? 'rgba(255,77,77,0.3)' : 'rgba(255,255,255,0.15)'}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        boxShadow: isPlaying
                            ? '0 0 25px rgba(204, 0, 0, 0.4), 0 8px 30px rgba(0,0,0,0.4)'
                            : '0 8px 30px rgba(0,0,0,0.4)',
                        transition: 'all 0.3s ease',
                        animation: isPlaying ? 'pulse-glow 2s ease-in-out infinite' : 'none',
                    }}
                    title={expanded ? 'Close player' : 'Open player'}
                >
                    {/* Music note icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                </div>

                {/* Play/Pause mini button */}
                <div
                    onClick={togglePlay}
                    style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(20, 20, 20, 0.85)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease',
                    }}
                    title={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <polygon points="5,3 19,12 5,21" />
                        </svg>
                    )}
                </div>
            </div>

            <style jsx global>{`
                .music-slider {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 3px;
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 2px;
                    outline: none;
                    cursor: pointer;
                }
                .music-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #f2e300;
                    cursor: pointer;
                    box-shadow: 0 0 8px rgba(242, 227, 0, 0.4);
                }
                .music-slider::-moz-range-thumb {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #f2e300;
                    cursor: pointer;
                    border: none;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 25px rgba(204, 0, 0, 0.4), 0 8px 30px rgba(0,0,0,0.4); }
                    50% { box-shadow: 0 0 35px rgba(204, 0, 0, 0.6), 0 8px 30px rgba(0,0,0,0.4); }
                }
            `}</style>
        </>
    );
}
