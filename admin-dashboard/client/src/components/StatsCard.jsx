import React from 'react';

const StatsCard = ({ products, className }) => {
    const total = products.length;
    const bronce = products.filter(p => p.material.toLowerCase() === 'bronce').length;
    const alpaca = products.filter(p => p.material.toLowerCase() === 'alpaca').length;

    return (
        <div className={`bento-card ${className}`} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '2rem', margin: 0, color: 'var(--primary-color)' }}>{total}</h3>
                <p style={{ margin: 0, color: '#666' }}>Total Products</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '2rem', margin: 0, color: 'var(--ocre)' }}>{bronce}</h3>
                <p style={{ margin: 0, color: '#666' }}>Bronce Items</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '2rem', margin: 0, color: '#9ca3af' }}>{alpaca}</h3>
                <p style={{ margin: 0, color: '#666' }}>Alpaca Items</p>
            </div>
        </div>
    );
};

export default StatsCard;
