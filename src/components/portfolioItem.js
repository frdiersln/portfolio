import React from 'react';
import PropTypes from 'prop-types';
import { Link2 } from 'lucide-react';

import "../app/styles/portfolioItem.css";

const PortfolioItem = ({ title, description, link, videoPath }) => {
    return (
        <div className="portfolio-item">
            <h2 className='title'>{title}</h2>
            <div className="video-section">
                <video src={videoPath} />
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