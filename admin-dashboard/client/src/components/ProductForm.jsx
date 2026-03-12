import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, getImageUrl } from '../services/api';

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
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            setPreview(getImageUrl(product.imagen));
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
            setIsSubmitting(true);
            if (product) {
                await updateProduct(product.id, data);
            } else {
                await createProduct(data);
            }
            onSave();
        } catch (error) {
            console.error("Error al guardar producto:", error);
            const message = error.response?.data?.error || error.message || "Error al procesar la solicitud.";
            alert(`Error: ${message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'var(--card-bg)',
                padding: '2rem',
                borderRadius: 'var(--border-radius-lg)',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-md)'
            }}>
                <h2 className="card-title">{product ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontWeight: 500 }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Nombre del producto</span>
                        <input name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </label>

                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontWeight: 500 }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Precio ($)</span>
                        <input type="number" name="precio" value={formData.precio} onChange={handleChange} required min="1" />
                    </label>

                    <div className="form-row">
                        <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', fontWeight: 500 }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Categoría</span>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="aros">Aros</option>
                                <option value="collares">Collares</option>
                                <option value="anillos">Anillos</option>
                                <option value="pulseras">Pulseras</option>
                                <option value="accesorios">Accesorios</option>
                            </select>
                        </label>
                        <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', fontWeight: 500 }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Material</span>
                            <select name="material" value={formData.material} onChange={handleChange}>
                                <option value="Bronce">Bronce</option>
                                <option value="Alpaca">Alpaca</option>
                                <option value="Cobre">Cobre</option>
                            </select>
                        </label>
                    </div>

                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontWeight: 500 }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Imagen</span>
                        <input type="file" onChange={handleImageChange} accept="image/*" style={{ padding: '0.5rem', border: '1px dashed #d1d5db', background: 'transparent' }} />
                        {preview && (
                            <img src={preview} alt="Vista previa" style={{ marginTop: '0.5rem', maxHeight: '120px', objectFit: 'contain', borderRadius: '8px' }} />
                        )}
                    </label>

                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontWeight: 500 }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Texto Alternativo (SEO)</span>
                        <input name="alt" value={formData.alt} onChange={handleChange} required />
                    </label>

                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontWeight: 500 }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Clase CSS (Opcional)</span>
                        <input name="claseImagen" value={formData.claseImagen} onChange={handleChange} placeholder="ej. filter-contrast-low" />
                    </label>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={isSubmitting}>
                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }} disabled={isSubmitting}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
