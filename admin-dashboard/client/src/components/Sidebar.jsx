import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBox, FiSettings, FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                GypsyJoyas
            </div>

            <nav className="sidebar-nav">
                <Link
                    to="/"
                    className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
                    style={{ textDecoration: 'none' }}
                >
                    <FiHome size={20} />
                    <span>Resumen</span>
                </Link>

                <div className={`nav-item ${location.pathname === '/inventario' ? 'active' : ''}`}>
                    <FiBox size={20} />
                    <span>Inventario</span>
                </div>

                <div className={`nav-item ${location.pathname === '/ajustes' ? 'active' : ''}`}>
                    <FiSettings size={20} />
                    <span>Ajustes</span>
                </div>
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="nav-item">
                    <FiLogOut size={20} />
                    <span>Cerrar sesión</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
