'use client';

export default function LyricsMarquee() {
    const lyrics = [
        'ALL GIRLS ARE THE SAME',
        '•',
        'LUCID DREAMS',
        '•',
        'LEGENDS NEVER DIE',
        '•',
        'ROBBERY',
        '•',
        'WISHING WELL',
        '•',
        'HEAR ME CALLING',
        '•',
        'BANDIT',
        '•',
        'RIGHTEOUS',
        '•',
        'COME & GO',
        '•',
        'BLACK & WHITE',
        '•',
    ];

    return (
        <div className="lyrics-marquee">
            <div className="marquee-track">
                {lyrics.map((lyric, i) => (
                    <span key={i} className={lyric === '•' ? '' : 'accent'}>
                        {lyric}
                    </span>
                ))}
                {lyrics.map((lyric, i) => (
                    <span key={`dup-${i}`} className={lyric === '•' ? '' : 'accent'}>
                        {lyric}
                    </span>
                ))}
            </div>
        </div>
    );
}
