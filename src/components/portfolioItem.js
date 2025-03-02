"use client"
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link2, Play, Pause } from 'lucide-react';

import "../app/styles/portfolioItem.css";

const PortfolioItem = ({ title, description, link, videoPath }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

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
                />
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