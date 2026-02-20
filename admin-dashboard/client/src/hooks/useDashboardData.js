import { useState, useEffect } from 'react';
import { getProducts, getMaintenanceMode } from '../services/api';

export const useDashboardData = () => {
    const [products, setProducts] = useState([]);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

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
        searchQuery,
        setSearchQuery
    };
};
