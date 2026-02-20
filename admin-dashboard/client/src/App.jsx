import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardOverview from './pages/DashboardOverview';
import Inventory from './pages/Inventory';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { useDashboardData } from './hooks/useDashboardData';
import './styles/index.css';

function DashboardLayout() {
  const { products, maintenanceMode, setMaintenanceMode, loading, refetch } = useDashboardData();

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <TopBar />
        <Routes>
          <Route path="/" element={<DashboardOverview products={products} loading={loading} maintenanceMode={maintenanceMode} setMaintenanceMode={setMaintenanceMode} refetch={refetch} />} />
          <Route path="/inventario" element={<Inventory products={products} refetch={refetch} />} />
          <Route path="/ajustes" element={<Settings maintenanceMode={maintenanceMode} setMaintenanceMode={setMaintenanceMode} refetch={refetch} />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router basename="/admin">
      <DashboardLayout />
    </Router>
  );
}

export default App;
