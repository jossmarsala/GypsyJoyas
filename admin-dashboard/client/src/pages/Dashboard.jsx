import React, { useEffect, useState } from 'react';
import { getProducts, getMaintenanceMode, toggleMaintenanceMode } from '../services/api';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import BulkPriceTool from '../components/BulkPriceTool';
import SettingsCard from '../components/SettingsCard';
import MetricCard from '../components/MetricCard';
import TopBar from '../components/TopBar';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const fetchData = async () => {
        try {
            const [productsData, settingsData] = await Promise.all([
                getProducts(),
                getMaintenanceMode()
            ]);
            setProducts(productsData);
            setMaintenanceMode(settingsData.maintenanceMode);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
        fetchData(); // Refresh list
    };

    const handleToggleMaintenance = async () => {
        try {
            const res = await toggleMaintenanceMode();
            setMaintenanceMode(res.maintenanceMode);
        } catch (error) {
            console.error("Failed to toggle maintenance:", error);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Cargando Panel...</div>;

    const totalProducts = products.length;
    const bronceProducts = products.filter(p => p.material.toLowerCase() === 'bronce').length;
    const alpacaProducts = products.filter(p => p.material.toLowerCase() === 'alpaca').length;
    const uniqueCategories = new Set(products.map(p => p.categoria)).size;

    return (
        <>
            <TopBar />

            <div className="bento-grid">
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

            <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="bento-card" style={{ gridColumn: 'span 2', minHeight: '500px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 className="card-title" style={{ marginBottom: 0 }}>Inventario de Joyas</h2>
                        <button className="btn btn-primary" onClick={handleAdd}>
                            + Registrar Producto
                        </button>
                    </div>
                    <ProductList products={products} onEdit={handleEdit} onDelete={fetchData} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="bento-card">
                        <SettingsCard
                            maintenanceMode={maintenanceMode}
                            onToggle={handleToggleMaintenance}
                        />
                    </div>

                    <div className="bento-card">
                        <BulkPriceTool onUpdate={fetchData} />
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

export default Dashboard;
