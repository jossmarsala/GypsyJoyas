import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dashboardTips = [
    "Tip: Podés actualizar los precios de toda una categoría junta desde 'Ajustes'.",
    "Recordá que las imágenes de buena calidad hacen que tus piezas resalten más.",
    "El modo mantenimiento te permite ocultar el catálogo mientras hacés cambios grandes.",
    "Si un producto es único e irrepetible, podés aclararlo en la categoría para darle exclusividad.",
    "Mantener el inventario organizado por materiales ayuda a tus clientes a elegir mejor."
  ];

  const [currentTip] = useState(() => dashboardTips[Math.floor(Math.random() * dashboardTips.length)]);

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
    <div className="login-page">
      <div className="login-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      
      <div className="login-card-container">
        
        {/* Left Side: Form */}
        <div className="login-form-side">
          <div className="login-form-inner">
            <div className="login-header">
              <div className="logo-box">
                <img src="/assets/img/ui/logo-svg.svg" alt="Gypsy Joyas" />
              </div>
              <h1>¡Hola de nuevo!</h1>
              <p>Por favor ingresa tus datos.</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {error && <div className="login-error">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
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
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-wrapper">
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
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Recordarme por 30 días
                </label>
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Verificando...' : 'Ingresar'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Visual/Aesthetic */}
        <div className="login-visual-side">
          <div className="visual-media">
            <div className="visual-overlay"></div>
            <div className="visual-glass-card">
              <h3>Tips del Dashboard</h3>
              <p>{currentTip}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--color-beige-nuevo, #fefcf7);
          position: relative;
          overflow: hidden;
          padding: 20px;
          box-sizing: border-box;
          font-family: 'Inter', 'Raleway', sans-serif;
        }

        .login-bg-shapes .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          z-index: 0;
        }
        .shape-1 {
          width: 600px;
          height: 600px;
          background: var(--color-dorado-ocre, #cfa358);
          top: -200px;
          left: -200px;
        }
        .shape-2 {
          width: 500px;
          height: 500px;
          background: var(--color-cafe-profundo, #3c2415);
          bottom: -150px;
          right: -100px;
          opacity: 0.12;
        }

        .login-card-container {
          position: relative;
          z-index: 10;
          display: flex;
          width: 100%;
          max-width: 1000px;
          min-height: 600px;
          background-color: #ffffff;
          border-radius: 36px;
          box-shadow: 0 25px 50px -12px rgba(60, 36, 21, 0.15);
          overflow: hidden;
        }

        .login-form-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
        }

        .login-form-inner {
          width: 100%;
          max-width: 320px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 35px;
        }

        .logo-box {
          margin-bottom: 25px;
          display: inline-block;
        }

        .logo-box img {
          width: 45px;
          filter: sepia(10%) hue-rotate(0deg) saturate(1.2) contrast(1.1) drop-shadow(0 2px 4px rgba(60,36,21,0.1));
        }

        .login-header h1 {
          font-family: 'STIX Two Text', serif;
          font-size: 32px;
          color: var(--color-cafe-profundo, #3c2415);
          margin: 0 0 8px 0;
          font-weight: 400;
          letter-spacing: -0.5px;
        }

        .login-header p {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #856E58;
          margin: 0;
        }

        .login-form .form-group {
          margin-bottom: 22px;
        }

        .login-form label {
          display: block;
          font-size: 13px;
          color: var(--color-cafe-profundo, #3c2415);
          margin-bottom: 8px;
          font-weight: 500;
        }

        .input-wrapper {
          position: relative;
        }

        .login-form input {
          width: 100%;
          padding: 14px 18px;
          font-size: 14px;
          color: var(--color-cafe-profundo, #3c2415);
          background-color: #fcfbfa; /* subtle off-white */
          border: 1px solid #efeae4;
          border-radius: 16px;
          box-sizing: border-box;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: 'Inter', sans-serif;
        }

        .login-form input:focus {
          outline: none;
          background-color: #ffffff;
          border-color: var(--color-dorado-ocre, #cfa358);
          box-shadow: 0 0 0 4px rgba(207, 163, 88, 0.1);
          transform: translateY(-1px);
        }

        .login-form input::placeholder {
          color: #c4b9b0;
          font-weight: 400;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #856E58;
          cursor: pointer;
          user-select: none;
          gap: 14px;
        }

        .checkbox-container input {
          margin: 0;
          cursor: pointer;
          accent-color: var(--color-dorado-ocre, #cfa358);
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }

        .login-button {
          width: 100%;
          padding: 16px;
          background-color: var(--color-cafe-profundo, #3c2415);
          color: #ffffff;
          border: none;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.5px;
        }

        .login-button:hover:not(:disabled) {
          background-color: var(--color-dorado-ocre, #cfa358);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(207, 163, 88, 0.25);
        }

        .login-button:disabled {
          background-color: #dfd8d0;
          color: #999;
          cursor: not-allowed;
        }

        .login-error {
          background-color: #fdf2f2;
          color: #dc2626;
          padding: 12px;
          border-radius: 12px;
          font-size: 13px;
          margin-bottom: 22px;
          text-align: center;
          border: 1px solid #fecaca;
        }

        /* Right Side: Visual */
        .login-visual-side {
          flex: 1.1;
          padding: 16px;
          display: flex;
        }

        .visual-media {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          background-image: url('/assets/img/ui/hero-bg.webp');
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 30px;
        }

        .visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(60,36,21,0) 0%, rgba(60,36,21,0.6) 100%);
        }

        .visual-glass-card {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 25px 30px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          color: white;
          margin-bottom: 10px;
        }

        .visual-glass-card h3 {
          font-family: 'STIX Two Text', serif;
          font-size: 26px;
          margin: 0 0 6px 0;
          font-weight: 400;
        }

        .visual-glass-card p {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          margin: 0;
          opacity: 0.95;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        /* Responsive */
        @media (max-width: 850px) {
          .login-card-container {
            flex-direction: column;
            border-radius: 28px;
            max-width: 420px;
            min-height: auto;
          }
          
          .login-visual-side {
            padding: 12px 12px 0 12px;
            flex: none;
            height: 240px;
          }
          
          .visual-media {
            border-radius: 20px;
            padding: 20px;
            align-items: flex-end;
          }
          
          .visual-glass-card {
            padding: 15px 20px;
            border-radius: 16px;
          }
          
          .visual-glass-card h3 {
            font-size: 20px;
          }

          .visual-glass-card p {
            font-size: 12px;
          }
          
          .login-form-side {
            padding: 40px 30px;
          }

          .login-form-inner {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
