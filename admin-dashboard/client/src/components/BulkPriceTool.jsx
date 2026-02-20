import React, { useState } from 'react';
import { bulkUpdatePrice } from '../services/api';

const BulkPriceTool = ({ onUpdate }) => {
    const [percentage, setPercentage] = useState(0);
    const [category, setCategory] = useState('');
    const [material, setMaterial] = useState('');
    const [message, setMessage] = useState('');

    const handleApply = async () => {
        if (percentage === 0) return;
        if (!window.confirm(`¿Seguro que deseas modificar los precios en un ${percentage}%?`)) return;

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
            setMessage('Error al actualizar precios');
        }
    };

    return (
        <div>
            <h2 className="card-title">Actualización masiva de precios</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input
                    type="number"
                    placeholder="Porcentaje (ej. 10 o -5)"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Todas las categorías</option>
                    <option value="aros">Aros</option>
                    <option value="collares">Collares</option>
                    <option value="anillos">Anillos</option>
                    <option value="pulseras">Pulseras</option>
                    <option value="accesorios">Accesorios</option>
                </select>
                <select value={material} onChange={(e) => setMaterial(e.target.value)}>
                    <option value="">Todos los materiales</option>
                    <option value="Bronce">Bronce</option>
                    <option value="Alpaca">Alpaca</option>
                </select>
                <button className="btn btn-secondary" onClick={handleApply}>
                    Aplicar
                </button>
                {message && <p style={{ fontSize: '0.85rem', color: '#16a34a', marginTop: '0.25rem' }}>{message}</p>}
            </div>
        </div>
    );
};

export default BulkPriceTool;
