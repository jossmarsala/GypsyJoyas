import React from 'react';
import MetricCard from '../components/MetricCard';

const DashboardOverview = ({ products, loading }) => {
    if (loading) return <div style={{ padding: '2rem' }}>Cargando Panel...</div>;

    const totalProducts = products.length;
    const bronceProducts = products.filter(p => p.material.toLowerCase() === 'bronce').length;
    const alpacaProducts = products.filter(p => p.material.toLowerCase() === 'alpaca').length;
    const uniqueCategories = new Set(products.map(p => p.categoria)).size;

    return (
        <div className="bento-grid metrics-grid">
            <MetricCard
                title="Total de Productos:"
                value={totalProducts}
                label="Artículos en catálogo"
                bgColor="var(--bento-yellow)"
            />
            <MetricCard
                title="Bronce:"
                value={bronceProducts}
                label="Piezas disponibles"
                bgColor="var(--bento-pink)"
            />
            <MetricCard
                title="Alpaca:"
                value={alpacaProducts}
                label="Piezas disponibles"
                bgColor="var(--bento-blue)"
            />
            <MetricCard
                title="Categorías:"
                value={uniqueCategories}
                label="Líneas de producto"
                bgColor="var(--bento-green)"
            />
        </div>
    );
};

export default DashboardOverview;
