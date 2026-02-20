import { useState, useEffect } from 'react';
import { getProducts, getMaintenanceMode } from '../services/api';

export const useDashboardData = () => {
    const [products, setProducts] = useState([]);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState([
        { id: 1, type: 'info', text: 'Sistema iniciado', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    const addNotification = (type, text) => {
        const newNotif = {
            id: Date.now(),
            type,
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setNotifications(prev => [newNotif, ...prev].slice(0, 3));
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const [productsData, settingsData] = await Promise.all([
                getProducts(),
                getMaintenanceMode()
            ]);
            setProducts(productsData);
            setMaintenanceMode(settingsData.maintenanceMode);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        products,
        maintenanceMode,
        setMaintenanceMode,
        loading,
        refetch: fetchData,
        notifications,
        addNotification
    };
};
