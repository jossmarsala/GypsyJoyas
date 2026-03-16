import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiBell, FiSettings, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TopBar = ({ notifications = [] }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('admin_user') || '{"name": "Admin"}');

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.reload();
    };

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
                <h1>¡Hola, {user.name.split(' ')[0]}!</h1>
                <p>Aquí podrás ver el resumen de tu inventario actual y las opciones de gestión.</p>
            </div>

            <div className="top-bar-actions" ref={dropdownRef}>

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
                                <strong>{user.name}</strong>
                                <span>Administrador</span>
                            </div>
                            <div className="dropdown-divider"></div>
                            <Link to="/ajustes" className="dropdown-item">Ajustes</Link>
                            <button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar sesión</button>
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
                        {notifications.length > 0 && <span className="notification-dot"></span>}
                    </button>
                    {openDropdown === 'notifications' && (
                        <div className="dropdown-menu">
                            <div className="dropdown-header">
                                <strong>Notificaciones</strong>
                            </div>
                            <div className="dropdown-divider"></div>
                            {notifications.length === 0 ? (
                                <div className="dropdown-item notif-item" style={{ justifyContent: 'center', opacity: 0.7 }}>
                                    <small>No hay notificaciones</small>
                                </div>
                            ) : (
                                notifications.map(notif => (
                                    <div key={notif.id} className="dropdown-item notif-item">
                                        <span className={`notif-dot bg-${notif.type === 'success' ? 'green' : notif.type === 'warning' ? 'yellow' : notif.type === 'error' ? 'red' : 'blue'}`}></span>
                                        <div>
                                            <p>{notif.text}</p>
                                            <small>{notif.time}</small>
                                        </div>
                                    </div>
                                ))
                            )}
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
