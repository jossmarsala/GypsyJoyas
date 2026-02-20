import React from 'react';

const SettingsCard = ({ maintenanceMode, onToggle }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h2 className="card-title">Estado del sistema</h2>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    width: '60px',
                    height: '30px',
                    backgroundColor: maintenanceMode ? '#ef4444' : '#10b981',
                    borderRadius: '15px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }} onClick={onToggle}>
                    <div style={{
                        width: '26px',
                        height: '26px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '2px',
                        left: maintenanceMode ? '32px' : '2px',
                        transition: 'left 0.3s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }} />
                </div>
                <p style={{ marginTop: '1rem', fontWeight: '500', color: maintenanceMode ? '#ef4444' : '#10b981' }}>
                    {maintenanceMode ? 'Mantenimiento activo' : 'En línea'}
                </p>
            </div>
        </div>
    );
};

export default SettingsCard;
