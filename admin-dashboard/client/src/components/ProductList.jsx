import React, { useState } from 'react';
import { deleteProduct } from '../services/api';

const ProductList = ({ products, onEdit, onDelete }) => {
    const [filterCategory, setFilterCategory] = useState('');
    const [filterSearch, setFilterSearch] = useState('');

    const filteredProducts = products.filter(p => {
        const matchesCategory = filterCategory ? p.categoria === filterCategory : true;
        const matchesSearch = p.nombre.toLowerCase().includes(filterSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                onDelete(); // Refresh list
            } catch (error) {
                console.error("Failed to delete product:", error);
            }
        }
    };

    return (
        <div style={{ height: 'calc(100% - 60px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                    style={{ flex: 1 }}
                />
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{ flex: 0.5 }}
                >
                    <option value="">All Categories</option>
                    <option value="aros">Aros</option>
                    <option value="collares">Collares</option>
                    <option value="anillos">Anillos</option>
                    <option value="pulseras">Pulseras</option>
                    <option value="accesorios">Accesorios</option>
                </select>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                            <th style={{ padding: '0.5rem' }}>Image</th>
                            <th style={{ padding: '0.5rem' }}>Name</th>
                            <th style={{ padding: '0.5rem' }}>Price</th>
                            <th style={{ padding: '0.5rem' }}>Category</th>
                            <th style={{ padding: '0.5rem' }}>Material</th>
                            <th style={{ padding: '0.5rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '0.5rem' }}>
                                    <img
                                        src={`http://localhost:3001/${product.imagen}`}
                                        alt={product.alt}
                                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                                    />
                                </td>
                                <td style={{ padding: '0.5rem' }}>{product.nombre}</td>
                                <td style={{ padding: '0.5rem' }}>${product.precio}</td>
                                <td style={{ padding: '0.5rem' }}>{product.categoria}</td>
                                <td style={{ padding: '0.5rem' }}>
                                    <span style={{
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontSize: '0.8rem',
                                        backgroundColor: product.material === 'Bronce' ? '#fcd34d' : '#e5e7eb',
                                        color: '#333'
                                    }}>
                                        {product.material}
                                    </span>
                                </td>
                                <td style={{ padding: '0.5rem' }}>
                                    <button
                                        style={{ marginRight: '0.5rem', color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}
                                        onClick={() => onEdit(product)}
                                    >Edit</button>
                                    <button
                                        style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                                        onClick={() => handleDelete(product.id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
