import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/api';

const ProductForm = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        category: 'aros',
        material: 'Bronce',
        alt: '',
        claseImagen: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (product) {
            setFormData({
                nombre: product.nombre,
                precio: product.precio,
                category: product.categoria,
                material: product.material,
                alt: product.alt,
                claseImagen: product.claseImagen || ''
            });
            setPreview(`http://localhost:3001/${product.imagen}`);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-generate alt from name if empty
        if (name === 'nombre' && !formData.alt) {
            setFormData(prev => ({ ...prev, alt: value }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            if (product) {
                await updateProduct(product.id, data);
            } else {
                await createProduct(data);
            }
            onSave();
        } catch (error) {
            console.error("Failed to save product:", error);
            alert("Error saving product");
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white', padding: '2rem', borderRadius: '16px',
                width: '500px', maxHeight: '90vh', overflowY: 'auto'
            }}>
                <h2 className="card-title">{product ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    <label>
                        Name:
                        <input name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </label>

                    <label>
                        Price:
                        <input type="number" name="precio" value={formData.precio} onChange={handleChange} required min="1" />
                    </label>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <label style={{ flex: 1 }}>
                            Category:
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="aros">Aros</option>
                                <option value="collares">Collares</option>
                                <option value="anillos">Anillos</option>
                                <option value="pulseras">Pulseras</option>
                                <option value="accesorios">Accesorios</option>
                            </select>
                        </label>
                        <label style={{ flex: 1 }}>
                            Material:
                            <select name="material" value={formData.material} onChange={handleChange}>
                                <option value="Bronce">Bronce</option>
                                <option value="Alpaca">Alpaca</option>
                            </select>
                        </label>
                    </div>

                    <label>
                        Image:
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        {preview && (
                            <img src={preview} alt="Preview" style={{ marginTop: '0.5rem', maxHeight: '100px', objectFit: 'contain' }} />
                        )}
                    </label>

                    <label>
                        Alt Text:
                        <input name="alt" value={formData.alt} onChange={handleChange} required />
                    </label>

                    <label>
                        CSS Class (Optional):
                        <input name="claseImagen" value={formData.claseImagen} onChange={handleChange} placeholder="e.g. filter-contrast-low" />
                    </label>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1, backgroundColor: '#9ca3af' }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
