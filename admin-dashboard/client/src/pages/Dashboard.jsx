import React, { useEffect, useState } from 'react';
import { getProducts, getMaintenanceMode, toggleMaintenanceMode } from '../services/api';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import BulkPriceTool from '../components/BulkPriceTool';
import SettingsCard from '../components/SettingsCard';
import StatsCard from '../components/StatsCard';

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

    if (loading) return <div style={{ padding: '2rem' }}>Loading Dashboard...</div>;

    return (
        <div className="bento-grid">
            <StatsCard products={products} className="col-span-4" />

            <div className="bento-card col-span-3 row-span-2" style={{ minHeight: '600px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 className="card-title">Product Catalog</h2>
                    <button className="btn btn-primary" onClick={handleAdd}>+ Add Product</button>
                </div>
                <ProductList products={products} onEdit={handleEdit} onDelete={fetchData} />
            </div>

            <div className="bento-card col-span-1">
                <SettingsCard
                    maintenanceMode={maintenanceMode}
                    onToggle={handleToggleMaintenance}
                />
            </div>

            <div className="bento-card col-span-1">
                <BulkPriceTool onUpdate={fetchData} />
            </div>

            {isFormOpen && (
                <ProductForm
                    product={selectedProduct}
                    onClose={handleCloseForm}
                    onSave={handleCloseForm}
                />
            )}
        </div>
    );
};

export default Dashboard;
