import React from 'react';
import { FiSearch, FiBell, FiSettings, FiUser } from 'react-icons/fi';

const TopBar = () => {
    return (
        <div className="top-bar">
            <div className="greeting">
                <h1>¡Hola, Fran!</h1>
                <p>Aquí podrás ver el resumen de tu inventario actual y las opciones de gestión.</p>
            </div>

            <div className="top-bar-actions">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--border-radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                    flex: '1 1 auto',
                    minWidth: '50px'
                }}>
                    <FiSearch color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        style={{ border: 'none', background: 'transparent', padding: 0, width: '100%' }}
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
