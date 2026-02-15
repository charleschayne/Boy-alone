'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import OrbitImages from '../../components/OrbitImages';

const images = [
    '/assets/6.png',
    '/assets/7.png',
    '/assets/8.png',
    '/assets/9.png',
    '/assets/10.png',
    '/assets/11.png',
    '/assets/12.png',
    '/assets/13.png'
];

const AboutPage = () => {
    const [typedText, setTypedText] = useState('');
    const fullText = "We exist in the quiet moments. The spaces between the noise. Boy Alone is not just about solitude; it's about the strength found in standing on your own. We craft garments for those who walk their own path, establishing a dialogue between the individual and the world. Quality, silence, and presence. This is why we do what we do.";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullText.slice(0, i + 1));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 40); // Slightly slower typing speed for impact

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />

            <div className="flex-grow flex flex-col items-center justify-center px-8 md:px-24 py-24">
                <div className="mb-12 w-full max-w-[800px] h-[300px] flex items-center justify-center relative">
                    <OrbitImages
                        images={images}
                        shape="ellipse"
                        radiusX={340}
                        radiusY={80}
                        rotation={-8}
                        duration={30}
                        itemSize={80}
                        responsive={true}
                        radius={160}
                        direction="normal"
                        fill
                        showPath={true}
                        pathColor="rgba(0,0,0,0.1)"
                        pathWidth={2}
                        paused={false}
                        baseWidth={800} // Adjusted for container
                    />
                </div>

                <div className="max-w-3xl text-center">
                    <h1 className="text-sm md:text-base font-bold tracking-widest uppercase mb-8 text-gray-500">
                        Our Story
                    </h1>

                    <p className="text-xl md:text-3xl leading-relaxed md:leading-relaxed font-light text-left">
                        {typedText}
                        <span className="animate-pulse inline-block w-2 h-6 md:h-8 bg-black ml-1 align-middle"></span>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default AboutPage;
