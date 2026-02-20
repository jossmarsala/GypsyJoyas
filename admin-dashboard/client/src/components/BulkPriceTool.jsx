import React, { useState } from 'react';
import { bulkUpdatePrice } from '../services/api';

const BulkPriceTool = ({ onUpdate }) => {
    const [percentage, setPercentage] = useState(0);
    const [category, setCategory] = useState('');
    const [material, setMaterial] = useState('');
    const [message, setMessage] = useState('');

    const handleApply = async () => {
        if (percentage === 0) return;
        if (!window.confirm(`Are you sure you want to change prices by ${percentage}%?`)) return;

        try {
            const res = await bulkUpdatePrice({
                percentage: parseFloat(percentage),
                category: category || undefined,
                material: material || undefined
            });
            setMessage(res.message);
            onUpdate();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setMessage('Error updating prices');
        }
    };

    return (
        <div>
            <h2 className="card-title">Bulk Price Tool</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input
                    type="number"
                    placeholder="Percentage (e.g. 10 or -5)"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="aros">Aros</option>
                    <option value="collares">Collares</option>
                    <option value="anillos">Anillos</option>
                    <option value="pulseras">Pulseras</option>
                    <option value="accesorios">Accesorios</option>
                </select>
                <select value={material} onChange={(e) => setMaterial(e.target.value)}>
                    <option value="">All Materials</option>
                    <option value="Bronce">Bronce</option>
                    <option value="Alpaca">Alpaca</option>
                </select>
                <button className="btn btn-secondary" onClick={handleApply}>
                    Apply Change
                </button>
                {message && <p style={{ fontSize: '0.8rem', color: 'green' }}>{message}</p>}
            </div>
        </div>
    );
};

export default BulkPriceTool;
