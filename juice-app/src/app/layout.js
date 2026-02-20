import './globals.css';
import MusicPlayer from '@/components/MusicPlayer';

export const metadata = {
    title: 'Juice WRLD | Legends Never Die',
    description: 'A premium tribute to Juice WRLD — rapper, singer, and legend. Explore his biography, discography, and gallery.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                {children}
                <MusicPlayer />
            </body>
        </html>
    );
}
