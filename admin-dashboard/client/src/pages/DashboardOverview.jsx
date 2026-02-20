import React, { useState } from 'react';
import MetricCard from '../components/MetricCard';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import SettingsCard from '../components/SettingsCard';
import BulkPriceTool from '../components/BulkPriceTool';
import { toggleMaintenanceMode } from '../services/api';

const DashboardOverview = ({ products, loading, refetch, maintenanceMode, setMaintenanceMode, addNotification }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    if (loading) return <div style={{ padding: '2rem' }}>Cargando Panel...</div>;

    const totalProducts = products.length;
    const bronceProducts = products.filter(p => p.material.toLowerCase() === 'bronce').length;
    const alpacaProducts = products.filter(p => p.material.toLowerCase() === 'alpaca').length;
    const uniqueCategories = new Set(products.map(p => p.categoria)).size;

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setSelectedProduct(null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedProduct(null);
        refetch(); // Refresh list after edit/add
    };

    const handleToggleMaintenance = async () => {
        try {
            const res = await toggleMaintenanceMode();
            setMaintenanceMode(res.maintenanceMode);

            // Trigger Notification
            const statusText = res.maintenanceMode ? 'Mantenimiento activado' : 'Mantenimiento desactivado';
            const statusType = res.maintenanceMode ? 'warning' : 'success';
            addNotification(statusType, statusText);

        } catch (error) {
            console.error("Failed to toggle maintenance:", error);
            addNotification('error', 'Error al cambiar mantenimiento');
        }
    };

    return (
        <>
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

            <div className="bento-grid dashboard-bottom-grid">
                <div className="bento-card dashboard-main-card" style={{ height: '480px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', flexShrink: 0 }}>
                        <h2 className="card-title" style={{ marginBottom: 0 }}>Inventario de Joyas</h2>
                        <button className="btn btn-primary" onClick={handleAdd}>
                            + Registrar Producto
                        </button>
                    </div>

                    <ProductList
                        products={products}
                        onEdit={handleEdit}
                        onDelete={refetch}
                        viewMode="list"
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="bento-card">
                        <SettingsCard
                            maintenanceMode={maintenanceMode}
                            onToggle={handleToggleMaintenance}
                        />
                    </div>
                    <div className="bento-card">
                        <BulkPriceTool onUpdate={refetch} />
                    </div>
                </div>
            </div>

            {isFormOpen && (
                <ProductForm
                    product={selectedProduct}
                    onClose={handleCloseForm}
                    onSave={handleCloseForm}
                />
            )}
        </>
    );
};

export default DashboardOverview;
