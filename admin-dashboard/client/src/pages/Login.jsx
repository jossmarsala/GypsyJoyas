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
      window.location.reload(); // Quick way to refresh app state
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/assets/img/ui/logo-svg.svg" alt="Gypsy Joyas" className="login-logo" />
          <h1>Admin Dashboard</h1>
          <p>Ingresá tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@gypsyjoyas.com"
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
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: var(--color-beige-nuevo, #fefcf7);
          padding: 20px;
        }

        .login-card {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          width: 100%;
          max-width: 400px;
          border: 1px solid var(--borde-dorado-suave, #eee);
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .login-logo {
          width: 60px;
          margin-bottom: 15px;
        }

        .login-header h1 {
          font-family: var(--font-family-title-main, serif);
          color: var(--color-cafe-profundo, #3c2415);
          margin: 0;
          font-size: 24px;
        }

        .login-header p {
          color: #666;
          font-size: 14px;
          margin-top: 5px;
        }

        .login-form .form-group {
          margin-bottom: 20px;
        }

        .login-form label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: var(--color-cafe-profundo, #3c2415);
          font-size: 14px;
        }

        .login-form input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          transition: border-color 0.2s;
        }

        .login-form input:focus {
          outline: none;
          border-color: var(--color-dorado-ocre, #cfa358);
        }

        .login-error {
          background-color: #fff5f5;
          color: #e53e3e;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 20px;
          font-size: 14px;
          text-align: center;
          border: 1px solid #feb2b2;
        }

        .login-button {
          width: 100%;
          padding: 12px;
          background-color: var(--color-cafe-profundo, #3c2415);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .login-button:hover:not(:disabled) {
          opacity: 0.9;
        }

        .login-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Login;
