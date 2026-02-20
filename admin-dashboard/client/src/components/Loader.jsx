import React from 'react';

const Loader = ({ message = "Cargando panel..." }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: '100%',
            width: '100%',
            minHeight: '300px'
        }}
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="spinner" />
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {message}
            </p>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loader;
