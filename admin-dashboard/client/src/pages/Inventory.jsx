import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import Loader from '../components/Loader';
import { FiGrid, FiList } from 'react-icons/fi';

const Inventory = ({ products, refetch, loading }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // View controls
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('recent');

    if (loading) return <Loader />;

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

    return (
        <div className="bento-card" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', minWidth: 0, maxWidth: '100%', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', flexShrink: 0 }}>
                <h2 className="card-title" style={{ marginBottom: 0, fontSize: '1.25rem' }}>Inventario de Joyas</h2>

                <div className="inventory-controls" style={{ display: 'flex', background: 'var(--secondary-color)', borderRadius: '8px', padding: '4px' }}>
                    <button
                        className="btn-icon"
                        style={{ background: viewMode === 'grid' ? 'white' : 'transparent', boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none', borderRadius: '4px', padding: '6px' }}
                        onClick={() => setViewMode('grid')}
                        title="Vista Cuadrícula"
                    >
                        <FiGrid size={18} />
                    </button>
                    <button
                        className="btn-icon"
                        style={{ background: viewMode === 'list' ? 'white' : 'transparent', boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none', borderRadius: '4px', padding: '6px' }}
                        onClick={() => setViewMode('list')}
                        title="Vista Lista"
                    >
                        <FiList size={18} />
                    </button>
                </div>
            </div>

            <ProductList
                products={products}
                onEdit={handleEdit}
                onDelete={refetch}
                onAdd={handleAdd}
                viewMode={viewMode}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

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

export default Inventory;
