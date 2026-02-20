import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const Inventory = ({ products, refetch }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

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
        <div className="bento-card" style={{ minHeight: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 className="card-title" style={{ marginBottom: 0 }}>Inventario de Joyas</h2>
                <button className="btn btn-primary" onClick={handleAdd}>
                    + Registrar Producto
                </button>
            </div>

            <ProductList
                products={products}
                onEdit={handleEdit}
                onDelete={refetch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
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
