import React from 'react';
import SettingsCard from '../components/SettingsCard';
import BulkPriceTool from '../components/BulkPriceTool';
import { toggleMaintenanceMode } from '../services/api';

const Settings = ({ maintenanceMode, setMaintenanceMode, refetch }) => {

    const handleToggleMaintenance = async () => {
        try {
            const res = await toggleMaintenanceMode();
            setMaintenanceMode(res.maintenanceMode);
        } catch (error) {
            console.error("Failed to toggle maintenance:", error);
        }
    };

    return (
        <div className="bento-grid dashboard-bottom-grid">
            <div className="bento-card dashboard-main-card">
                <BulkPriceTool onUpdate={refetch} />
            </div>
            <div className="bento-card">
                <SettingsCard
                    maintenanceMode={maintenanceMode}
                    onToggle={handleToggleMaintenance}
                />
            </div>
        </div>
    );
};

export default Settings;
