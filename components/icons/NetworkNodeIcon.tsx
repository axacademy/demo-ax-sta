
import React from 'react';

export const NetworkNodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        {/* Concentric Circles */}
        <circle cx="200" cy="200" r="100" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"/>
        <circle cx="200" cy="200" r="140" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"/>
        <circle cx="200" cy="200" r="180" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"/>

        {/* Lines */}
        <path d="M200 200 L 100 100" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M200 200 L 290 60" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M200 200 L 340 160" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M200 200 L 300 300" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M200 200 L 120 340" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M200 200 L 60 250" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M100 100 L 60 50" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M100 100 L 290 60" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M340 160 L 380 120" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M300 300 L 350 350" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M120 340 L 60 350" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5"/>

        {/* Nodes */}
        <circle cx="200" cy="200" r="6" fill="#06b6d4" stroke="#06b6d4" filter="url(#glow)"/>
        <circle cx="100" cy="100" r="4" fill="currentColor" fillOpacity="0.8"/>
        <circle cx="290" cy="60" r="4" fill="currentColor" fillOpacity="0.8"/>
        <circle cx="340" cy="160" r="4" fill="currentColor" fillOpacity="0.8"/>
        <circle cx="300" cy="300" r="4" fill="currentColor" fillOpacity="0.8"/>
        <circle cx="120" cy="340" r="4" fill="currentColor" fillOpacity="0.8"/>
        <circle cx="60" cy="250" r="4" fill="currentColor" fillOpacity="0.8"/>
        <circle cx="60" cy="50" r="3" fill="currentColor" fillOpacity="0.6"/>
        <circle cx="380" cy="120" r="3" fill="currentColor" fillOpacity="0.6"/>
        <circle cx="350" cy="350" r="3" fill="currentColor" fillOpacity="0.6"/>
        <circle cx="60" cy="350" r="3" fill="currentColor" fillOpacity="0.6"/>
    </svg>
);
