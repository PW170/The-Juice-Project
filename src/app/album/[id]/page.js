import Image from 'next/image';
import Link from 'next/link';
import CustomCursor from '@/components/CustomCursor';

export const albumsData = [
    { id: 'gbgr', className: 'art-gbgr', image: '/images/gbgr.jpg', abbr: 'GB&GR', title: 'Goodbye & Good Riddance', year: '2018' },
    { id: 'drfl', className: 'art-drfl', image: '/images/drfl.jpg', abbr: 'DRFL', title: 'Death Race for Love', year: '2019' },
    { id: 'lnd', className: 'art-lnd', image: '/images/lnd.jpg', abbr: 'LND', title: 'Legends Never Die', year: '2020' },
    { id: 'fd', className: 'art-fd', image: '/images/fd.jpg', abbr: 'FD', title: 'Fighting Demons', year: '2021' },
];

// Track data for each album
const tracklists = {
    'gbgr': [
        "Intro", "All Girls Are the Same", "Lucid Dreams", "Wasted (feat. Lil Uzi Vert)",
        "Armed and Dangerous", "Black & White", "Lean Wit Me", "I'll Be Fine",
        "Used To", "Candles", "Scared of Love", "Hurt Me", "I'm Still",
        "End of the Road", "Long Gone"
    ],
    'drfl': [
        "Empty", "Maze", "HeMotions", "Demonz (feat. Brent Faiyaz)", "Fast",
        "Hear Me Calling", "Syphilis", "Who Shot Cupid?", "Ring Ring (feat. Clever)",
        "Flaws and Sins", "Feeling", "Robbery", "10 Feet", "Out My Way",
        "The Bees Knees", "ON GOD (feat. Young Thug)", "1400 / 999 Freestyle",
        "Make Believe"
    ],
    'lnd': [
        "Anxiety - Intro", "Conversations", "Titanic", "Bad Energy",
        "Righteous", "Blood On My Jeans", "Smile (with The Weeknd)",
        "Tell Me U Luv Me (with Trippie Redd)", "Hate The Other Side",
        "Get Through It - Interlude", "Life's A Mess", "Come & Go",
        "I Want It", "Fighting Demons", "Wishing Well", "Screw Juice",
        "Up Up And Away", "The Man, The Myth, The Legend - Interlude", "Stay High"
    ],
    'fd': [
        "Burn", "Already Dead", "You Wouldn't Understand", "Wandered To LA (with Justin Bieber)",
        "Eminem Speaks", "Rockstar In His Prime", "Doom", "Go Hard",
        "Juice WRLD Speaks", "Not Enough", "From My Window", "Relocate",
        "Juice WRLD Speaks 2", "Until The Plug Comes Back Around", "Feline",
        "Girls Of Troy - Outro", "Feel Alone", "My Life In A Nutshell"
    ]
};

// Next 15 Dynamic Routing configuration
export async function generateStaticParams() {
    return albumsData.map((album) => ({
        id: album.id,
    }));
}

export default async function AlbumPage({ params }) {
    // Next 15 requires params to be awaited
    const { id } = await params;
    const album = albumsData.find(a => a.id === id);
    const tracks = tracklists[id] || [];

    if (!album) {
        return <div className="album-page-error">Album not found!</div>;
    }

    return (
        <main className="album-page">
            <CustomCursor />
            <Link href="/" className="back-button">
                <span>&#8592;</span> BACK TO DESCENT
            </Link>

            <div className="album-content-wrapper">
                {/* LEFT COLUMN: Sticking Player Context */}
                <div className="album-left-panel">
                    <div className="album-hero-cover">
                        <Image
                            src={album.image}
                            alt={album.title}
                            fill
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    {/* Dummy Playback Controls */}
                    <div className="playback-controls">
                        <div className="playback-header">
                            <div>
                                <h3>{album.title}</h3>
                                <p>Juice WRLD</p>
                            </div>
                            <span className="more-btn">•••</span>
                        </div>


                    </div>
                </div>

                {/* RIGHT COLUMN: Scrolling Tracklist */}
                <div className="album-right-panel">
                    <ul className="tracklist-am">
                        {tracks.map((track, index) => (
                            <li key={index} className="track-item-am">
                                <span className="track-name-am">{track}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
