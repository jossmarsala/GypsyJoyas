import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { FiGrid, FiList } from 'react-icons/fi';

const Inventory = ({ products, refetch }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // View controls
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('recent');

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
        <div className="bento-card" style={{ height: 'calc(100vh - 120px)', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', flexShrink: 0 }}>
                <h2 className="card-title" style={{ marginBottom: 0 }}>Inventario de Joyas</h2>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>

                    <div style={{ display: 'flex', background: 'var(--secondary-color)', borderRadius: '8px', padding: '4px' }}>
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

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ padding: '0.4rem 0.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none', background: 'white' }}
                    >
                        <option value="recent">Más recientes</option>
                        <option value="name_asc">Nombre (A-Z)</option>
                        <option value="price_asc">Menor precio</option>
                        <option value="price_desc">Mayor precio</option>
                    </select>

                    <button className="btn btn-primary" onClick={handleAdd}>
                        + Registrar Producto
                    </button>
                </div>
            </div>

            <ProductList
                products={products}
                onEdit={handleEdit}
                onDelete={refetch}
                viewMode={viewMode}
                sortBy={sortBy}
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
