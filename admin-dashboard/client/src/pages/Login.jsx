import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login({ email, password });
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-scene">
      <div className="login-bg-decoration">
        <div className="blur-circle circle-1"></div>
        <div className="blur-circle circle-2"></div>
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-wrapper">
              <img src="/assets/img/ui/logo-svg.svg" alt="Gypsy Joyas" className="login-logo" />
            </div>
            <h1>
              <span className="serif-initial">G</span>ypsy
              <span className="serif-subtitle">Dashboard</span>
            </h1>
            <div className="header-divider"></div>
            <p>Piezas de arte para llevar puestas</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="login-error">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Usuario</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="fran@gypsyjoyas.com"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              <span className="button-text">{loading ? 'Verificando...' : 'Ingresar'}</span>
              <span className="button-arrow">→</span>
            </button>
          </form>

          <div className="login-footer">
            <p>© 2026 Gypsy Joyas • Mendoza</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-scene {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: var(--color-beige-nuevo, #fefcf7);
          overflow: hidden;
          font-family: 'Raleway', sans-serif;
        }

        /* Abstract geometric/organic background elements */
        .login-bg-decoration {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .blur-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }

        .circle-1 {
          width: 400px;
          height: 400px;
          background: var(--color-dorado-ocre, #cfa358);
          top: -100px;
          right: -100px;
        }

        .circle-2 {
          width: 300px;
          height: 300px;
          background: var(--color-cafe-profundo, #3c2415);
          bottom: -50px;
          left: -50px;
          opacity: 0.2;
        }

        .login-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          padding: 20px;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          padding: 50px 40px;
          border-radius: 2px; /* Brutalist minimal corner */
          border: 1px solid rgba(60, 36, 21, 0.1);
          box-shadow: 0 30px 60px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo-wrapper {
          margin-bottom: 24px;
          display: inline-block;
        }

        .login-logo {
          width: 50px;
          filter: saturate(0.8);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .login-card:hover .login-logo {
          transform: rotate(10deg);
        }

        .login-header h1 {
          font-family: 'STIX Two Text', serif;
          margin: 0;
          font-size: 32px;
          font-weight: 400;
          color: var(--color-cafe-profundo, #3c2415);
          letter-spacing: -0.5px;
        }

        .serif-initial {
          font-family: 'Manstein', serif;
          font-size: 1.25em;
          vertical-align: sub;
        }

        .serif-subtitle {
          font-size: 0.5em;
          display: block;
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-top: -5px;
          opacity: 0.7;
          font-family: 'Raleway', sans-serif;
        }

        .header-divider {
          width: 40px;
          height: 1px;
          background: var(--color-dorado-ocre, #cfa358);
          margin: 15px auto;
        }

        .login-header p {
          font-family: 'Raleway', sans-serif;
          color: #888;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0;
        }

        .login-form .form-group {
          margin-bottom: 25px;
          position: relative;
        }

        .login-form label {
          display: block;
          margin-bottom: 8px;
          font-weight: 400;
          color: var(--color-cafe-profundo, #3c2415);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .login-form input {
          width: 100%;
          padding: 14px 0;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(60, 36, 21, 0.2);
          font-size: 16px;
          font-family: 'Raleway', sans-serif;
          color: var(--color-cafe-profundo, #3c2415);
          transition: all 0.3s;
          border-radius: 0;
        }

        .login-form input:focus {
          outline: none;
          border-bottom-color: var(--color-dorado-ocre, #cfa358);
          padding-left: 8px;
        }

        .login-form input::placeholder {
          color: #ccc;
          font-size: 14px;
        }

        .login-error {
          background-color: #fff5f5;
          color: #c53030;
          padding: 12px;
          font-size: 14px;
          text-align: center;
          border-left: 3px solid #fc8181;
          margin-bottom: 25px;
        }

        .login-button {
          width: 100%;
          height: 55px;
          margin-top: 15px;
          background-color: var(--color-cafe-profundo, #3c2415);
          color: var(--color-beige-nuevo, #fefcf7);
          border: none;
          font-size: 14px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .login-button:hover:not(:disabled) {
          background-color: var(--color-dorado-ocre, #cfa358);
          padding-right: 20px;
        }

        .button-arrow {
          font-size: 20px;
          transform: translateX(-10px);
          opacity: 0;
          transition: all 0.4s;
        }

        .login-button:hover .button-arrow {
          transform: translateX(0);
          opacity: 1;
        }

        .login-button:disabled {
          background-color: #ddd;
          color: #aaa;
          cursor: not-allowed;
        }

        .login-footer {
          margin-top: 40px;
          text-align: center;
        }

        .login-footer p {
          font-size: 10px;
          color: #bbb;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        /* Mobile specific adjustments */
        @media (max-width: 480px) {
          .login-card {
            padding: 40px 30px;
          }
          
          .login-header h1 {
            font-size: 28px;
          }

          .circle-1 { width: 250px; height: 250px; }
          .circle-2 { width: 150px; height: 150px; }
        }
      `}</style>
    </div>
  );
};

export default Login;
