'use client';

import Navbar from '@/components/Navbar';
import BuildingJourney from '@/components/BuildingJourney';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
    return (
        <>
            <CustomCursor />
            <Navbar />
            <BuildingJourney />
        </>
    );
}
