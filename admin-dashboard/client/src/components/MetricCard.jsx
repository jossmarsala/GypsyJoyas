import React from 'react';

const MetricCard = ({ title, value, label, bgColor }) => {
    return (
        <div className="metric-card" style={{ backgroundColor: bgColor }}>
            <div>
                <h3>{title}</h3>
                <p className="metric-value">{value}</p>
            </div>
            {label && <p className="metric-label">{label}</p>}
        </div>
    );
};

export default MetricCard;
