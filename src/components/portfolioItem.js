"use client"
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link2, Play, Pause } from 'lucide-react';

import "../app/styles/portfolioItem.css";

const PortfolioItem = ({ title, description, link, videoPath }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const checkVideoLoaded = () => {
        if (videoRef.current && videoRef.current.readyState >= 3) {
            setIsLoaded(true);
        }
    };

    // Add this new effect to check video loading status
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('loadeddata', checkVideoLoaded);
            video.addEventListener('canplay', checkVideoLoaded);
            
            // Check initial state
            checkVideoLoaded();
        }

        return () => {
            if (video) {
                video.removeEventListener('loadeddata', checkVideoLoaded);
                video.removeEventListener('canplay', checkVideoLoaded);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const handleLoadedData = () => {
        setIsLoaded(true);
    };

    return (
        <div 
        className="portfolio-item"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
            <h2 className='title'>{title}</h2>
            <div className="video-section">
                <video 
                ref={videoRef}
                src={videoPath}
                muted  
                loop   
                playsInline // Better mobile support
                loading="lazy"
                preload="metadata"
                onLoadedData={handleLoadedData}
                />
                {!isLoaded && (
                    <div className="video-placeholder">
                        Loading...
                    </div>
                )}
                <div className="video-indicator">
                    {isPlaying ? <Play size={24} /> : <Pause size={24} />}
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <Link2 size={19}/> {link} 
                </a>
            </div>
            <p className='description'>{description}</p>
        </div>
    );
};

PortfolioItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    videoPath: PropTypes.string.isRequired,
};

export default PortfolioItem;