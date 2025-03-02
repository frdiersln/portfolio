"use client"
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link2 } from 'lucide-react';

import "../app/styles/portfolioItem.css";

const PortfolioItem = ({ title, description, link, videoPath }) => {
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div className="portfolio-item">
            <h2 className='title'>{title}</h2>
            <div className="video-section"
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
            >
                <video 
                ref={videoRef}
                src={videoPath}
                muted  
                loop   
                playsInline // Better mobile support
                />
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