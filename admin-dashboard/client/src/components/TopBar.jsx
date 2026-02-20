import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiBell, FiSettings, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TopBar = ({ searchQuery, setSearchQuery }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    return (
        <div className="top-bar">
            <div className="greeting">
                <h1>¡Hola, Fran!</h1>
                <p>Aquí podrás ver el resumen de tu inventario actual y las opciones de gestión.</p>
            </div>

            <div className="top-bar-actions" ref={dropdownRef}>
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ border: 'none', background: 'transparent', padding: 0, width: '100%' }}
                    />
                </div>

                <div className="dropdown-container">
                    <button
                        className={`btn-icon ${openDropdown === 'profile' ? 'active' : ''}`}
                        style={{ background: 'var(--primary-color)', color: 'white' }}
                        onClick={() => toggleDropdown('profile')}
                    >
                        <FiUser size={20} />
                    </button>
                    {openDropdown === 'profile' && (
                        <div className="dropdown-menu">
                            <div className="dropdown-header">
                                <strong>Fran Manager</strong>
                                <span>Administrador</span>
                            </div>
                            <div className="dropdown-divider"></div>
                            <Link to="/ajustes" className="dropdown-item disabled-link" onClick={(e) => e.preventDefault()}>Mi Perfil</Link>
                            <button className="dropdown-item text-danger disabled-link">Cerrar sesión</button>
                        </div>
                    )}
                </div>

                <div className="dropdown-container">
                    <button
                        className={`btn-icon ${openDropdown === 'notifications' ? 'active' : ''}`}
                        style={{ background: 'var(--primary-color)', color: 'white' }}
                        onClick={() => toggleDropdown('notifications')}
                    >
                        <FiBell size={20} />
                        <span className="notification-dot"></span>
                    </button>
                    {openDropdown === 'notifications' && (
                        <div className="dropdown-menu">
                            <div className="dropdown-header">
                                <strong>Notificaciones</strong>
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item notif-item">
                                <span className="notif-dot bg-green"></span>
                                <div>
                                    <p>Catálogo actualizado</p>
                                    <small>Hace 5 min</small>
                                </div>
                            </div>
                            <div className="dropdown-item notif-item">
                                <span className="notif-dot bg-red"></span>
                                <div>
                                    <p>Mantenimiento desactivado</p>
                                    <small>Hace 2 horas</small>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button className="btn-icon disabled-link" style={{ background: 'var(--primary-color)', color: 'white' }}>
                    <FiSettings size={20} />
                </button>
            </div>
        </div>
    );
};

export default TopBar;
