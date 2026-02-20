import React, { useState } from 'react';
import { deleteProduct } from '../services/api';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const ProductList = ({ products, onEdit, onDelete }) => {
    const [filterCategory, setFilterCategory] = useState('');
    const [filterSearch, setFilterSearch] = useState('');

    const filteredProducts = products.filter(p => {
        const matchesCategory = filterCategory ? p.categoria === filterCategory : true;
        const matchesSearch = p.nombre.toLowerCase().includes(filterSearch.toLowerCase()) ||
            p.material.toLowerCase().includes(filterSearch.toLowerCase()) ||
            p.categoria.toLowerCase().includes(filterSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexShrink: 0 }}>
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                    style={{ flex: 1 }}
                />
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{ flex: 0.5 }}
                >
                    <option value="">Todas las categorías</option>
                    <option value="aros">Aros</option>
                    <option value="collares">Collares</option>
                    <option value="anillos">Anillos</option>
                    <option value="pulseras">Pulseras</option>
                    <option value="accesorios">Accesorios</option>
                </select>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            <th>Material</th>
                            <th style={{ textAlign: 'right' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img
                                        src={`http://localhost:3001/${product.imagen}`}
                                        alt={product.alt}
                                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                                    />
                                </td>
                                <td style={{ fontWeight: 500 }}>{product.nombre}</td>
                                <td>${product.precio}</td>
                                <td style={{ textTransform: 'capitalize' }}>{product.categoria}</td>
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
                {filteredProducts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                        No se encontraron productos con esos filtros.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
