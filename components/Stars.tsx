
import React, { useEffect, useState } from 'react';

const Stars: React.FC = () => {
    const [stars, setStars] = useState<{ id: number; style: React.CSSProperties }[]>([]);

    useEffect(() => {
        const starCount = 50;
        const newStars = Array.from({ length: starCount }).map((_, i) => ({
            id: i,
            style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
            },
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="stars-container">
            {stars.map((star) => (
                <div key={star.id} className="star" style={star.style} />
            ))}
        </div>
    );
};

export default Stars;
