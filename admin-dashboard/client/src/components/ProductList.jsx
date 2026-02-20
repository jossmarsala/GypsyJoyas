import React, { useState } from 'react';
import { deleteProduct, BASE_URL } from '../services/api';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const ProductList = ({ products, onEdit, onDelete, onAdd, viewMode = 'grid', sortBy = 'recent', setSortBy, isCompact = false }) => {
    const [filterCategory, setFilterCategory] = useState('');
    const [filterSearch, setFilterSearch] = useState('');

    const filteredProducts = products.filter(p => {
        const matchesCategory = filterCategory ? p.categoria === filterCategory : true;
        const matchesSearch = p.nombre.toLowerCase().includes(filterSearch.toLowerCase()) ||
            p.material.toLowerCase().includes(filterSearch.toLowerCase()) ||
            p.categoria.toLowerCase().includes(filterSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    let finalProducts = [...filteredProducts];
    if (sortBy === 'name_asc') {
        finalProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (sortBy === 'price_asc') {
        finalProducts.sort((a, b) => a.precio - b.precio);
    } else if (sortBy === 'price_desc') {
        finalProducts.sort((a, b) => b.precio - a.precio);
    }

    const handleDelete = async (id) => {
        if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
            try {
                await deleteProduct(id);
                onDelete(); // Refresh list
            } catch (error) {
                console.error("Error al eliminar producto:", error);
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, position: 'relative', width: '100%', minWidth: 0, maxWidth: '100%' }}>
            {/* Filter and Sort Row */}
            {!isCompact && (
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexShrink: 0, flexWrap: 'wrap', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={filterSearch}
                        onChange={(e) => setFilterSearch(e.target.value)}
                        style={{ flex: 1, minWidth: '200px' }}
                    />

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            style={{ minWidth: '150px' }}
                        >
                            <option value="">Todas las categorías</option>
                            <option value="aros">Aros</option>
                            <option value="collares">Collares</option>
                            <option value="anillos">Anillos</option>
                            <option value="pulseras">Pulseras</option>
                            <option value="accesorios">Accesorios</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy && setSortBy(e.target.value)}
                            style={{ minWidth: '160px' }}
                        >
                            <option value="recent">Más recientes</option>
                            <option value="name_asc">Nombre (A-Z)</option>
                            <option value="price_asc">Menor precio</option>
                            <option value="price_desc">Mayor precio</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="product-list-container" style={{ flex: 1, overflowY: 'scroll', paddingBottom: '1rem', width: '100%', minWidth: 0, maxWidth: '100%' }}>
                {finalProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                        No se encontraron productos con esos filtros.
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="products-grid">
                        {finalProducts.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-card-img-container">
                                    <img
                                        src={`${BASE_URL}/${product.imagen}`}
                                        alt={product.nombre}
                                        className="product-card-img"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
                                    />
                                    <span
                                        className="badge product-card-badge"
                                        style={{
                                            backgroundColor: product.material === 'Bronce' ? 'var(--bento-yellow)' : 'var(--secondary-color)',
                                            color: product.material === 'Bronce' ? '#b45309' : 'var(--text-main)'
                                        }}
                                    >
                                        {product.material}
                                    </span>
                                </div>
                                <div className="product-card-content">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <div>
                                            <h3 className="product-card-title">{product.nombre}</h3>
                                            <p className="product-card-category" style={{ textTransform: 'capitalize' }}>{product.categoria}</p>
                                        </div>
                                        <p className="product-card-price">${product.precio}</p>
                                    </div>
                                    <div className="product-card-actions">
                                        <button className="btn-icon" onClick={() => onEdit(product)} title="Editar"><FiEdit2 /></button>
                                        <button className="btn-icon" style={{ color: '#ef4444' }} onClick={() => handleDelete(product.id)} title="Eliminar"><FiTrash2 /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '80px' }}>Imagen</th>
                                    <th>Producto</th>
                                    <th style={{ width: '120px' }}>Precio</th>
                                    {!isCompact && <th style={{ width: '150px' }}>Categoría</th>}
                                    {!isCompact && <th style={{ width: '120px' }}>Material</th>}
                                    <th style={{ width: '100px', textAlign: 'right' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {finalProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>
                                            <img
                                                src={`${BASE_URL}/${product.imagen}`}
                                                alt={product.nombre}
                                                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                                            />
                                        </td>
                                        <td style={{ fontWeight: 500 }}>{product.nombre}</td>
                                        <td>${product.precio}</td>
                                        {!isCompact && <td style={{ textTransform: 'capitalize' }}>{product.categoria}</td>}
                                        {!isCompact && (
                                            <td>
                                                <span
                                                    className="badge"
                                                    style={{
                                                        backgroundColor: product.material === 'Bronce' ? 'var(--bento-yellow)' : 'var(--secondary-color)',
                                                        color: product.material === 'Bronce' ? '#b45309' : 'var(--text-main)'
                                                    }}
                                                >
                                                    {product.material}
                                                </span>
                                            </td>
                                        )}
                                        <td style={{ textAlign: 'right' }}>
                                            <button
                                                className="btn-icon"
                                                title="Editar"
                                                onClick={() => onEdit(product)}
                                            ><FiEdit2 /></button>
                                            <button
                                                className="btn-icon"
                                                style={{ color: '#ef4444' }}
                                                title="Eliminar"
                                                onClick={() => handleDelete(product.id)}
                                            ><FiTrash2 /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Floating Action Button */}
            {onAdd && (
                <button
                    className="btn btn-primary"
                    onClick={onAdd}
                    style={{
                        position: 'absolute',
                        bottom: '2rem',
                        right: '0.5rem',
                        padding: '1rem 1.5rem',
                        borderRadius: '9999px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        zIndex: 10,
                        fontWeight: 600
                    }}
                >
                    + Registrar Producto
                </button>
            )}
        </div>
    );
};

export default ProductList;
