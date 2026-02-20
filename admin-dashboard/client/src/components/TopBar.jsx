import React from 'react';
import { FiSearch, FiBell, FiSettings, FiUser } from 'react-icons/fi';

const TopBar = () => {
    return (
        <div className="top-bar">
            <div className="greeting">
                <h1>Buenos días, Equipo</h1>
                <p>Aquí tienen el resumen del inventario actual y las opciones de gestión.</p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--border-radius-lg)',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    <FiSearch color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        style={{ border: 'none', background: 'transparent', padding: 0, width: '150px' }}
                    />
                </div>

                <button className="btn-icon" style={{ background: 'var(--primary-color)', color: 'white' }}>
                    <FiUser size={20} />
                </button>
                <button className="btn-icon" style={{ background: 'var(--primary-color)', color: 'white' }}>
                    <FiBell size={20} />
                </button>
                <button className="btn-icon" style={{ background: 'var(--primary-color)', color: 'white' }}>
                    <FiSettings size={20} />
                </button>
            </div>
        </div>
    );
};

export default TopBar;
